import { getAllPosts } from "@/lib/content";
import { PostCard } from "@/components/Cards";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "博客",
  description: "关于 AI、产品与技术的思考与文章",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-2">博客</h1>
      <p className="mb-10 text-base" style={{ color: "var(--muted)" }}>
        关于 AI、产品与技术的思考与记录
      </p>
      <div className="space-y-3">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </div>
  );
}
