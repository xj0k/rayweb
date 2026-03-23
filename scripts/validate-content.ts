import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BlogPostSchema = z.object({
  slug: z.string(),
  title: z.string().min(1, 'Title cannot be empty'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  excerpt: z.string().min(1, 'Excerpt cannot be empty'),
  tags: z.array(z.string()),
  content: z.string().min(1, 'Content cannot be empty'),
  readingTime: z.string().optional(),
  cover: z.string().optional(),
});

const AISkillSchema = z.object({
  slug: z.string(),
  name: z.string().min(1, 'Name cannot be empty'),
  description: z.string().min(1, 'Description cannot be empty'),
  category: z.string(),
  tags: z.array(z.string()),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  prompt: z.string().optional(),
  example: z.string().optional(),
});

const ProjectSchema = z.object({
  slug: z.string(),
  name: z.string().min(1, 'Name cannot be empty'),
  status: z.enum(['active', 'completed', 'archived']),
  description: z.string().min(1, 'Description cannot be empty'),
  techStack: z.array(z.string()),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  cover: z.string().optional(),
  link: z.string().optional(),
});

function readMarkdownFiles(dir: string) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  return files.map(filename => {
    const filePath = path.join(dir, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const slug = filename.replace(/\.md$/, '');
    return { ...data, slug, content, filePath };
  });
}

function validateContent() {
  console.log('🔍 Validating content...\n');

  let errors = 0;

  // Validate blog posts
  const postsDir = path.join(process.cwd(), 'src/content/blog');
  if (fs.existsSync(postsDir)) {
    const posts = readMarkdownFiles(postsDir);
    console.log(`📝 Validating ${posts.length} blog posts...`);

    posts.forEach(post => {
      try {
        BlogPostSchema.parse(post);
        console.log(`  ✅ ${post.slug}`);
      } catch (error) {
        console.error(`  ❌ ${post.slug}`);
        if (error instanceof z.ZodError) {
          error.errors.forEach(err => {
            console.error(`     - ${err.path.join('.')}: ${err.message}`);
          });
        }
        errors++;
      }
    });
  }

  // Validate AI Skills
  const skillsDir = path.join(process.cwd(), 'src/content/skills');
  if (fs.existsSync(skillsDir)) {
    const skills = readMarkdownFiles(skillsDir);
    console.log(`\n🎯 Validating ${skills.length} AI skills...`);

    skills.forEach(skill => {
      try {
        AISkillSchema.parse(skill);
        console.log(`  ✅ ${skill.slug}`);
      } catch (error) {
        console.error(`  ❌ ${skill.slug}`);
        if (error instanceof z.ZodError) {
          error.errors.forEach(err => {
            console.error(`     - ${err.path.join('.')}: ${err.message}`);
          });
        }
        errors++;
      }
    });
  }

  // Validate Projects
  const projectsDir = path.join(process.cwd(), 'src/content/projects');
  if (fs.existsSync(projectsDir)) {
    const projects = readMarkdownFiles(projectsDir);
    console.log(`\n🚀 Validating ${projects.length} projects...`);

    projects.forEach(project => {
      try {
        ProjectSchema.parse(project);
        console.log(`  ✅ ${project.slug}`);
      } catch (error) {
        console.error(`  ❌ ${project.slug}`);
        if (error instanceof z.ZodError) {
          error.errors.forEach(err => {
            console.error(`     - ${err.path.join('.')}: ${err.message}`);
          });
        }
        errors++;
      }
    });
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  if (errors > 0) {
    console.error(`\n❌ Validation failed with ${errors} error(s)`);
    process.exit(1);
  } else {
    console.log('\n✅ All content validated successfully!');
  }
}

validateContent();
