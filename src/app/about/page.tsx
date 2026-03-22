import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于",
  description: "关于 Rayson Xu",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">关于我</h1>
      <div className="prose">
        <p>
          你好，我是 <strong>Rayson Xu</strong>，一名有着多年经验的软件工程师，现在带领产品经理团队。
        </p>
        <p>
          我的工作横跨技术与产品两个领域——既能写代码，也能做战略。目前专注于 AI 工具的应用与落地，
          探索如何用 AI 提升个人和团队的工作效率。
        </p>
        <h2>我关注的方向</h2>
        <ul>
          <li><strong>AI 工具与效率</strong>：如何用 AI 工具改变工作方式</li>
          <li><strong>产品思维</strong>：从用户需求到产品决策的方法论</li>
          <li><strong>软件工程</strong>：架构、工程效率与团队协作</li>
          <li><strong>AI Prompt 工程</strong>：更好地与大语言模型协作</li>
        </ul>
        <h2>这个网站</h2>
        <p>
          这里是我的数字花园，用来记录思考、沉淀经验，以及分享我收集整理的 AI Skills。
          如果你有想法，欢迎通过 GitHub 联系我。
        </p>
        <h2>联系方式</h2>
        <ul>
          <li>GitHub: <a href="https://github.com/xj0k" target="_blank" rel="noopener">@xj0k</a></li>
        </ul>
      </div>
    </div>
  );
}
