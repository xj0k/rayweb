import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import matter from 'gray-matter';

const BlogPostSchema = z.object({
  slug: z.string(),
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  excerpt: z.string().min(1),
  tags: z.array(z.string()),
  content: z.string().min(1),
});

function verifyBackup(backupName: string) {
  const backupDir = path.join(process.cwd(), 'backups', backupName);

  if (!fs.existsSync(backupDir)) {
    console.log(`❌ Backup not found: ${backupName}`);
    process.exit(1);
  }

  console.log(`🔍 Verifying backup: ${backupName}\n`);

  let errors = 0;

  // Check manifest
  const manifestPath = path.join(backupDir, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.log('⚠️  No manifest.json found');
  } else {
    console.log('✅ Manifest found');
  }

  // Check content directory
  const contentDir = path.join(backupDir, 'content');
  if (!fs.existsSync(contentDir)) {
    console.log('❌ Content directory missing');
    errors++;
  } else {
    console.log('✅ Content directory exists');

    // Verify blog posts
    const blogDir = path.join(contentDir, 'blog');
    if (fs.existsSync(blogDir)) {
      const posts = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
      console.log(`✅ Found ${posts.length} blog posts`);

      posts.forEach(filename => {
        const filePath = path.join(blogDir, filename);
        const raw = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(raw);
        const slug = filename.replace(/\.md$/, '');

        try {
          BlogPostSchema.parse({ ...data, slug, content });
        } catch (e) {
          console.log(`  ❌ Invalid: ${filename}`);
          errors++;
        }
      });
    }
  }

  console.log('\n' + '='.repeat(50));
  if (errors > 0) {
    console.log(`\n❌ Backup verification failed with ${errors} error(s)`);
    process.exit(1);
  } else {
    console.log('\n✅ Backup verification passed!');
  }
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: npm run verify-backup <backup-name>');
  process.exit(1);
} else {
  verifyBackup(args[0]);
}
