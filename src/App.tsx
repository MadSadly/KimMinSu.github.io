import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, FileText, Github, Play, Presentation, X } from "lucide-react";

const pages = [
  { id: "intro", label: "Index" },
  { id: "lawpartner", label: "01" },
  { id: "medneuro", label: "02" },
  { id: "ai", label: "03" },
  { id: "about", label: "About" },
] as const;

const projects = [
  {
    id: "lawpartner", number: "01", category: "FULL-STACK · REAL-TIME", title: "LawPartner",
    statement: "서비스의 첫 화면부터 상담 이후의 경험까지 연결했습니다.",
    description: "메인페이지와 일반 사용자 마이페이지, 1:1 채팅, 헤더 알림을 담당했습니다. 팀이 빠르게 개발을 시작할 수 있도록 초기 개발 환경을 구축하고 프로젝트 일정도 제안했습니다.",
    decisions: [["화면", "메인페이지 · 일반 마이페이지"], ["소통", "1:1 채팅 · 헤더 알림"], ["협업", "개발 환경 구축 · 일정 제안"]],
    tags: ["React", "Spring", "Python"],
    image: "https://i.ytimg.com/vi/Gf6rH7uUiC8/maxresdefault.jpg", github: "https://github.com/MadSadly/LawPartner",
  },
  {
    id: "medneuro", number: "02", category: "MEDICAL · VISUALIZATION", title: "MedNeuro",
    statement: "사용자가 의료 서비스에 진입하고 이전 기록을 확인하는 흐름을 구현했습니다.",
    description: "로그인과 회원가입, 최근 이력 조회 기능을 담당했습니다. 프로젝트 초기에 React, Spring, Python 개발 환경을 설정해 팀이 같은 기준에서 작업할 수 있도록 구성했습니다.",
    decisions: [["인증", "로그인 · 회원가입"], ["조회", "사용자의 최근 이력"], ["협업", "개발 환경 초기 설정"]],
    tags: ["React", "Spring", "Python"],
    image: "projects/medneduro/background.png", github: "https://github.com/MadSadly/MedNeuro",
  },
  {
    id: "ai", number: "03", category: "AI · MODEL TO PRODUCT", title: "Models, made useful.",
    statement: "모델의 정확도보다, 결과가 실제로 쓰이는 방식까지 고민합니다.",
    description: "심장질환 예측, 용접 결함 분류, 위성 기반 표적 분석을 수행했습니다. 비교 실험과 설명 가능성을 거쳐 사용자가 결과를 확인할 수 있는 인터페이스까지 구현했습니다.",
    decisions: [["ML", "심장질환 위험 예측과 변수 해석"], ["DL", "EfficientNetV2 기반 결함 분류"], ["LLM", "탐지 결과를 전술 브리핑으로 변환"]],
    tags: ["Python", "EfficientNetV2", "Scikit-learn", "LLM", "XAI"],
    image: "projects/ai-portfolio/fdc-cover.png",
  },
] as const;

type MediaItem = {
  title: string;
  type: "youtube" | "video" | "pdf" | "image";
  src: string;
};

const projectMedia: Record<string, MediaItem[]> = {
  lawpartner: [
    { title: "시연 영상", type: "youtube", src: "https://www.youtube.com/embed/Gf6rH7uUiC8" },
    { title: "프로젝트 배경", type: "image", src: "projects/lawpartner/background.png" },
    { title: "시스템 아키텍처", type: "image", src: "projects/lawpartner/architecture.png" },
    { title: "네트워크 구조", type: "image", src: "projects/lawpartner/network.png" },
    { title: "ERD", type: "image", src: "projects/lawpartner/erd.png" },
    { title: "프로젝트 일정", type: "image", src: "projects/lawpartner/schedule-part1.png" },
  ],
  medneuro: [
    { title: "시연 영상", type: "video", src: "videos/medneduro-demo.mp4" },
    { title: "프로젝트 배경", type: "image", src: "projects/medneduro/background.png" },
    { title: "핵심 기술", type: "image", src: "projects/medneduro/overview-key-tech.png" },
    { title: "시스템 아키텍처", type: "image", src: "projects/medneduro/architecture.png" },
    { title: "ERD", type: "image", src: "projects/medneduro/medneduro-erd.png" },
    { title: "프로젝트 일정", type: "image", src: "projects/medneduro/project-schedule.png" },
  ],
  ai: [
    { title: "ML 분석 보고서", type: "pdf", src: "projects/ai-portfolio/ai-ml-report.pdf" },
    { title: "용접 결함 분류", type: "pdf", src: "projects/ai-portfolio/ai-welding-defect-classification.pdf" },
    { title: "FDC 전술 AI", type: "pdf", src: "projects/ai-portfolio/fdc-tactical-ai.pdf" },
  ],
};

