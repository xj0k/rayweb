import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface BlogPost {
  slug: string;
  date: string;
}

interface AISkill {
  slug: string;
}

function readMarkdownFiles<T>(dir: string): T[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  return files.map(filename => {
    const filePath = path.join(dir, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);
    const slug = filename.replace(/\.md$/, '');
    return { ...data, slug } as T;
  });
}

function generateSitemap() {
  console.log('🗺️  Generating sitemap...\n');

  const posts = readMarkdownFiles<BlogPost>(path.join(process.cwd(), 'src/content/blog'));
  const skills = readMarkdownFiles<AISkill>(path.join(process.cwd(), 'src/content/skills'));

  const urls: { loc: string; lastmod?: string; changefreq: string; priority: number }[] = [
    { loc: '/', changefreq: 'weekly', priority: 1.0 },
    { loc: '/blog', changefreq: 'daily', priority: 0.9 },
    { loc: '/skills', changefreq: 'weekly', priority: 0.9 },
    { loc: '/projects', changefreq: 'monthly', priority: 0.8 },
    { loc: '/about', changefreq: 'monthly', priority: 0.7 },
    ...posts.map(p => ({
      loc: `/blog/${p.slug}`,
      lastmod: p.date,
      changefreq: 'monthly',
      priority: 0.6
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>https://raysonxu.com${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), sitemap);
  console.log(`✅ Generated sitemap.xml (${urls.length} URLs)`);

  console.log('\n✅ Sitemap generated successfully!');
}

generateSitemap();
