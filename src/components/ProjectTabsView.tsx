import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, Github, Play, X } from "lucide-react";
import type { ProjectItem } from "../types/project";

type ProjectTabsViewProps = {
  project: ProjectItem;
};

function publicAssetUrl(relativePath: string): string {
  return `${import.meta.env.BASE_URL}${relativePath.replace(/^\//, "")}`;
}

/**
 * LawPartner 등 — 상단 시연 영상 영역 + 하위 탭(배경·개요·목표 등)
 * 영상은 나중에 <video> 또는 iframe 으로 교체하면 됩니다.
 */
export function ProjectTabsView({ project }: ProjectTabsViewProps) {
  const tabs = project.detailTabs ?? [];
  const [tabId, setTabId] = useState(tabs[0]?.id ?? "");
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  /* 상단 프로젝트 탭 전환 시 하위 탭을 첫 항목으로 리셋 */
  useEffect(() => {
    setTabId(project.detailTabs?.[0]?.id ?? "");
  }, [project.id]);

  /* 이미지 라이트박스: ESC로 닫기, 스크롤 잠금 (GitHub Pages 정적 호스팅에서도 동작) */
  useEffect(() => {
    if (!lightboxUrl) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxUrl(null);
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxUrl]);

  const activeTab = tabs.find((t) => t.id === tabId) ?? tabs[0];

  const lightbox =
    lightboxUrl &&
    createPortal(
      <div
        className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="이미지 확대 보기"
        onClick={() => setLightboxUrl(null)}
      >
        <button
          type="button"
          className="absolute right-4 top-4 rounded-lg border border-white/20 bg-zinc-900/90 p-2 text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
          aria-label="닫기"
          onClick={(e) => {
            e.stopPropagation();
            setLightboxUrl(null);
          }}
        >
          <X className="h-6 w-6" aria-hidden />
        </button>
        <img
          src={lightboxUrl}
          alt=""
          className="max-h-[min(92vh,100%)] max-w-[min(96vw,100%)] object-contain shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
        <p className="pointer-events-none absolute bottom-4 left-0 right-0 text-center text-xs text-zinc-500">
          바깥 영역 클릭 또는 Esc로 닫기
        </p>
      </div>,
      document.body
    );

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-glass backdrop-blur-md sm:p-6">
      {lightbox}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <h3 className="text-xl font-semibold text-zinc-50">{project.title}</h3>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent transition hover:bg-accent/20"
        >
          <Github className="h-4 w-4" aria-hidden />
          GitHub
          <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
        </a>
      </div>

      {/* 메인: 시연 영상 — demoVideoSrc 있으면 재생, 없으면 플레이스홀더 */}
      {(project.demoVideoSrc || project.showDemoPlaceholder !== false) && (
        <div className="mb-6">
          {project.demoVideoSrc ? (
            <div
              className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-lg"
              aria-label="시연 영상"
            >
              <video
                className="aspect-video w-full bg-black object-contain"
                controls
                playsInline
                preload="metadata"
                src={`${import.meta.env.BASE_URL}${project.demoVideoSrc.replace(/^\//, "")}`}
              >
                시연 영상을 재생할 수 없습니다. 브라우저가 MP4 재생을 지원하는지 확인하세요.
              </video>
            </div>
          ) : (
            <div
              className="relative flex aspect-video w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-dashed border-accent/30 bg-black/40 px-6 text-center"
              aria-label="시연 영상 영역"
            >
              <Play className="h-14 w-14 text-accent/50" strokeWidth={1.25} aria-hidden />
              <div className="space-y-1">
                <p className="text-sm font-medium text-zinc-300">시연 영상</p>
                <p className="text-xs text-zinc-500">
                  준비되면 여기에 &lt;video&gt; 또는 YouTube·Vimeo 임베드를 넣으면 됩니다.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 하위 탭 — 모바일에서는 가로 스크롤 */}
      <div
        className="mb-4 flex gap-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="프로젝트 상세 탭"
      >
        {tabs.map((t) => {
          const selected = t.id === activeTab?.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={selected}
              id={`subtab-${project.id}-${t.id}`}
              aria-controls={`subpanel-${project.id}-${t.id}`}
              onClick={() => setTabId(t.id)}
              className={`shrink-0 rounded-lg px-3 py-2 text-left text-xs font-medium transition sm:text-sm ${
                selected
                  ? "bg-accent/20 text-accent"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {activeTab && (
        <div
          role="tabpanel"
          id={`subpanel-${project.id}-${activeTab.id}`}
          aria-labelledby={`subtab-${project.id}-${activeTab.id}`}
          className="min-h-[8rem] rounded-xl border border-white/10 bg-black/25 p-4 sm:p-5"
        >
          {activeTab.images && activeTab.images.length > 0 && (
            <div className="mb-6 space-y-4">
              {activeTab.images.map((src) => {
                const fullUrl = publicAssetUrl(src);
                return (
                  <figure
                    key={src}
                    className="overflow-hidden rounded-lg border border-white/10 bg-zinc-950/50"
                  >
                    <button
                      type="button"
                      className="group relative block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                      onClick={() => setLightboxUrl(fullUrl)}
                      aria-label="이미지 크게 보기"
                    >
                      <img
                        src={fullUrl}
                        alt=""
                        className="w-full cursor-zoom-in object-contain transition group-hover:opacity-95"
                        loading="lazy"
                      />
                      <span className="pointer-events-none absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-[10px] text-zinc-300 opacity-0 transition group-hover:opacity-100 sm:text-xs">
                        클릭하여 확대
                      </span>
                    </button>
                  </figure>
                );
              })}
            </div>
          )}
          <div className="whitespace-pre-wrap break-keep text-sm leading-relaxed text-zinc-300">
            {activeTab.content}
          </div>
          {/* 개요 탭에서 태그도 함께 보이도록: id가 overview 일 때 */}
          {activeTab.id === "overview" && project.tags.length > 0 && (
            <ul
              className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4"
              aria-label="기술 태그"
            >
              {project.tags.map((tag) => (
                <li key={tag}>
                  <span className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-xs text-zinc-400">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  );
}
