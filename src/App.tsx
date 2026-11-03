import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, FileText, Github, Play, Presentation, X } from "lucide-react";

const pages = [
  { id: "intro", label: "Index" },
  { id: "lawpartner", label: "01" },
  { id: "medneuro", label: "02" },
  { id: "medicore", label: "03" },
  { id: "jnkc", label: "04" },
  { id: "ai", label: "05" },
  { id: "about", label: "About" },
] as const;

const projects = [
  {
    id: "lawpartner", number: "01", category: "FULL-STACK · REAL-TIME", title: "LawPartner",
    statement: "서비스의 첫 화면부터 상담 이후의 경험까지 연결했습니다.",
    description: "메인페이지와 일반 사용자 마이페이지, 1:1 채팅, 헤더 알림을 담당했습니다. 팀이 빠르게 개발을 시작할 수 있도록 초기 개발 환경을 구축하고 프로젝트 일정도 제안했습니다.",
    decisions: [
      ["구현 화면", "메인페이지 · 일반 사용자 마이페이지 개발"],
      ["구현 기능", "1:1 채팅 · 헤더 알림 기능 개발"],
      ["프로젝트 기여", "초기 개발 환경 구축 · 개발 일정 제안"],
    ],
    tags: ["React", "Spring", "Python"],
    image: "https://i.ytimg.com/vi/Gf6rH7uUiC8/maxresdefault.jpg", github: "https://github.com/MadSadly/LawPartner",
  },
  {
    id: "medneuro", number: "02", category: "MEDICAL · VISUALIZATION", title: "MedNeuro",
    statement: "사용자가 의료 서비스에 진입하고 이전 기록을 확인하는 흐름을 구현했습니다.",
    description: "로그인과 회원가입, 최근 이력 조회 기능을 담당했습니다. 프로젝트 초기에 React, Spring, Python 개발 환경을 설정해 팀이 같은 기준에서 작업할 수 있도록 구성했습니다.",
    decisions: [
      ["인증 기능", "로그인 · 회원가입 기능 개발"],
      ["조회 기능", "사용자의 최근 이력 조회 기능 개발"],
      ["프로젝트 기여", "React · Spring · Python 초기 개발 환경 구축"],
    ],
    tags: ["React", "Spring", "Python"],
    image: "projects/medneduro/background.png", github: "https://github.com/MadSadly/MedNeuro",
  },
  {
    id: "medicore", number: "03", category: "MEDICAL AI · DISTRIBUTED SYSTEM", title: "MediCore",
    statement: "질환별로 흩어진 AI를 하나의 진단 보조 경험으로 연결했습니다.",
    description: "PL로서 프로젝트 초기 환경과 분산 시스템 구조를 구축하고, 로그인·회원가입과 공통 대시보드·환자 상세 화면을 구현했습니다. 피부질환 영역에서는 EfficientNet-B4 진단 서버부터 Grad-CAM, 품질 검사, RAG·LangGraph 기반 소견 생성까지 담당했습니다.",
    decisions: [
      ["PL 역할", "초기 개발 환경 · 분산 시스템 구조 구축"],
      ["구현 기능", "인증 · 공통 대시보드 · 환자 상세 화면 개발"],
      ["AI 구현", "피부질환 분류 · Grad-CAM · 품질 검사 · RAG 소견 생성"],
    ],
    tags: ["React", "Spring Boot", "FastAPI", "PyTorch", "LangGraph", "Docker"],
    image: "projects/medicore/patient-detail.png", github: "https://github.com/MadSadly/MediCore",
  },
  {
    id: "jnkc", number: "04", category: "MANUFACTURING AI · LOCAL LLM", title: "제조 현장을 이해하는 AI",
    statement: "제조 데이터를 찾아 답하고, 결과를 확인할 수 있는 로컬 AI를 개발했습니다.",
    description: "로컬 LLM 비교부터 파인튜닝, RAG·Text-to-SQL, 배포 환경까지 구현했습니다. 파인튜닝만으로는 변하는 데이터베이스의 사실을 안정적으로 기억시키기 어렵다는 점을 실험으로 확인하고, 학습은 표현에, 검색은 사실 확인에 쓰는 구조로 전환했습니다.",
    decisions: [
      ["모델 비교", "GPT-OSS · Qwen · Llama · EXAONE 등 비교"],
      ["파인튜닝", "SFT · CPT · LoRA 실험 · 과적합과 망각 원인 분석"],
      ["RAG · SQL", "LangGraph · 검색 분리 · SQL 실행 전 검증"],
      ["운영", "Docker 자동 배포 · 모델 상태 모니터링 구현"],
    ],
    tags: ["Python", "C#", "Local LLM", "Fine-Tuning", "RAG", "LangGraph", "Text-to-SQL", "Docker", "Streamlit"],
    image: "",
  },
  {
    id: "ai", number: "05", category: "ML · DEEP LEARNING", title: "Models, made useful.",
    statement: "모델의 정확도보다, 결과가 실제로 쓰이는 방식까지 고민합니다.",
    description: "심장질환 위험 예측과 LNG 탱크 용접 결함 분류를 수행했습니다. 여러 모델을 비교하고 설명 가능성을 검토한 뒤, 사용자가 결과를 확인할 수 있는 인터페이스까지 구현했습니다.",
    decisions: [
      ["ML 프로젝트", "심장질환 위험 예측 모델 · 변수 영향 분석"],
      ["DL 프로젝트", "EfficientNetV2 기반 용접 결함 분류 모델"],
      ["구현 범위", "모델 비교 · XAI 검토 · 결과 확인 화면 개발"],
    ],
    tags: ["Python", "EfficientNetV2", "Scikit-learn", "XAI"],
    image: "projects/ai-portfolio/ai-welding-cover.png",
  },
] as const;

