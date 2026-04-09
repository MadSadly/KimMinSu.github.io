import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, ExternalLink, Github, Maximize2, Play, X } from "lucide-react";
import type { ProjectItem } from "../types/project";

type LightboxState =
  | { kind: "image"; url: string }
  | { kind: "pdf"; url: string }
  | null;

type ProjectTabsViewProps = {
  project: ProjectItem;
};

function publicAssetUrl(relativePath: string): string {
  return `${import.meta.env.BASE_URL}${relativePath.replace(/^\//, "")}`;
}

function parseYoutubeVideoId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return id && /^[\w-]{6,}$/.test(id) ? id : null;
    }
    if (!u.hostname.includes("youtube.com")) return null;
    if (u.pathname.startsWith("/embed/")) {
      return u.pathname.slice("/embed/".length).split("/")[0] || null;
    }
    if (u.pathname.startsWith("/shorts/")) {
      return u.pathname.slice("/shorts/".length).split("/")[0] || null;
    }
    const v = u.searchParams.get("v");
    return v && /^[\w-]{6,}$/.test(v) ? v : null;
  } catch {
    return null;
  }
}

type DemoMedia =
  | { kind: "iframe"; src: string }
  | { kind: "video"; src: string };

function resolveDemoMedia(demoVideoSrc: string): DemoMedia {
  const raw = demoVideoSrc.trim();
  if (/^https?:\/\//i.test(raw)) {
    const ytId = parseYoutubeVideoId(raw);
    if (ytId) {
      return {
        kind: "iframe",
        src: `https://www.youtube.com/embed/${ytId}`,
      };
    }
    return { kind: "video", src: raw };
  }
  return { kind: "video", src: publicAssetUrl(raw) };
}

