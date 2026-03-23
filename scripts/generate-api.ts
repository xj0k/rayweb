import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime?: string;
  cover?: string;
  content: string;
}

interface AISkill {
  slug: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  prompt?: string;
  example?: string;
}

interface Project {
  slug: string;
  name: string;
  status: string;
  description: string;
  techStack: string[];
  date: string;
  cover?: string;
  link?: string;
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

function generateAPI() {
  console.log('🔧 Generating JSON API files...\n');

  const apiDir = path.join(process.cwd(), 'public/api');
  fs.mkdirSync(apiDir, { recursive: true });

  // Read all content
  const posts = readMarkdownFiles<BlogPost>(path.join(process.cwd(), 'src/content/blog'));
  const skills = readMarkdownFiles<AISkill>(path.join(process.cwd(), 'src/content/skills'));
  const projects = readMarkdownFiles<Project>(path.join(process.cwd(), 'src/content/projects'));

  // Generate discover.json - Site overview
  const discover = {
    site: {
      name: "Rayson Xu",
      url: "https://raysonxu.com",
      description: "资深软件工程师、产品团队负责人，专注 AI 内容与工具分享",
      topics: ["AI", "产品管理", "软件工程", "效率工具"],
      content_types: ["blog", "skills", "projects"],
      last_updated: new Date().toISOString(),
    },
    stats: {
      total_posts: posts.length,
      total_skills: skills.length,
      total_projects: projects.length,
    }
  };
  fs.writeFileSync(path.join(apiDir, 'discover.json'), JSON.stringify(discover, null, 2));
  console.log('✅ Generated discover.json');

  // Generate posts.json - All blog posts
  const postsAPI = posts.map(post => ({
    ...post,
    url: `https://raysonxu.com/blog/${post.slug}`,
    api_url: `https://raysonxu.com/api/posts/${post.slug}.json`,
  }));
  fs.writeFileSync(path.join(apiDir, 'posts.json'), JSON.stringify(postsAPI, null, 2));
  console.log(`✅ Generated posts.json (${posts.length} posts)`);

  // Generate individual post JSON files
  const postsDir = path.join(apiDir, 'posts');
  fs.mkdirSync(postsDir, { recursive: true });
  posts.forEach(post => {
    fs.writeFileSync(
      path.join(postsDir, `${post.slug}.json`),
      JSON.stringify(post, null, 2)
    );
  });
  console.log(`✅ Generated ${posts.length} individual post files`);

  // Generate skills.json - All AI Skills
  const skillsAPI = skills.map(skill => ({
    ...skill,
    url: `https://raysonxu.com/skills#${skill.slug}`,
    api_url: `https://raysonxu.com/api/skills/${skill.slug}.json`,
  }));
  fs.writeFileSync(path.join(apiDir, 'skills.json'), JSON.stringify(skillsAPI, null, 2));
  console.log(`✅ Generated skills.json (${skills.length} skills)`);

  // Generate individual skill JSON files
  const skillsDir = path.join(apiDir, 'skills');
  fs.mkdirSync(skillsDir, { recursive: true });
  skills.forEach(skill => {
    fs.writeFileSync(
      path.join(skillsDir, `${skill.slug}.json`),
      JSON.stringify(skill, null, 2)
    );
  });
  console.log(`✅ Generated ${skills.length} individual skill files`);

  // Generate projects.json - All projects
  const projectsAPI = projects.map(project => ({
    ...project,
    url: `https://raysonxu.com/projects#${project.slug}`,
  }));
  fs.writeFileSync(path.join(apiDir, 'projects.json'), JSON.stringify(projectsAPI, null, 2));
  console.log(`✅ Generated projects.json (${projects.length} projects)`);

  console.log('\n✅ All API files generated successfully!');
}

generateAPI();
