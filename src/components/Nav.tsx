"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "博客" },
  { href: "/skills", label: "AI Skills" },
  { href: "/projects", label: "项目" },
  { href: "/about", label: "关于" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-md" style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--background) 80%, transparent)" }}>
      <nav className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-base tracking-tight hover:opacity-80 transition-opacity">
          Rayson Xu
        </Link>
        <div className="flex items-center gap-1">
          {links.slice(1).map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-1.5 text-sm rounded-md transition-colors"
                style={{ color: active ? "var(--foreground)" : "var(--muted)" }}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md"
                    style={{ background: "var(--card)" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
