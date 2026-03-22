import { getAllProjects } from "@/lib/content";
import { ProjectCard } from "@/components/Cards";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "项目",
  description: "产品想法、概念与正在进行的项目",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const statuses = ["已发布", "进行中", "概念"] as const;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-2">项目 & 想法</h1>
      <p className="mb-10 text-base" style={{ color: "var(--muted)" }}>
        正在探索的产品想法和概念，从零到一的过程记录
      </p>
      {statuses.map((status) => {
        const filtered = projects.filter((p) => p.status === status);
        if (!filtered.length) return null;
        return (
          <div key={status} className="mb-10">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: status === "已发布" ? "#10b981" : status === "进行中" ? "#3b82f6" : "#f59e0b" }} />
              {status}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filtered.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
