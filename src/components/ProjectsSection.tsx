import { useMemo, useState } from "react";
import { FolderGit2 } from "lucide-react";
import type { ProjectItem } from "../types/project";
import { ProjectCard } from "./ProjectCard";
import { ProjectTabsView } from "./ProjectTabsView";

type ProjectsSectionProps = {
  projects: ProjectItem[];
};

/**
 * 프로젝트 영역 — 탭으로 프로젝트 전환 + 선택된 항목은 카드로 상세 표시
 */
export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeId, setActiveId] = useState(projects[0]?.id ?? "");

  const active = useMemo(
    () => projects.find((p) => p.id === activeId) ?? projects[0],
    [projects, activeId]
  );

  if (projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-accent">
          <FolderGit2 className="h-4 w-4" aria-hidden />
          Projects
        </h2>
        <p className="mb-8 text-2xl font-semibold text-zinc-100">프로젝트</p>

        {/* 탭 버튼: JSON 항목 수만큼 자동 생성 */}
        <div
          className="mb-6 flex flex-wrap gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-sm"
          role="tablist"
          aria-label="프로젝트 선택"
        >
          {projects.map((p) => {
            const selected = p.id === active?.id;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`project-panel-${p.id}`}
                id={`project-tab-${p.id}`}
                onClick={() => setActiveId(p.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  selected
                    ? "bg-accent/20 text-accent shadow-inner"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                }`}
              >
                {p.title}
              </button>
            );
          })}
        </div>

        {/* 활성 탭에 대응하는 패널 */}
        {active && (
          <div
            role="tabpanel"
            id={`project-panel-${active.id}`}
            aria-labelledby={`project-tab-${active.id}`}
          >
            {active.detailTabs && active.detailTabs.length > 0 ? (
              <ProjectTabsView project={active} />
            ) : (
              <ProjectCard project={active} />
            )}
          </div>
        )}

        <p className="mt-6 text-xs text-zinc-500">
          새 프로젝트 추가:{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-400">
            src/data/projects.json
          </code>{" "}
          파일에 객체를 한 줄 추가하면 탭과 카드가 자동 반영됩니다.
        </p>
      </div>
    </section>
  );
}