/** 통합 테스트 갤러리: 섹션 전환 시 이전 이미지를 유지한 뒤 디코드·페이드 인 (빈 화면 깜빡임 방지) */
function GalleryCrossfadeImage({
  srcRel,
  onOpenLightbox,
}: {
  srcRel: string;
  onOpenLightbox: (payload: { kind: "image"; url: string }) => void;
}) {
  const fullUrl = publicAssetUrl(srcRel);
  const [baseUrl, setBaseUrl] = useState(fullUrl);
  const [overlayUrl, setOverlayUrl] = useState<string | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    if (fullUrl === baseUrl) return;
    setOverlayUrl(fullUrl);
    setOverlayVisible(false);
  }, [fullUrl, baseUrl]);

  const finishOverlay = (loadedSrc: string) => {
    setBaseUrl(loadedSrc);
    setOverlayUrl(null);
    setOverlayVisible(false);
  };

  const handleOverlayLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
    const loadedSrc = e.currentTarget.currentSrc || e.currentTarget.src;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduceMotion) {
      finishOverlay(loadedSrc);
      return;
    }
    requestAnimationFrame(() => setOverlayVisible(true));
  };

  const handleOverlayTransitionEnd: React.TransitionEventHandler<HTMLImageElement> = (e) => {
    if (e.propertyName !== "opacity") return;
    finishOverlay(e.currentTarget.currentSrc || e.currentTarget.src);
  };

  return (
    <figure className="overflow-hidden rounded-lg border border-white/10 bg-zinc-950/80">
      <button
        type="button"
        className="group relative block w-full min-h-[12rem] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        onClick={() => onOpenLightbox({ kind: "image", url: fullUrl })}
        aria-label="이미지 크게 보기"
      >
        <div className="relative w-full">
          <img
            src={baseUrl}
            alt=""
            className="relative z-0 w-full object-contain"
            decoding="async"
            draggable={false}
          />
          {overlayUrl && (
            <img
              key={overlayUrl}
              src={overlayUrl}
              alt=""
              decoding="async"
              draggable={false}
              onLoad={handleOverlayLoad}
              onTransitionEnd={handleOverlayTransitionEnd}
              className={`absolute inset-0 z-[1] w-full object-contain transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                overlayVisible ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>
        <span className="pointer-events-none absolute bottom-2 right-2 z-[2] rounded bg-black/60 px-2 py-1 text-[10px] text-zinc-300 opacity-0 transition group-hover:opacity-100 sm:text-xs">
          클릭하여 확대
        </span>
      </button>
    </figure>
  );
}

/**
 * LawPartner 등 — 상단 시연 영상 영역 + 하위 탭(배경·개요·목표 등)
 * 영상은 나중에 <video> 또는 iframe 으로 교체하면 됩니다.
 */
export function ProjectTabsView({ project }: ProjectTabsViewProps) {
  const tabs = project.detailTabs ?? [];
  const [tabId, setTabId] = useState(tabs[0]?.id ?? "");
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [gallerySectionId, setGallerySectionId] = useState<string>("");

  /* 상단 프로젝트 탭 전환 시 하위 탭을 첫 항목으로 리셋 */
  useEffect(() => {
    setTabId(project.detailTabs?.[0]?.id ?? "");
  }, [project.id]);

  /* 이미지·PDF 라이트박스: ESC로 닫기, 스크롤 잠금 (GitHub Pages 정적 호스팅에서도 동작) */
  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox]);

  const activeTab = tabs.find((t) => t.id === tabId) ?? tabs[0];

  const gallerySectionsRaw = activeTab?.imageSections;
  const gallerySectionsList = gallerySectionsRaw ?? [];

  /* 상세 탭 id가 바뀔 때만 갤러리 초기화 — 배열 참조만 바뀌는 리렌더에서는 건드리지 않음 */
  useEffect(() => {
    const sections = activeTab?.imageSections;
    if (!sections?.length) return;
    setGallerySectionId(sections[0].id);
  }, [activeTab?.id]);

  useEffect(() => {
    if (!gallerySectionsList.length) return;
    if (!gallerySectionsList.some((s) => s.id === gallerySectionId)) {
      setGallerySectionId(gallerySectionsList[0].id);
    }
  }, [gallerySectionsList, gallerySectionId]);

  const activeGallerySection =
    gallerySectionsList.find((s) => s.id === gallerySectionId) ?? gallerySectionsList[0];

  const gallerySectionIndex = activeGallerySection
    ? gallerySectionsList.findIndex((s) => s.id === activeGallerySection.id)
    : -1;

  /* 인접 섹션 이미지 선로드 — 이전/다음 전환 시 디코드 비용 감소 */
  useEffect(() => {
    if (!gallerySectionsList.length || gallerySectionIndex < 0) return;
    const idx = gallerySectionIndex;
    for (const i of [idx - 1, idx + 1]) {
      const sec = gallerySectionsList[i];
      const rel = sec?.images?.[0];
      if (!rel) continue;
      const img = new Image();
      img.src = publicAssetUrl(rel);
    }
  }, [gallerySectionsList, gallerySectionIndex]);

  const lightboxPortal =
    lightbox &&
    createPortal(
      <div
        className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label={lightbox.kind === "pdf" ? "PDF 전체 화면" : "이미지 확대 보기"}
        onClick={() => setLightbox(null)}
      >
        <button
          type="button"
          className="absolute right-4 top-4 z-[310] rounded-lg border border-white/20 bg-zinc-900/90 p-2 text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
          aria-label="닫기"
          onClick={(e) => {
            e.stopPropagation();
            setLightbox(null);
          }}
        >
          <X className="h-6 w-6" aria-hidden />
        </button>
        {lightbox.kind === "image" ? (
          <>
            <img
              src={lightbox.url}
              alt=""
              className="max-h-[min(92vh,100%)] max-w-[min(96vw,100%)] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="pointer-events-none absolute bottom-4 left-0 right-0 text-center text-xs text-zinc-500">
              바깥 영역 클릭 또는 Esc로 닫기
            </p>
          </>
        ) : (
          <div
            className="flex h-[min(96dvh,960px)] w-full max-w-6xl flex-col gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="shrink-0 text-center text-xs text-zinc-500">
              브라우저 PDF 뷰어입니다. 바깥 어두운 영역을 클릭하거나 Esc로 닫을 수 있습니다.
            </p>
            <iframe
              title="PDF 전체 화면"
              src={lightbox.url}
              className="min-h-0 w-full flex-1 rounded-lg border border-white/10 bg-zinc-900"
              style={{ minHeight: "min(88dvh, 880px)" }}
            />
          </div>
        )}
      </div>,
      document.body
    );

  const demoMedia = project.demoVideoSrc
    ? resolveDemoMedia(project.demoVideoSrc)
    : null;

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-glass backdrop-blur-md sm:p-6">
      {lightboxPortal}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <h3 className="text-xl font-semibold text-zinc-50">{project.title}</h3>
        {project.githubUrl && (
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
        )}
      </div>

      {/* 메인: 시연 영상 — demoVideoSrc 있으면 재생, 없으면 플레이스홀더 */}
      {(project.demoVideoSrc || project.showDemoPlaceholder !== false) && (
        <div className="mb-6">
          {demoMedia ? (
            <div
              className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-lg"
              aria-label="시연 영상"
            >
              {demoMedia.kind === "iframe" ? (
                <iframe
                  className="aspect-video w-full bg-black"
                  src={demoMedia.src}
                  title="시연 영상"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video
                  className="aspect-video w-full bg-black object-contain"
                  controls
                  playsInline
                  preload="metadata"
                  src={demoMedia.src}
                >
                  시연 영상을 재생할 수 없습니다. 브라우저가 MP4 재생을 지원하는지 확인하세요.
                </video>
              )}
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
                  <code className="rounded bg-white/5 px-1 py-0.5 text-[0.7rem]">projects.json</code>의{" "}
                  <code className="rounded bg-white/5 px-1 py-0.5 text-[0.7rem]">demoVideoSrc</code>에
                  YouTube 링크 또는 mp4 URL을 넣으면 GitHub Pages에서도 재생됩니다.
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
          {activeTab.embedPdf &&
            (() => {
              const pdfRel = activeTab.embedPdf;
              const pdfUrl = new URL(publicAssetUrl(pdfRel), window.location.origin).href;
              return (
                <div className="mb-4 space-y-3 sm:mb-5">
                  <div className="flex flex-col gap-2 border-b border-white/10 pb-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-relaxed text-zinc-500">
                      아래 영역에서 PDF를 바로 읽을 수 있습니다. 긴 문서는{" "}
                      <span className="text-zinc-400">전체 화면</span> 또는{" "}
                      <span className="text-zinc-400">새 탭</span>이 더 편합니다.
                    </p>
                    <div className="flex shrink-0 flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setLightbox({ kind: "pdf", url: pdfUrl })}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-accent/50 bg-accent/15 px-3 py-1.5 text-sm font-medium text-accent transition hover:bg-accent/25"
                      >
                        <Maximize2 className="h-4 w-4" aria-hidden />
                        전체 화면
                      </button>
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-zinc-900/80 px-3 py-1.5 text-sm font-medium text-zinc-200 transition hover:border-accent/40 hover:text-accent"
                      >
                        새 탭에서 열기
                        <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden />
                      </a>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-lg border border-white/10 bg-zinc-900/50 shadow-inner">
                    <iframe
                      title={`${project.title} — ${activeTab.label} PDF`}
                      src={publicAssetUrl(pdfRel)}
                      className="block h-[min(85dvh,920px)] w-full min-h-[min(70dvh,560px)] border-0 bg-zinc-100"
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })()}
          {activeTab.embedPage && (
            <div className="mb-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <p className="text-xs text-zinc-500">아래는 미리보기입니다. 넓은 화면은 새 탭에서 보세요.</p>
                <a
                  href={new URL(publicAssetUrl(activeTab.embedPage), window.location.origin).href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-accent/50 bg-accent/15 px-3 py-1.5 text-sm font-medium text-accent transition hover:bg-accent/25"
                >
                  <Maximize2 className="h-4 w-4" aria-hidden />
                  전체보기
                  <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden />
                </a>
              </div>
              <div
                className="overflow-auto rounded-lg border border-white/10 bg-[#e8ecf0] shadow-inner"
                style={{ maxHeight: "min(70vh, 720px)" }}
              >
                <iframe
                  title={`${project.title} — ${activeTab.label}`}
                  src={publicAssetUrl(activeTab.embedPage)}
                  className="h-[min(68vh,680px)] w-full min-h-[320px] border-0 bg-[#e8ecf0]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          )}
          {gallerySectionsRaw && gallerySectionsRaw.length > 0 && !activeTab.embedPage && !activeTab.embedPdf && (
            <div className="mb-6 space-y-4">
              <p className="border-b border-white/10 pb-4 text-xs text-zinc-400">
                아래 칩에서 섹션을 고르면 통합 테스트 표·리스크 정리를 나눠 볼 수 있습니다. 이미지를 누르면 전체 화면으로
                확대됩니다.
              </p>
              <div
                className="flex flex-wrap gap-2"
                role="tablist"
                aria-label="문서 섹션"
              >
                {gallerySectionsList.map((s) => {
                  const on = s.id === activeGallerySection?.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setGallerySectionId(s.id)}
                      className={`rounded-lg border px-2.5 py-1.5 text-left text-xs font-medium transition sm:text-sm ${
                        on
                          ? "border-accent/50 bg-accent/15 text-accent"
                          : "border-white/10 bg-zinc-950/50 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
              {activeGallerySection && gallerySectionsList.length > 0 && (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-medium text-zinc-200">{activeGallerySection.label}</p>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-zinc-900/80 px-2 py-1.5 text-xs text-zinc-300 transition hover:border-accent/40 hover:text-accent disabled:opacity-40"
                      disabled={gallerySectionIndex <= 0}
                      onClick={() => {
                        const prev = gallerySectionsList[gallerySectionIndex - 1];
                        if (prev) setGallerySectionId(prev.id);
                      }}
                      aria-label="이전 섹션"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden />
                      이전
                    </button>
                    <span className="px-2 text-xs tabular-nums text-zinc-500">
                      {gallerySectionIndex + 1} / {gallerySectionsList.length}
                    </span>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-zinc-900/80 px-2 py-1.5 text-xs text-zinc-300 transition hover:border-accent/40 hover:text-accent disabled:opacity-40"
                      disabled={gallerySectionIndex >= gallerySectionsList.length - 1}
                      onClick={() => {
                        const next = gallerySectionsList[gallerySectionIndex + 1];
                        if (next) setGallerySectionId(next.id);
                      }}
                      aria-label="다음 섹션"
                    >
                      다음
                      <ChevronRight className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </div>
              )}
              {activeGallerySection?.images.map((src) => (
                <GalleryCrossfadeImage key={src} srcRel={src} onOpenLightbox={setLightbox} />
              ))}
            </div>
          )}
          {activeTab.images &&
            activeTab.images.length > 0 &&
            !activeTab.embedPage &&
            !activeTab.embedPdf &&
            !gallerySectionsRaw?.length && (
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
                      onClick={() => setLightbox({ kind: "image", url: fullUrl })}
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
          {activeTab.embedPdf ? (
            <>
              {(activeTab.id === "overview" ||
                (project.id === "ai-portfolio" &&
                  (activeTab.id === "ml" || activeTab.id === "dl"))) &&
                project.tags.length > 0 && (
                <ul
                  className="mb-3 flex flex-wrap gap-2"
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
              <details className="mt-1 rounded-lg border border-white/10 bg-zinc-950/30">
                <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.06] [&::-webkit-details-marker]:hidden">
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden className="text-zinc-500">
                      ▸
                    </span>
                    요약·상세 텍스트 펼치기
                  </span>
                </summary>
                <div className="border-t border-white/10 px-4 pb-4 pt-3">
                  <div className="whitespace-pre-wrap break-keep text-sm leading-relaxed text-zinc-300">
                    {activeTab.content}
                  </div>
                </div>
              </details>
            </>
          ) : (
            <>
              <div className="whitespace-pre-wrap break-keep text-sm leading-relaxed text-zinc-300">
                {activeTab.content}
              </div>
              {(activeTab.id === "overview" ||
                (project.id === "ai-portfolio" && activeTab.id === "ml")) &&
                project.tags.length > 0 && (
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
            </>
          )}
        </div>
      )}
    </article>
  );
}
