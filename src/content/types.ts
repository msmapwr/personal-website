export interface Language {
  id: string;
  label: string;
}

export interface UiStrings {
  demo: string;
  learning: string;
  featuredProjects: string;
  viewAllProjects: string;
  sortFeatured: string;
  sortRecent: string;
  sortName: string;
  filterTags: string;
  allTags: string;
  statusCompleted: string;
  statusOptimizing: string;
  statusInProgress: string;
  switchLanguage: string;
  switchTheme: string;
  menu: string;
  close: string;
  skipToContent: string;
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
  id: string;
  level: SkillLevel;
  label: string;
  description: string;
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
  featured: boolean;
  status: "completed" | "optimizing" | "in-progress";
  updated: string;
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

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
}

export interface PostsContent {
  title: string;
  posts: BlogPost[];
}

/** 单个语言下的完整内容快照 */
export interface LocaleContent {
  name: string;
  avatar?: string;
  ui: UiStrings;
  nav: NavItem[];
  hero: HeroContent;
  about: AboutContent;
  skills: SkillsContent;
  contact: ContactContent;
  projects: ProjectsContent;
  posts: PostsContent;
}

export interface SiteContent {
  languages: Language[];
  locales: Record<string, LocaleContent>;
}
