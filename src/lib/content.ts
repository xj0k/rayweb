import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost, AISkill, Project } from "@/types";

const contentDir = path.join(process.cwd(), "src/content");

function getFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
}

export function getAllPosts(): BlogPost[] {
  const dir = path.join(contentDir, "blog");
  return getFiles(dir)
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(raw);
      const rt = readingTime(content);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        tags: data.tags ?? [],
        readingTime: rt.text,
        cover: data.cover,
        content,
      } as BlogPost;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const dir = path.join(contentDir, "blog");
  const filePath = [path.join(dir, `${slug}.mdx`), path.join(dir, `${slug}.md`)].find(fs.existsSync);
  if (!filePath) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    tags: data.tags ?? [],
    readingTime: rt.text,
    cover: data.cover,
    content,
  };
}

export function getAllSkills(): AISkill[] {
  const dir = path.join(contentDir, "skills");
  return getFiles(dir)
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        name: data.name ?? slug,
        description: data.description ?? "",
        category: data.category ?? "通用",
        tags: data.tags ?? [],
        prompt: data.prompt,
        example: data.example,
        date: data.date ?? "",
      } as AISkill;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllProjects(): Project[] {
  const dir = path.join(contentDir, "projects");
  return getFiles(dir)
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        name: data.name ?? slug,
        status: data.status ?? "概念",
        description: data.description ?? "",
        techStack: data.techStack ?? [],
        cover: data.cover,
        link: data.link,
        date: data.date ?? "",
      } as Project;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
