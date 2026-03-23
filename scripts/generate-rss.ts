import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
}

interface AISkill {
  slug: string;
  name: string;
  description: string;
  category: string;
  date: string;
  prompt?: string;
}

function readMarkdownFiles<T>(dir: string): T[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  return files.map(filename => {
    const filePath = path.join(dir, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const slug = filename.replace(/\.md$/, '');
    return { ...data, slug, content } as T;
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateRSS() {
  console.log('📡 Generating RSS feeds...\n');

  const posts = readMarkdownFiles<BlogPost>(path.join(process.cwd(), 'src/content/blog'));
  const skills = readMarkdownFiles<AISkill>(path.join(process.cwd(), 'src/content/skills'));

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  skills.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Blog RSS Feed
  const blogRSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Rayson Xu's Blog</title>
    <link>https://raysonxu.com/</link>
    <description>关于 AI、产品与技术的思考</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://raysonxu.com/feed.xml" rel="self" type="application/rss+xml"/>
${posts.map(post => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://raysonxu.com/blog/${post.slug}</link>
      <guid>https://raysonxu.com/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
${post.tags.map(tag => `      <category>${escapeXml(tag)}</category>`).join('\n')}
    </item>`).join('\n')}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(process.cwd(), 'public/feed.xml'), blogRSS);
  console.log(`✅ Generated blog RSS feed (${posts.length} posts)`);

  // AI Skills RSS Feed
  const skillsRSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Rayson Xu's AI Skills</title>
    <link>https://raysonxu.com/skills</link>
    <description>实用 AI Prompt 技巧与工作流</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://raysonxu.com/feed-skills.xml" rel="self" type="application/rss+xml"/>
${skills.map(skill => `    <item>
      <title>${escapeXml(skill.name)}</title>
      <link>https://raysonxu.com/skills#${skill.slug}</link>
      <guid>https://raysonxu.com/skills#${skill.slug}</guid>
      <pubDate>${new Date(skill.date).toUTCString()}</pubDate>
      <description>${escapeXml(skill.description)}</description>
      <category>${escapeXml(skill.category)}</category>
    </item>`).join('\n')}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(process.cwd(), 'public/feed-skills.xml'), skillsRSS);
  console.log(`✅ Generated AI Skills RSS feed (${skills.length} skills)`);

  console.log('\n✅ All RSS feeds generated successfully!');
}

generateRSS();
