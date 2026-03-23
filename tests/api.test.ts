import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('API 静态文件生成', () => {
  it('应该生成 posts.json', () => {
    const postsPath = path.join(process.cwd(), 'public/api/posts.json');
    expect(fs.existsSync(postsPath)).toBe(true);

    const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);

    // 验证结构
    posts.forEach((post: any) => {
      expect(post).toHaveProperty('slug');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('date');
      expect(post).toHaveProperty('tags');
      expect(post).toHaveProperty('excerpt');
    });
  });

  it('应该生成 skills.json', () => {
    const skillsPath = path.join(process.cwd(), 'public/api/skills.json');
    expect(fs.existsSync(skillsPath)).toBe(true);

    const skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));
    expect(Array.isArray(skills)).toBe(true);
    expect(skills.length).toBeGreaterThan(0);

    // 验证结构
    skills.forEach((skill: any) => {
      expect(skill).toHaveProperty('slug');
      expect(skill).toHaveProperty('name');
      expect(skill).toHaveProperty('description');
      expect(skill).toHaveProperty('category');
    });
  });

  it('应该生成 projects.json', () => {
    const projectsPath = path.join(process.cwd(), 'public/api/projects.json');
    expect(fs.existsSync(projectsPath)).toBe(true);

    const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));
    expect(Array.isArray(projects)).toBe(true);
  });
});

describe('RSS Feed 生成', () => {
  it('应该生成有效的 RSS XML', () => {
    const rssPath = path.join(process.cwd(), 'public/feed.xml');
    expect(fs.existsSync(rssPath)).toBe(true);

    const rss = fs.readFileSync(rssPath, 'utf-8');
    expect(rss).toContain('<?xml version="1.0"');
    expect(rss).toContain('<rss');
    expect(rss).toContain('</rss>');
  });
});
