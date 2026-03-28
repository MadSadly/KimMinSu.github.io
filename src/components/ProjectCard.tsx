import { ExternalLink, Github } from "lucide-react";
import type { ProjectItem } from "../types/project";

type ProjectCardProps = {
  project: ProjectItem;
};

/**
 * 프로젝트 카드 — GitHub 링크, 설명, 태그
 * 새 프로젝트는 src/data/projects.json 에 항목만 추가하면 됩니다.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, githubUrl, tags } = project;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-glass backdrop-blur-md transition hover:border-accent/40 hover:shadow-accent">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <h3 className="text-xl font-semibold text-zinc-50">{title}</h3>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent transition hover:bg-accent/20"
        >
          <Github className="h-4 w-4" aria-hidden />
          GitHub
          <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
        </a>
      </div>

      <p className="mb-6 flex-1 text-[15px] leading-relaxed text-zinc-400">
        {description}
      </p>

      <ul className="flex flex-wrap gap-2" aria-label="프로젝트 태그">
        {tags.map((tag) => (
          <li key={tag}>
            <span className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-xs text-zinc-400">
              {tag}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
