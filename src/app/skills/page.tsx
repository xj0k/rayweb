import { getAllSkills } from "@/lib/content";
import { SkillCard } from "@/components/Cards";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Skills",
  description: "收集整理的实用 AI Prompt 技巧与工作流",
};

export default function SkillsPage() {
  const skills = getAllSkills();

  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-2">AI Skills</h1>
      <p className="mb-10 text-base" style={{ color: "var(--muted)" }}>
        收集整理的实用 AI Prompt 技巧与工作流，持续更新
      </p>

      {categories.map((cat) => {
        const catSkills = skills.filter((s) => s.category === cat);
        return (
          <div key={cat} className="mb-10">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--accent)" }} />
              {cat}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {catSkills.map((skill, i) => (
                <SkillCard key={skill.slug} skill={skill} index={i} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
