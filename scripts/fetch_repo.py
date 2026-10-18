#!/usr/bin/env python3
"""Fetch GitHub repository details and README as project-entry research data."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen

USER_AGENT = "personal-website-project-research/1.0"
API_VERSION = "2022-11-28"


def parse_repository_url(value: str) -> tuple[str, str]:
    """Accept only a GitHub repository URL or owner/repository shorthand."""
    candidate = value.strip()
    if "://" not in candidate:
        candidate = f"https://github.com/{candidate}"

    parsed = urlparse(candidate)
    parts = [part for part in parsed.path.split("/") if part]
    if (
        parsed.scheme != "https"
        or parsed.hostname not in {"github.com", "www.github.com"}
        or parsed.username
        or parsed.password
        or parsed.query
        or parsed.fragment
        or len(parts) != 2
    ):
        raise ValueError("请输入 GitHub 仓库地址，例如 https://github.com/owner/repo")

    owner, repository = parts
    repository = re.sub(r"\.git$", "", repository, flags=re.IGNORECASE)
    if not owner or not repository:
        raise ValueError("GitHub 仓库地址必须包含 owner 和 repository。")
    return owner, repository


def request(url: str, *, accept: str = "application/vnd.github+json") -> bytes:
    req = Request(
        url,
        headers={
            "Accept": accept,
            "User-Agent": USER_AGENT,
            "X-GitHub-Api-Version": API_VERSION,
        },
    )
    with urlopen(req, timeout=25) as response:
        return response.read()


def fetch_repository(url: str) -> dict[str, object]:
    owner, repository = parse_repository_url(url)
    api_url = f"https://api.github.com/repos/{owner}/{repository}"
    metadata = json.loads(request(api_url))

    try:
        readme = request(f"{api_url}/readme", accept="application/vnd.github.raw+json").decode(
            "utf-8", errors="replace"
        )
    except HTTPError as error:
        if error.code != 404:
            raise
        readme = ""

    try:
        languages = json.loads(request(f"{api_url}/languages"))
    except HTTPError:
        languages = {}

    first_heading = next(
        (line.lstrip("# ").strip() for line in readme.splitlines() if line.startswith("# ")),
        "",
    )
    first_paragraph = ""
    for block in re.split(r"\n\s*\n", readme):
        candidate = block.strip()
        if candidate and not candidate.startswith(("#", "```", "!", "<")):
            first_paragraph = re.sub(r"\s+", " ", candidate)
            break

    return {
        "repository": {
            "name": metadata.get("name"),
            "full_name": metadata.get("full_name"),
            "description": metadata.get("description"),
            "url": metadata.get("html_url"),
            "homepage": metadata.get("homepage") or None,
            "default_branch": metadata.get("default_branch"),
            "primary_language": metadata.get("language"),
            "languages": languages,
            "topics": metadata.get("topics", []),
            "license": (metadata.get("license") or {}).get("spdx_id"),
            "stars": metadata.get("stargazers_count", 0),
            "forks": metadata.get("forks_count", 0),
            "created_at": metadata.get("created_at"),
            "updated_at": metadata.get("updated_at"),
            "archived": metadata.get("archived", False),
        },
        "project_draft": {
            "name": first_heading or metadata.get("name"),
            "tagline_source": metadata.get("description") or first_paragraph,
            "description_source": first_paragraph,
            "suggested_tags": metadata.get("topics", []),
            "source_link": metadata.get("html_url"),
            "demo_link": metadata.get("homepage") or None,
            "status": None,
            "status_note": "项目状态需根据 README 与用户信息确认；脚本不会自行推断。",
        },
        "readme": readme,
    }


def render_markdown(data: dict[str, object]) -> str:
    repo = data["repository"]
    draft = data["project_draft"]
    assert isinstance(repo, dict) and isinstance(draft, dict)
    readme = str(data["readme"]).rstrip()
    longest_fence = max((len(match.group()) for match in re.finditer(r"`+", readme)), default=2)
    fence = "`" * max(3, longest_fence + 1)
    lines = [
        f"# {draft['name']}",
        "",
        f"- 仓库：{repo['url']}",
        f"- GitHub 描述：{repo['description'] or '（未填写）'}",
        f"- README 标题：{draft['name']}",
        f"- 简介参考：{draft['tagline_source'] or '（README 无可用简介）'}",
        f"- 主页 / Demo：{draft['demo_link'] or '（未设置）'}",
        f"- 主要语言：{repo['primary_language'] or '（未识别）'}",
        f"- 语言构成：{json.dumps(repo['languages'], ensure_ascii=False)}",
        f"- Topics：{', '.join(repo['topics']) or '（无）'}",
        f"- Stars / Forks：{repo['stars']} / {repo['forks']}",
        f"- 创建 / 更新：{repo['created_at']} / {repo['updated_at']}",
        f"- 状态：待确认。{draft['status_note']}",
        "",
        "## README.md",
        "",
        draft["description_source"] or "（仓库没有 README.md 或没有可提取的简介。）",
        "",
        "## README 全文",
        "",
        f"{fence}markdown",
        readme,
        fence,
    ]
    return "\n".join(lines).rstrip() + "\n"


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser(
        description="读取 GitHub 仓库元数据与 README，生成添加项目时可用的资料。"
    )
    parser.add_argument("repository_url", help="GitHub 仓库 URL 或 owner/repo")
    parser.add_argument("--format", choices=("json", "markdown"), default="json")
    parser.add_argument("--output", help="将结果写入指定文件；省略时输出到终端")
    args = parser.parse_args()

    try:
        data = fetch_repository(args.repository_url)
        result = json.dumps(data, ensure_ascii=False, indent=2) if args.format == "json" else render_markdown(data)
        if args.output:
            output_path = Path(args.output)
            output_path.parent.mkdir(parents=True, exist_ok=True)
            output_path.write_text(result, encoding="utf-8", newline="\n")
            print(f"项目资料已写入：{args.output}")
        else:
            print(result, end="")
        return 0
    except HTTPError as error:
        if error.code == 404:
            message = "仓库不存在、不可公开访问，或没有 README.md。"
        elif error.code == 403:
            message = "GitHub API 暂时拒绝请求；请稍后重试或配置 GitHub CLI/API 代理。"
        else:
            message = f"GitHub API 请求失败：HTTP {error.code}。"
        print(message, file=sys.stderr)
    except (URLError, TimeoutError) as error:
        print(f"无法连接 GitHub：{error}", file=sys.stderr)
    except (ValueError, json.JSONDecodeError) as error:
        print(f"无法读取仓库信息：{error}", file=sys.stderr)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