export default function App() {
  const [page, setPage] = useState(0);
  const [media, setMedia] = useState<MediaItem | null>(null);
  const touchStart = useRef<number | null>(null);
  const move = (direction: number) => setPage((current) => Math.min(pages.length - 1, Math.max(0, current + direction)));

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMedia(null);
        return;
      }
      if (media) return;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") setPage((p) => Math.min(pages.length - 1, p + 1));
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") setPage((p) => Math.max(0, p - 1));
      if (event.key === "Home") setPage(0);
      if (event.key === "End") setPage(pages.length - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [media]);

  const activeProject = projects.find((project) => project.id === pages[page].id);

  return (
    <main className="portfolio"
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(distance) > 50) move(distance < 0 ? 1 : -1);
        touchStart.current = null;
      }}>
      <header className="site-header">
        <button className="wordmark" onClick={() => setPage(0)}>KIM MIN SU</button>
        <nav aria-label="페이지 선택">
          {pages.map((item, index) => (
            <button key={item.id} className={page === index ? "active" : ""} aria-current={page === index ? "page" : undefined} onClick={() => setPage(index)}>
              {item.label}
            </button>
          ))}
        </nav>
        <a className="header-link" href="https://github.com/MadSadly" target="_blank" rel="noreferrer">GitHub <ExternalLink size={13} /></a>
      </header>

      <section className="stage" aria-live="polite">
        {page === 0 && (
          <article className="intro-page page-enter">
            <p className="eyebrow">BACKEND ENGINEER · AI EXPLORER</p>
            <h1>복잡한 요구사항을<br /><em>운영 가능한 시스템</em>으로 만듭니다.</h1>
            <div className="intro-bottom">
              <p>실시간 통신부터 AI 모델 연동까지.<br />기술을 선택하는 이유와 서비스가 지속되는 방식을 고민합니다.</p>
              <button className="text-link" onClick={() => move(1)}>대표 작업 보기 <ArrowRight size={18} /></button>
            </div>
            <span className="hero-index">00</span>
          </article>
        )}

        {activeProject && (
          <article className="project-page page-enter">
            <div className="project-copy">
              <p className="eyebrow">{activeProject.number} / {activeProject.category}</p>
              <h2>{activeProject.title}</h2>
              <h3>{activeProject.statement}</h3>
              <p className="project-description">{activeProject.description}</p>
              <dl>
                {activeProject.decisions.map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}
              </dl>
              <div className="tag-list">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="project-actions">
                {"github" in activeProject && (
                  <a className="text-link" href={activeProject.github} target="_blank" rel="noreferrer"><Github size={17} /> 저장소</a>
                )}
                <button className="text-link" onClick={() => setMedia(projectMedia[activeProject.id][0])}>
                  {projectMedia[activeProject.id][0].type === "pdf" ? <FileText size={17} /> : <Play size={17} />}
                  자료 보기
                </button>
              </div>
            </div>
            <div className="project-visual">
              <div className="image-frame"><img src={activeProject.image} alt={`${activeProject.title} 구조 자료`} /></div>
              <span className="visual-caption">SELECTED WORK / 2026</span>
            </div>
          </article>
        )}

        {page === pages.length - 1 && (
          <article className="about-page page-enter">
            <div><p className="eyebrow">ABOUT · KIM MIN SU</p><h2>구현하는 사람에서,<br /><em>판단하는 개발자</em>로.</h2></div>
            <div className="about-grid">
              <div><span>CURRENT</span><p><strong>JNKC · 연구원</strong><br />2026.05.11 — 현재</p></div>
              <div><span>CURRENT WORK</span><p>로컬 AI LLM을 활용한 제조 특화 AI 에이전트를 개발합니다.</p></div>
              <div><span>WORK STACK</span><p><strong>Python · C#</strong><br />모델과 제조 현장의 요구를 연결합니다.</p></div>
              <div><span>PROJECTS</span><p>React · Spring · Python으로 사용자 기능과 개발 환경을 구축했습니다.</p></div>
            </div>
            <a className="contact-line" href="https://github.com/MadSadly" target="_blank" rel="noreferrer">Let&apos;s build something useful. <ArrowRight size={24} /></a>
          </article>
        )}
      </section>

      <footer className="controls">
        <span>{String(page + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}</span>
        <div>
          <button onClick={() => move(-1)} disabled={page === 0} aria-label="이전 화면"><ArrowLeft /></button>
          <button onClick={() => move(1)} disabled={page === pages.length - 1} aria-label="다음 화면"><ArrowRight /></button>
        </div>
        <span className="hint">ARROW KEYS / SWIPE</span>
      </footer>

      {media && (
        <div className="viewer-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setMedia(null);
        }}>
          <section className="media-viewer" role="dialog" aria-modal="true" aria-label={`${media.title} 자료 뷰어`}>
            <header>
              <div>
                <span>PROJECT ARCHIVE</span>
                <h2>{media.title}</h2>
              </div>
              <button onClick={() => setMedia(null)} aria-label="자료 뷰어 닫기"><X /></button>
            </header>
            <div className="viewer-body">
              {media.type === "youtube" && <iframe src={media.src} title={media.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />}
              {media.type === "video" && <video src={media.src} controls playsInline />}
              {media.type === "pdf" && <iframe src={`${media.src}#view=FitH`} title={media.title} />}
              {media.type === "image" && <img src={media.src} alt={media.title} />}
            </div>
            <nav className="archive-list" aria-label="프로젝트 자료 선택">
              {projectMedia[activeProject?.id ?? "ai"].map((item) => (
                <button key={item.title} className={item.src === media.src ? "active" : ""} onClick={() => setMedia(item)}>
                  {item.type === "video" || item.type === "youtube" ? <Play size={13} /> : item.type === "pdf" ? <FileText size={13} /> : <Presentation size={13} />}
                  {item.title}
                </button>
              ))}
            </nav>
          </section>
        </div>
      )}
    </main>
  );
}
