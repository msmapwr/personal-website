/**
 * 项目配图（代码级映射）。
 * 图片路径是二进制资源、不可翻译，故不放在 content.xml，而集中在这里。
 * key 是 content.xml 里 <project id="..."> 的 id；value 是该项目的截图列表（第一张作为卡片封面）。
 */
export const projectImages: Record<string, string[]> = {
  "the-second-oasis": [
    "images/the-second-oasis/mainmenu.webp",
    "images/the-second-oasis/ingame.webp",
  ],
  "personal-website": ["images/personal-website/personal-website.webp"],
  "create-stratosphere": [
    "images/create-stratosphere/main.webp",
    "images/create-stratosphere/flight.webp",
  ],
};
