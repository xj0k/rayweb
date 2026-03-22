"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { BlogPost, AISkill, Project } from "@/types";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

export function Hero() {
  return (
    <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
        <motion.p variants={fadeUp} custom={0} className="text-sm font-medium mb-3" style={{ color: "var(--accent)" }}>
          你好，我是
        </motion.p>
        <motion.h1 variants={fadeUp} custom={1} className="text-4xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.03em" }}>
          Rayson Xu
        </motion.h1>
        <motion.p variants={fadeUp} custom={2} className="text-lg mb-8 max-w-xl leading-relaxed" style={{ color: "var(--muted)" }}>
          资深软件工程师 & 产品团队负责人。专注 AI 工具、效率方法论，在这里记录思考、分享 AI Skills。
        </motion.p>
        <motion.div variants={fadeUp} custom={3} className="flex gap-3">
          <Link
            href="/blog"
            className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            阅读博客
          </Link>
          <Link
            href="/skills"
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors border"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            AI Skills
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export function PostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate="show"
      className="group border rounded-xl p-5 hover:shadow-sm transition-shadow"
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h2 className="font-semibold text-base group-hover:opacity-70 transition-opacity leading-snug">
            {post.title}
          </h2>
        </div>
        <p className="text-sm mb-3 line-clamp-2" style={{ color: "var(--muted)" }}>{post.excerpt}</p>
        <div className="flex items-center gap-3 text-xs" style={{ color: "var(--muted)" }}>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full border text-xs" style={{ borderColor: "var(--border)" }}>
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.article>
  );
}

export function SkillCard({ skill, index }: { skill: AISkill; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate="show"
      className="border rounded-xl p-5 hover:shadow-sm transition-shadow"
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-sm">{skill.name}</h3>
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "color-mix(in srgb, var(--accent) 15%, transparent)", color: "var(--accent)" }}>
          {skill.category}
        </span>
      </div>
      <p className="text-sm line-clamp-3" style={{ color: "var(--muted)" }}>{skill.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {skill.tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded-full border" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const statusColors: Record<string, string> = {
    "概念": "#f59e0b",
    "进行中": "#3b82f6",
    "已发布": "#10b981",
  };
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate="show"
      className="border rounded-xl p-5 hover:shadow-sm transition-shadow"
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-sm">{project.name}</h3>
        <span className="text-xs font-medium" style={{ color: statusColors[project.status] }}>
          {project.status}
        </span>
      </div>
      <p className="text-sm line-clamp-3 mb-3" style={{ color: "var(--muted)" }}>{project.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.map((tech) => (
          <span key={tech} className="text-xs px-2 py-0.5 rounded border" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
