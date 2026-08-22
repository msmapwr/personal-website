import urllib.request, json

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"

def api(params):
    url = "https://zh.minecraft.wiki/api.php?" + params
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())

info = api("action=query&prop=info&pageids=47618&format=json")
print("=== INFO ===")
print(json.dumps(info, ensure_ascii=False, indent=2))

ii = api("action=query&prop=imageinfo&iiprop=url&pageids=47618&format=json")
print("=== IMAGEINFO ===")
print(json.dumps(ii, ensure_ascii=False, indent=2))
