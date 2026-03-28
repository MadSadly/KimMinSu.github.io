import type { LucideIcon } from "lucide-react";
import {
  Braces,
  Database,
  GitBranch,
  Globe,
  Layers,
  Server,
  Sparkles,
} from "lucide-react";

type StackGroup = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

/** 기술 스택 그룹 — Lucide 아이콘으로 카테고리 표현 */
const groups: StackGroup[] = [
  {
    title: "Languages",
    icon: Braces,
    // 프로그래밍 언어만
    items: ["Java", "Python", "C", "JavaScript"],
  },
  {
    title: "Frontend",
    icon: Globe,
    // JSP는 서버에서 HTML 뷰를 만드는 프레젠테이션 계층이라 UI 그룹에 둠
    items: ["React", "Vue.js", "JSP", "Node.js", "HTML5", "CSS3"],
  },
  {
    title: "Backend",
    icon: Server,
    items: [
      "Spring Boot",
      "Spring Framework",
      "Spring Batch",
      "Spring MVC",
      "MyBatis",
      "Spring Data JPA",
      "Spring Security",
    ],
  },
  {
    title: "Database",
    icon: Database,
    items: ["Oracle", "Oracle DB", "Oracle SQL", "MariaDB"],
  },
  {
    title: "AI / LLM",
    icon: Sparkles,
    items: ["LangChain", "LLM", "머신러닝", "딥러닝"],
  },
  {
    title: "DevOps / Cloud",
    icon: Layers,
    items: [
      "Git",
      "GitHub",
      "GitHub Actions",
      "Amazon EC2",
      "Amazon S3",
    ],
  },
];

export function TechStack() {
  return (
    <section id="stack" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
          Tech Stack
        </h2>
        <p className="mb-10 text-2xl font-semibold text-zinc-100">기술 스택</p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(({ title, icon: Icon, items }) => (
            <article
              key={title}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-5 shadow-glass backdrop-blur-md"
            >
              <div className="mb-4 flex items-center gap-2 text-accent">
                <Icon className="h-5 w-5" aria-hidden />
                <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-200">
                  {title}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {items.map((name) => (
                  <li key={name}>
                    <span className="inline-block rounded-lg border border-white/10 bg-black/30 px-2.5 py-1 text-xs text-zinc-300">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-8 flex items-center gap-2 text-xs text-zinc-500">
          <GitBranch className="h-3.5 w-3.5" aria-hidden />
          AI·ML 심화 주제는{" "}
          <a href="#education" className="text-accent hover:underline">
            교육 · 활동
          </a>
          커리큘럼 카드(기초 + 심화 통합)에서 확인할 수 있습니다.
        </p>
      </div>
    </section>
  );
}
