import contentXml from "../../content/content.xml?raw";
import { parseContent } from "./parseContent";
import type { SiteContent } from "./types";

/** 解析后的站点内容（来自 content.xml），模块加载时解析一次 */
export const content: SiteContent = parseContent(contentXml);
