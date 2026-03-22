# rayweb — raysonxu.com

个人网站，基于 Next.js 15 构建。

## 技术栈

- **框架**: Next.js 15 (App Router, 静态导出)
- **样式**: Tailwind CSS + CSS Variables
- **动效**: Framer Motion
- **内容**: Markdown 文件驱动
- **部署**: Cloudflare Pages

## 本地开发

```bash
export PATH="$HOME/.nvm/versions/node/v20.5.0/bin:$PATH"  # 如需切换 Node 版本
npm install
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 内容管理

内容文件存放在 `src/content/` 目录：

- `blog/` — 博客文章 (`.md`)
- `skills/` — AI Skills (`.md`)
- `projects/` — 项目介绍 (`.md`)

### 新建博客文章

在 `src/content/blog/` 创建 `.md` 文件：

```markdown
---
title: "文章标题"
date: "2026-03-22"
excerpt: "文章摘要"
tags: ["标签1", "标签2"]
---

正文内容...
```

## 部署到 Cloudflare Pages

1. 推送代码到 GitHub (`xj0k/rayweb`)
2. 在 Cloudflare Pages 连接 GitHub 仓库，或通过 GitHub Actions 自动部署

GitHub Actions 需要在仓库 Secrets 中配置：
- `CLOUDFLARE_API_TOKEN` — Cloudflare API Token
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare Account ID

构建配置：
- Build command: `npm run build`
- Build output directory: `out`
- Node.js version: `20`
