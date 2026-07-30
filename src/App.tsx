import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";

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
    statement: "법률 서비스의 높은 진입 장벽을, 실시간 상담 경험으로 낮췄습니다.",
    description: "WebSocket 기반 1:1 채팅을 중심으로 React, Spring Boot, FastAPI를 연결했습니다. 기능을 늘리는 데 그치지 않고 인증·데이터 일관성·서버 역할 분리를 함께 설계했습니다.",
    decisions: [["문제", "복잡한 절차와 높은 상담 비용"], ["판단", "메인 서버와 AI 서버의 책임 분리"], ["구현", "STOMP 실시간 채팅 · JWT · RAG"]],
    tags: ["Spring Boot", "React", "WebSocket", "FastAPI", "Oracle"],
    image: "projects/lawpartner/architecture.png", github: "https://github.com/MadSadly/LawPartner",
  },
  {
    id: "medneuro", number: "02", category: "MEDICAL · VISUALIZATION", title: "MedNeuro",
    statement: "전문가의 의료 영상을, 웹에서 탐색 가능한 경험으로 옮겼습니다.",
    description: "의료 영상 처리와 3D 시각화를 하나의 흐름으로 연결했습니다. Java 서버는 서비스와 데이터를, Python은 영상 처리를 맡도록 나누어 복잡도를 제어했습니다.",
    decisions: [["문제", "제한된 장소와 전용 소프트웨어"], ["판단", "처리 서버와 서비스 서버 분리"], ["구현", "NIfTI · DICOM · Three.js"]],
    tags: ["Spring Boot", "Python", "Three.js", "Medical AI"],
    image: "projects/medneduro/overview-key-tech.png", github: "https://github.com/MadSadly/MedNeuro",
  },
  {
    id: "ai", number: "03", category: "AI · MODEL TO PRODUCT", title: "Models, made useful.",
    statement: "모델의 정확도보다, 결과가 실제로 쓰이는 방식까지 고민합니다.",
    description: "심장질환 예측, 용접 결함 분류, 위성 기반 표적 분석을 수행했습니다. 비교 실험과 설명 가능성을 거쳐 사용자가 결과를 확인할 수 있는 인터페이스까지 구현했습니다.",
    decisions: [["ML", "심장질환 위험 예측과 변수 해석"], ["DL", "EfficientNetV2 기반 결함 분류"], ["LLM", "탐지 결과를 전술 브리핑으로 변환"]],
    tags: ["Python", "EfficientNetV2", "Scikit-learn", "LLM", "XAI"],
    image: "projects/medneduro/architecture.png",
  },
] as const;

export default function App() {
  const [page, setPage] = useState(0);
  const touchStart = useRef<number | null>(null);
  const move = (direction: number) => setPage((current) => Math.min(pages.length - 1, Math.max(0, current + direction)));

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") setPage((p) => Math.min(pages.length - 1, p + 1));
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") setPage((p) => Math.max(0, p - 1));
      if (event.key === "Home") setPage(0);
      if (event.key === "End") setPage(pages.length - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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
              {"github" in activeProject && (
                <a className="text-link" href={activeProject.github} target="_blank" rel="noreferrer"><Github size={17} /> 저장소 보기</a>
              )}
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
              <div><span>FOCUS</span><p>Java · Spring 기반 백엔드와 Python AI 서비스를 연결합니다.</p></div>
              <div><span>APPROACH</span><p>기능의 수보다 문제 해결의 근거, 안정성, 지속 가능성을 봅니다.</p></div>
              <div><span>EXPERIENCE</span><p>실시간 채팅, 의료 영상, ML·DL·LLM 프로젝트를 완성했습니다.</p></div>
              <div><span>NEXT</span><p>사용자에게 도달하는 AI와 신뢰할 수 있는 서버를 만들고 싶습니다.</p></div>
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
    </main>
  );
}
