import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-20" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-3xl mx-auto px-6 py-8 flex items-center justify-between text-sm" style={{ color: "var(--muted)" }}>
        <span>© {new Date().getFullYear()} Rayson Xu</span>
        <div className="flex gap-4">
          <Link href="https://github.com/xj0k" target="_blank" rel="noopener" className="hover:opacity-80 transition-opacity">
            GitHub
          </Link>
          <Link href="/blog" className="hover:opacity-80 transition-opacity">博客</Link>
        </div>
      </div>
    </footer>
  );
}
