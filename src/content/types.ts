export interface LocalizedText {
  zh: string;
  en: string;
}

export interface NavItem {
  id: string;
  label: LocalizedText;
}

export interface HeroContent {
  tagline: LocalizedText;
  subtitle: LocalizedText;
  actions: {
    primary: LocalizedText;
    secondary: LocalizedText;
  };
}

export interface AboutContent {
  title: LocalizedText;
  paragraphs: LocalizedText[];
}

export type SkillLevel = "proficient" | "learning";

export interface SkillItem {
  level: SkillLevel;
  label: LocalizedText;
}

export interface SkillGroup {
  name: string;
  label: LocalizedText;
  items: SkillItem[];
}

export interface SkillsContent {
  title: LocalizedText;
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
  title: LocalizedText;
  items: ContactItem[];
}

export interface Project {
  id: string;
  name: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  tags: string[];
  link: string;
  demo?: string;
}

export interface ProjectsContent {
  title: LocalizedText;
  projects: Project[];
}

export interface SiteContent {
  name: string;
  avatar?: string;
  nav: NavItem[];
  hero: HeroContent;
  about: AboutContent;
  skills: SkillsContent;
  contact: ContactContent;
  projects: ProjectsContent;
}
