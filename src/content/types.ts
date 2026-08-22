export interface Language {
  id: string;
  label: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface HeroContent {
  tagline: string;
  subtitle: string;
  actions: {
    primary: string;
    secondary: string;
  };
}

export interface AboutContent {
  title: string;
  paragraphs: string[];
}

export type SkillLevel = "proficient" | "learning";

export interface SkillItem {
  level: SkillLevel;
  label: string;
}

export interface SkillGroup {
  name: string;
  label: string;
  items: SkillItem[];
}

export interface SkillsContent {
  title: string;
  groups: SkillGroup[];
}

export interface ContactItem {
  kind: "github" | "email" | "bilibili";
  label: string;
  value?: string;
  url?: string;
  name?: string;
}

export interface ContactContent {
  title: string;
  items: ContactItem[];
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  link: string;
  demo?: string;
}

export interface ProjectsContent {
  title: string;
  projects: Project[];
}

/** 单个语言下的完整内容快照 */
export interface LocaleContent {
  name: string;
  avatar?: string;
  nav: NavItem[];
  hero: HeroContent;
  about: AboutContent;
  skills: SkillsContent;
  contact: ContactContent;
  projects: ProjectsContent;
}

export interface SiteContent {
  languages: Language[];
  locales: Record<string, LocaleContent>;
}
