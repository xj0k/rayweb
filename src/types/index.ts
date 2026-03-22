export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  cover?: string;
  content: string;
}

export interface AISkill {
  slug: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  prompt?: string;
  example?: string;
  date: string;
}

export interface Project {
  slug: string;
  name: string;
  status: "概念" | "进行中" | "已发布";
  description: string;
  techStack: string[];
  cover?: string;
  link?: string;
  date: string;
}
