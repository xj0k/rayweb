import { getAllPosts, getAllSkills, getAllProjects } from "@/lib/content";
import { Hero, PostCard, SkillCard, ProjectCard } from "@/components/Cards";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const skills = getAllSkills().slice(0, 3);
  const projects = getAllProjects().slice(0, 3);

  return (
    <div>
      <Hero />
      <div className="max-w-3xl mx-auto px-6 space-y-16 pb-20">
        {/* Blog section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold tracking-tight">最新文章</h2>
            <Link href="/blog" className="text-sm hover:opacity-70 transition-opacity" style={{ color: "var(--accent)" }}>
              全部 →
            </Link>
          </div>
          <div className="space-y-3">
            {posts.map((post, i) => <PostCard key={post.slug} post={post} index={i} />)}
          </div>
        </section>

        {/* Skills section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold tracking-tight">AI Skills</h2>
            <Link href="/skills" className="text-sm hover:opacity-70 transition-opacity" style={{ color: "var(--accent)" }}>
              全部 →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((skill, i) => <SkillCard key={skill.slug} skill={skill} index={i} />)}
          </div>
        </section>

        {/* Projects section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold tracking-tight">项目 & 想法</h2>
            <Link href="/projects" className="text-sm hover:opacity-70 transition-opacity" style={{ color: "var(--accent)" }}>
              全部 →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projects.map((project, i) => <ProjectCard key={project.slug} project={project} index={i} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
