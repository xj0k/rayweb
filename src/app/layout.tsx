import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Rayson Xu",
    template: "%s | Rayson Xu",
  },
  description: "资深软件工程师、产品团队负责人，专注 AI 内容与工具分享",
  authors: [{ name: "Rayson Xu" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://raysonxu.com",
    siteName: "Rayson Xu",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