type ProjectCopy = {
  statement: string;
  description: string;
  decisions: readonly (readonly [string, string])[];
};

const projectJapanese: Record<string, ProjectCopy> = {
  lawpartner: {
    statement: "サービスの入口から相談後まで、一貫したユーザー体験を実装しました。",
    description: "メインページ、一般ユーザー向けマイページ、1対1チャット、ヘッダー通知を担当しました。チームがすぐに開発を始められるよう初期環境を整備し、開発スケジュールも提案しました。",
    decisions: [
      ["実装画面", "メインページ・一般ユーザー向けマイページを開発"],
      ["実装機能", "1対1チャット・ヘッダー通知機能を開発"],
      ["プロジェクト貢献", "初期開発環境の構築・開発スケジュールの提案"],
    ],
  },
  medneuro: {
    statement: "ユーザーが医療サービスに登録し、過去の履歴を確認する流れを実装しました。",
    description: "ログイン、会員登録、最近の履歴照会を担当しました。プロジェクト初期にはReact、Spring、Pythonの開発環境を整え、チームが同じ基準で作業できるようにしました。",
    decisions: [
      ["認証機能", "ログイン・会員登録機能を開発"],
      ["照会機能", "ユーザーの最近の履歴照会機能を開発"],
      ["プロジェクト貢献", "React・Spring・Pythonの初期開発環境を構築"],
    ],
  },
  medicore: {
    statement: "疾患ごとに分かれていたAIを、一つの診断支援体験として統合しました。",
    description: "PLとして初期開発環境と分散システム構成を整備し、ログイン・会員登録、共通ダッシュボード、患者詳細画面を実装しました。皮膚疾患領域では診断サーバー、Grad-CAM、品質検査、RAG・LangGraphによる所見生成まで担当しました。",
    decisions: [
      ["PLとしての役割", "初期開発環境・分散システム構成を整備"],
      ["実装機能", "認証・共通ダッシュボード・患者詳細画面を開発"],
      ["AI実装", "皮膚疾患分類・Grad-CAM・品質検査・RAG所見生成"],
    ],
  },
  jnkc: {
    statement: "製造データを検索して回答し、結果を確認できるローカルAIを開発しました。",
    description: "ローカルLLMの比較から、ファインチューニング、RAG・Text-to-SQL、配備環境まで実装しました。実験の結果、学習だけでは、変化するDBの事実を、安定して記憶させることは困難でした。そこで、学習は表現に、検索は事実確認に使う構成へ転換しました。",
    decisions: [
      ["モデル比較", "GPT-OSS・Qwen・Llama・EXAONE・Gemma"],
      ["モデル調整", "SFT・CPT・LoRA実験・過学習の原因分析"],
      ["RAG・SQL", "LangGraph連携・検索分離・SQL実行前検証"],
      ["運用", "Docker自動配備・モデル状態の監視を実装"],
    ],
  },
  ai: {
    statement: "モデルの精度だけでなく、結果が実際に使われるところまで設計します。",
    description: "心疾患リスク予測とLNGタンク溶接欠陥分類に取り組みました。複数モデルを比較し、説明可能性を検討した上で、ユーザーが結果を確認できるインターフェースまで実装しました。",
    decisions: [
      ["MLプロジェクト", "心疾患リスク予測モデル・変数影響分析"],
      ["DLプロジェクト", "EfficientNetV2による溶接欠陥分類モデル"],
      ["実装範囲", "モデル比較・XAI検討・結果確認画面を開発"],
    ],
  },
};

