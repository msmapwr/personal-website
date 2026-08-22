import json, urllib.request, io, os

REPO = "msmapwr/the-second-oasis"
OUT = os.path.join(os.path.dirname(__file__), "..", "_tmp", "repo_info.txt")

def get(url, accept=None):
    req = urllib.request.Request(url)
    req.add_header("User-Agent", "personal-website-builder")
    if accept:
        req.add_header("Accept", accept)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()

meta = json.loads(get(f"https://api.github.com/repos/{REPO}"))
readme = get(f"https://api.github.com/repos/{REPO}/readme", "application/vnd.github.raw")

buf = io.StringIO()
buf.write("=== META ===\n")
for k in ("name", "description", "language", "topics", "html_url", "homepage", "stargazers_count", "created_at", "updated_at"):
    buf.write(f"{k}: {meta.get(k)}\n")
buf.write("\n=== README ===\n")
buf.write(readme.decode("utf-8", errors="replace"))

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "w", encoding="utf-8") as f:
    f.write(buf.getvalue())
print("saved:", OUT, os.path.getsize(OUT), "bytes")
