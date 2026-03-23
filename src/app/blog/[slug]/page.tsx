import { getPostBySlug, getAllPosts } from "@/lib/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    abstract: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Rayson Xu',
      url: 'https://raysonxu.com/about',
      jobTitle: '产品团队负责人',
    },
    keywords: post.tags.join(', '),
    articleBody: post.content,
    url: `https://raysonxu.com/blog/${post.slug}`,
    publisher: {
      '@type': 'Person',
      name: 'Rayson Xu',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: "var(--muted)" }}>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full border" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <hr style={{ borderColor: "var(--border)" }} className="mb-8" />
      <article className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>
      </div>
    </>
  );
}