const uiText = {
  ko: {
    languageLabel: "언어 선택",
    introTitle1: "AI를 서비스와 제조 현장에 연결하는 개발자,",
    introTitle2: "문제를 끝까지 구현하는 연구원 김민수입니다.",
    introDescription: <>서비스 개발부터 로컬 LLM·RAG 시스템까지,<br />필요한 기술을 연결해 실제로 작동하는 결과를 만듭니다.</>,
    viewWorks: "대표 작업 보기",
    repository: "저장소",
    viewMaterial: "자료 보기",
    downloadPptx: "PPTX 받기",
    mlMaterial: "ML 자료 보기",
    dlMaterial: "DL 자료 보기",
    mlTrack: "ML · 심장질환",
    dlTrack: "DL · 용접 결함",
    researchTitle: "직접 구현한 과정",
    researchSteps: [
      ["모델 비교", "후보 선정과 파이프라인 검증"],
      ["파인튜닝", "SFT · CPT · LoRA 실험"],
      ["원인 분석", "A/B 평가와 학습 로그 점검"],
      ["구조 전환", "RAG 검색과 SQL 검증"],
      ["배포 운영", "Docker 배포와 모니터링"],
    ],
    aboutHeading: <>문제를 구조화하고,<br /><em>작동하는 결과까지</em><br />만듭니다.</>,
    aboutLead: "프론트엔드·백엔드·AI를 따로 보지 않습니다. 문제에 필요한 기술을 선택하고, 사용자 흐름과 데이터, 모델을 연결해 실제로 사용할 수 있는 형태까지 구현합니다.",
    aboutCards: [
      ["CURRENT", <><strong>JNKC · 연구원</strong><br />2026.05.11 — 현재<br />제조 특화 로컬 AI 에이전트 개발</>],
      ["HOW I WORK", <>문제 정의 → 가설 → 실험 → 검증 → 개선.<br />실패 원인도 기록하고 다음 구조에 반영합니다.</>],
      ["ENGINEERING RANGE", <><strong>React · Spring · Python · C#</strong><br />사용자 화면부터 백엔드·AI 연동까지 연결합니다.</>],
      ["TEAM CONTRIBUTION", <>개발 환경을 정리하고 일정과 역할을 제안해, 팀이 구현에 집중할 수 있도록 돕습니다.</>],
    ],
    contact: "함께, 실제로 쓰이는 것을 만들고 싶습니다.",
    viewerLabel: "자료 뷰어",
    closeViewer: "자료 뷰어 닫기",
    archiveLabel: "프로젝트 자료 선택",
    previous: "이전 화면",
    next: "다음 화면",
  },
  ja: {
    languageLabel: "言語選択",
    introTitle1: "AIをサービスと製造現場につなぐ開発者、",
    introTitle2: "課題を最後まで形にする研究員、キム・ミンスです。",
    introDescription: <>サービス開発からローカルLLM・RAGシステムまで、<br />必要な技術をつなぎ、実際に動く成果をつくります。</>,
    viewWorks: "主なプロジェクトを見る",
    repository: "リポジトリ",
    viewMaterial: "資料を見る",
    downloadPptx: "PPTXをダウンロード",
    mlMaterial: "ML資料を見る",
    dlMaterial: "DL資料を見る",
    mlTrack: "ML · 心疾患",
    dlTrack: "DL · 溶接欠陥",
    researchTitle: "実装のプロセス",
    researchSteps: [
      ["モデル比較", "候補選定と基盤の検証"],
      ["モデル調整", "SFT・CPT・LoRA実験"],
      ["原因分析", "A/B評価と学習ログの確認"],
      ["構成転換", "RAG検索とSQL検証"],
      ["配備・運用", "Dockerと監視の実装"],
    ],
    aboutHeading: <>課題を整理し、<br /><em>動く仕組みまで</em><br />つくります。</>,
    aboutLead: "フロントエンド・バックエンド・AIを別々に考えません。課題に必要な技術を選び、ユーザー体験、データ、モデルをつないで、実際に使える形まで実装します。",
    aboutCards: [
      ["CURRENT", <><strong>JNKC · 研究員</strong><br />2026.05.11 — 現在<br />製造特化ローカルAIエージェントを開発</>],
      ["HOW I WORK", <>課題定義 → 仮説 → 実験 → 検証 → 改善。<br />失敗の原因も記録し、次の設計に反映します。</>],
      ["ENGINEERING RANGE", <><strong>React · Spring · Python · C#</strong><br />画面からバックエンド・AI連携までつなぎます。</>],
      ["TEAM CONTRIBUTION", <>開発環境を整え、日程と役割を提案し、チームが実装に集中できる状態をつくります。</>],
    ],
    contact: "一緒に、実際に使われるものをつくりたいです。",
    viewerLabel: "資料ビューア",
    closeViewer: "資料ビューアを閉じる",
    archiveLabel: "プロジェクト資料を選択",
    previous: "前の画面",
    next: "次の画面",
  },
} as const;

type MediaItem = {
  title: string;
  titleJa?: string;
  type: "youtube" | "video" | "pdf" | "image" | "page";
  src: string;
};

const projectMedia: Record<string, MediaItem[]> = {
  lawpartner: [
    { title: "시연 영상", titleJa: "デモ動画", type: "youtube", src: "https://www.youtube.com/embed/Gf6rH7uUiC8" },
    { title: "프로젝트 배경", titleJa: "プロジェクト背景", type: "image", src: "projects/lawpartner/background.png" },
    { title: "네트워크·시스템 구성", titleJa: "ネットワーク・システム構成", type: "image", src: "projects/lawpartner/architecture.png" },
    { title: "상세 ERD", titleJa: "詳細ERD", type: "page", src: "projects/lawpartner/lawpartner-erd.html" },
    { title: "프로젝트 일정", titleJa: "プロジェクト日程", type: "image", src: "projects/lawpartner/schedule-part1.png" },
  ],
  medneuro: [
    { title: "시연 영상", titleJa: "デモ動画", type: "video", src: "videos/medneduro-demo.mp4" },
    { title: "프로젝트 배경", titleJa: "プロジェクト背景", type: "image", src: "projects/medneduro/background.png" },
    { title: "핵심 기술", titleJa: "主要技術", type: "image", src: "projects/medneduro/overview-key-tech.png" },
    { title: "시스템 아키텍처", titleJa: "システムアーキテクチャ", type: "image", src: "projects/medneduro/architecture.png" },
    { title: "ERD", titleJa: "ERD", type: "image", src: "projects/medneduro/medneduro-erd.png" },
    { title: "프로젝트 일정", titleJa: "プロジェクト日程", type: "image", src: "projects/medneduro/project-schedule.png" },
  ],
  medicore: [
    { title: "MediCore 발표자료", titleJa: "MediCore 発表資料", type: "pdf", src: "projects/medicore/Medi_Core_v1.5.pdf" },
    { title: "발표자료 표지", titleJa: "発表資料の表紙", type: "image", src: "projects/medicore/presentation-cover.png" },
    { title: "환자 진단 이력", titleJa: "患者の診断履歴", type: "image", src: "projects/medicore/patient-detail.png" },
    { title: "환자 목록 대시보드", titleJa: "患者一覧ダッシュボード", type: "image", src: "projects/medicore/patient-list.png" },
  ],
  jnkc: [
    { title: "가상 데이터 시연 영상", titleJa: "仮想データのデモ動画", type: "video", src: "videos/manufacturing-ai-demo.mp4" },
    { title: "제조 AI 연구 기록", titleJa: "製造AI研究記録", type: "pdf", src: "projects/jnkc/Manufacturing_AI_Research_Record.pdf" },
  ],
  ai: [
    { title: "ML 분석 보고서", titleJa: "ML分析レポート", type: "pdf", src: "projects/ai-portfolio/ai-ml-report.pdf" },
    { title: "용접 결함 분류", titleJa: "溶接欠陥分類", type: "pdf", src: "projects/ai-portfolio/ai-welding-defect-classification.pdf" },
  ],
};

export default function App() {
  const [page, setPage] = useState(0);
  const [media, setMedia] = useState<MediaItem | null>(null);
  const [aiTrack, setAiTrack] = useState<"ml" | "dl">("ml");
  const [language, setLanguage] = useState<"ko" | "ja">("ko");
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
  const activeCopy: ProjectCopy | undefined = activeProject
    ? language === "ja" ? projectJapanese[activeProject.id] : activeProject
    : undefined;
  const copy = uiText[language];
  const mediaTitle = (item: MediaItem) => language === "ja" && item.titleJa ? item.titleJa : item.title;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

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
        <div className="header-actions">
          <div className="language-switch" aria-label={copy.languageLabel}>
            <button className={language === "ko" ? "active" : ""} onClick={() => setLanguage("ko")}>KR</button>
            <button className={language === "ja" ? "active" : ""} onClick={() => setLanguage("ja")}>JP</button>
          </div>
          <a className="header-link" href="https://github.com/MadSadly" target="_blank" rel="noreferrer">GitHub <ExternalLink size={13} /></a>
        </div>
      </header>

      <section className="stage" aria-live="polite">
        {page === 0 && (
          <article className="intro-page page-enter">
            <p className="eyebrow">SOFTWARE DEVELOPER · RESEARCHER</p>
            <h1><em>{copy.introTitle1}</em><br />{copy.introTitle2}</h1>
            <div className="intro-bottom">
              <p>{copy.introDescription}</p>
              <button className="text-link" onClick={() => move(1)}>{copy.viewWorks} <ArrowRight size={18} /></button>
            </div>
            <span className="hero-index">00</span>
          </article>
        )}

        {activeProject && activeCopy && (
          <article className="project-page page-enter">
            <div className="project-copy">
              <p className="eyebrow">{activeProject.number} / {activeProject.category}</p>
              <h2>{activeProject.title}</h2>
              <h3>{activeCopy.statement}</h3>
              <p className="project-description">{activeCopy.description}</p>
              <dl>
                {activeCopy.decisions.map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}
              </dl>
              <div className="tag-list">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="project-actions">
                {"github" in activeProject && (
                  <a className="text-link" href={activeProject.github} target="_blank" rel="noreferrer"><Github size={17} /> {copy.repository}</a>
                )}
                {activeProject.id !== "ai" && projectMedia[activeProject.id]?.length > 0 && (
                  <button className="text-link" onClick={() => setMedia(projectMedia[activeProject.id][0])}>
                    {projectMedia[activeProject.id][0].type === "pdf" ? <FileText size={17} /> : <Play size={17} />}
                    {copy.viewMaterial}
                  </button>
                )}
                {activeProject.id === "jnkc" && (
                  <a className="text-link" href="projects/jnkc/Manufacturing_AI_Research_Record.pptx" download>
                    <Presentation size={17} /> {copy.downloadPptx}
                  </a>
                )}
                {activeProject.id === "ai" && (
                  <>
                    <button className="text-link" onClick={() => {
                      setAiTrack("ml");
                      setMedia(projectMedia.ai[0]);
                    }}>
                      <FileText size={17} /> {copy.mlMaterial}
                    </button>
                    <button className="text-link" onClick={() => {
                      setAiTrack("dl");
                      setMedia(projectMedia.ai[1]);
                    }}>
                      <FileText size={17} /> {copy.dlMaterial}
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="project-visual">
              {activeProject.id === "ai" && (
                <div className="ai-track-switcher" aria-label="AI 프로젝트 선택">
                  <button className={aiTrack === "ml" ? "active" : ""} onClick={() => setAiTrack("ml")}>
                    {copy.mlTrack}
                  </button>
                  <button className={aiTrack === "dl" ? "active" : ""} onClick={() => setAiTrack("dl")}>
                    {copy.dlTrack}
                  </button>
                </div>
              )}
              <div className="image-frame">
                {activeProject.id === "lawpartner" ? (
                  <iframe
                    src="https://www.youtube.com/embed/Gf6rH7uUiC8?autoplay=1&mute=1&loop=1&playlist=Gf6rH7uUiC8&rel=0"
                    title="LawPartner 시연 영상"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : activeProject.id === "medneuro" ? (
                  <video src="videos/medneduro-demo.mp4" autoPlay muted loop playsInline controls />
                ) : activeProject.id === "jnkc" ? (
                  <div className="research-visual" aria-label={copy.researchTitle}>
                    <p>{copy.researchTitle}</p>
                    {copy.researchSteps.map(([title, detail], index) => (
                      <div key={title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><small>{detail}</small></div>
                    ))}
                  </div>
                ) : activeProject.id === "ai" ? (
                  <img
                    src={aiTrack === "ml" ? "projects/ai-portfolio/ai-ml-cover.png" : "projects/ai-portfolio/ai-welding-cover.png"}
                    alt={aiTrack === "ml" ? "ML 심장질환 분석 보고서 첫 화면" : "DL 용접 결함 분류 발표자료 첫 화면"}
                  />
                ) : (
                  <img src={activeProject.image} alt={`${activeProject.title} 대표 화면`} />
                )}
              </div>
              <span className="visual-caption">SELECTED WORK / 2026</span>
            </div>
          </article>
        )}

        {page === pages.length - 1 && (
          <article className="about-page page-enter">
            <div>
              <p className="eyebrow">ABOUT · KIM MIN SU</p>
              <h2>{copy.aboutHeading}</h2>
              <p className="about-lead">{copy.aboutLead}</p>
            </div>
            <div className="about-grid">
              {copy.aboutCards.map(([label, description]) => (
                <div key={label}><span>{label}</span><p>{description}</p></div>
              ))}
            </div>
            <a className="contact-line" href="https://github.com/MadSadly" target="_blank" rel="noreferrer">{copy.contact} <ArrowRight size={24} /></a>
          </article>
        )}
      </section>

      <footer className="controls">
        <span>{String(page + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}</span>
        <div>
          <button onClick={() => move(-1)} disabled={page === 0} aria-label={copy.previous}><ArrowLeft /></button>
          <button onClick={() => move(1)} disabled={page === pages.length - 1} aria-label={copy.next}><ArrowRight /></button>
        </div>
        <span className="hint">ARROW KEYS / SWIPE</span>
      </footer>

      {media && (
        <div className="viewer-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setMedia(null);
        }}>
          <section className="media-viewer" role="dialog" aria-modal="true" aria-label={`${mediaTitle(media)} ${copy.viewerLabel}`}>
            <header>
              <div>
                <span>PROJECT ARCHIVE</span>
                <h2>{mediaTitle(media)}</h2>
              </div>
              <button onClick={() => setMedia(null)} aria-label={copy.closeViewer}><X /></button>
            </header>
            <div className="viewer-body">
              {media.type === "youtube" && <iframe src={media.src} title={mediaTitle(media)} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />}
              {media.type === "video" && <video src={media.src} controls playsInline />}
              {media.type === "pdf" && <iframe src={`${media.src}#view=FitH`} title={mediaTitle(media)} />}
              {media.type === "image" && <img src={media.src} alt={mediaTitle(media)} />}
              {media.type === "page" && <iframe src={media.src} title={mediaTitle(media)} />}
            </div>
            <nav className="archive-list" aria-label={copy.archiveLabel}>
              {projectMedia[activeProject?.id ?? "ai"].map((item) => (
                <button key={item.title} className={item.src === media.src ? "active" : ""} onClick={() => setMedia(item)}>
                  {item.type === "video" || item.type === "youtube" ? <Play size={13} /> : item.type === "pdf" ? <FileText size={13} /> : <Presentation size={13} />}
                  {mediaTitle(item)}
                </button>
              ))}
            </nav>
          </section>
        </div>
      )}
    </main>
  );
}
