import { useState } from "react";
import { Award, Brain, ChevronDown, GraduationCap } from "lucide-react";

/**
 * 교육·활동 커리큘럼 카드 — 기초 과정 + 심화(AI·ML) 주제를 한 그리드에 통합
 */
const educationCurriculumTracks: { title: string; topics: string[] }[] = [
  {
    title: "웹 애플리케이션 개발",
    topics: [
      "JAVA 개발환경 구축",
      "Java 기본 문법",
      "객체지향 프로그래밍",
      "예외처리",
      "Java 주요 Class",
      "쓰레드",
      "입출력",
      "네트워킹",
      "서버 프로그래밍 구현",
      "프레임워크(Spring) 활용",
    ],
  },
  {
    title: "웹 & 콘텐츠 서비스 개발",
    topics: [
      "SQL 문장과 함수",
      "Join과 SubQuery",
      "엔티티 및 속성",
      "정규화 · 반정규화",
      "통합 · 관계",
      "개념 · 논리 · 물리 모델링",
    ],
  },
  {
    title: "AI 개발 기초",
    topics: [
      "파이썬 개발 환경 구축",
      "파이썬 기본 문법",
      "객체지향 프로그래밍",
      "모듈",
      "예외처리",
    ],
  },
  {
    title: "인공지능 프로그래밍",
    topics: [
      "머신러닝의 개요 및 분류",
      "SVM(서포트 벡터 머신)",
      "결정트리",
      "심층 신경망 구축",
    ],
  },
  {
    title: "빅데이터 분석 및 시각화",
    topics: ["통계 기초", "데이터 시각화"],
  },
  {
    title: "AI 모델 만들기",
    topics: [
      "지도학습 모델 만들기, 지도학습 품질 관리",
      "비지도학습 모델 만들기, 비지도학습 품질 관리",
    ],
  },
  {
    title: "인공지능 모델 개발",
    topics: [
      "고객 등급 분류",
      "알고리즘 선정",
      "품질 관리",
      "Python · Django API 서비스 등록",
    ],
  },
  {
    title: "인공지능을 활용한 고객별 등급 판별 솔루션 개발",
    topics: [
      "솔루션 모델 개발 및 빅데이터 분석 환경을 지원할 수 있는 개발 환경 구축",
      "인공지능 모델 개발 프로젝트에서 개발한 모델 연동",
      "고객별 등급 판별 결과 저장",
    ],
  },
];

/** 과정 요약 — 백엔드 / 생애주기 / 프론트 구조 */
const saraminCourse = {
  title:
    "인공지능(AI), 빅데이터 활용 웹솔루션 개발자 양성 (Python, Java)",
  pillars: [
    {
      title: "백엔드 및 서버 엔지니어링",
      items: [
        "Java & Spring Framework : Java 17 기반의 Spring MVC 및 Spring Boot를 활용하여 안정적인 서버 로직 구축",
        "데이터 관리 : MyBatis 및 JPA를 활용하여 Oracle DB와 연동, 복잡한 비즈니스 로직에 최적화된 CRUD 시스템 구현",
        "실시간 통신 : WebSocket 기술을 활용하여 Law Partner 프로젝트의 실시간 1:1 채팅 시스템 서버 환경 구축",
        "다중 서버 환경 : Python(가상환경 세팅 포함) 및 Node.js를 활용한 다중 서버 환경 구축 및 API 연동 실습",
      ],
    },
    {
      title: "프로젝트 생애주기 관리",
      items: [
        "요구사항 및 설계 : 요구사항정의서, 유즈케이스 다이어그램, 메뉴구조도, 화면 플로우 차트 작성을 통해 프로젝트의 목표와 구조를 설계하는 설계 역량 확보",
        "개발 환경 구축 : IntelliJ를 기반으로 Maven 빌드 도구 관리, Node.js 환경 및 Python 가상환경을 직접 세팅하며 로컬/서버 개발 환경 최적화 수행",
        "협업 및 형상 관리 : Git 저장소 생성, 코드 통합 프로세스를 주도하며 협업 역량 증명",
      ],
    },
    {
      title: "프론트엔드 UI/UX 설계",
      items: [
        "모던 라이브러리/프레임워크 : React 및 Vue.js를 활용한 컴포넌트 기반 UI 개발",
        "상태 관리 및 비동기 통신 : Axios와 Ajax를 활용하여 백엔드 API와의 효율적인 데이터 통신 및 실시간 화면 렌더링 구현",
        "디자인 시스템 : Tailwind CSS, Bootstrap 4, CSS3, HTML5를 활용하여 반응형 웹 디자인 및 사용자 중심 UI 구축",
      ],
    },
  ],
  award:
    "성적 우수상 (수석 팀 / 우수 수료) — 인공지능·빅데이터 활용 웹솔루션 개발자 양성과정",
};

/** 휴먼AI교육센터 심화 과정 (기간 · 역량 정리) */
const humanAiAdvancedCourse = {
  org: "휴먼AI교육센터",
  period: "2026.03 ~ 2026.05",
  pillars: [
    {
      title: "풀스택 파이프라인 구축 역량",
      items: [
        "서버 사이드 안정화: Java 17 및 Spring Boot를 기반으로 RESTful API 서버를 구축하고, MyBatis와 MDB를 연동하여 비즈니스 로직의 데이터 영속화를 구현함.",
        "사용자 최적화 UI 구현: React와 Axios를 활용해 백엔드 API와 실시간으로 연동되는 사용자 중심 컴포넌트를 설계하고, 비동기 통신을 통한 끊김 없는 사용자 경험을 구축함.",
      ],
    },
    {
      title: "AI 모델링 및 서비스 통합 역량",
      items: [
        "데이터 분석 및 분류 모델 개발: Python(Pandas, Scikit-learn)을 활용하여 실제 고객 데이터를 전처리하고, 지도학습 기반의 고객 등급 분류 알고리즘을 선정 및 학습시킴.",
        "다중 서버 아키텍처 설계: AI 모델 추론을 위한 Python 서버를 별도 분리하여 시스템 모듈화를 실현하고, Java 메인 서버와의 REST API 통신을 통해 실시간 지능형 기능을 안정적으로 통합함.",
      ],
    },
    {
      title: "실무 중심의 설계 및 협업 역량",
      items: [
        "설계 산출물 작성을 포함하여 프로젝트의 기획, 개발, 배포에 이르는 소프트웨어 생애주기 전 단계를 경험하며 시스템 전반의 이해도 확보.",
        "전략적 비즈니스 모델 분석: 기술적 구현 가능성을 사업적 관점에서 검토하여, 제한된 리소스 내에서 최대의 가치를 낼 수 있는 기능 범위를 설정하고 조율함.",
      ],
    },
  ],
};

export function EducationSection() {
  const [open, setOpen] = useState(false);

  return (
    <section id="education" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
          Education
        </h2>

        {/* 교육/활동: 클릭 시 펼침 · 접기 */}
        <button
          type="button"
          id="education-trigger"
          aria-expanded={open}
          aria-controls="education-panel"
          onClick={() => setOpen((v) => !v)}
          className="mb-6 flex w-full items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left shadow-glass backdrop-blur-md transition hover:border-accent/30 hover:bg-white/[0.06] sm:px-5 sm:py-4"
        >
          <span className="text-xl font-semibold text-zinc-100 sm:text-2xl">
            교육 / 활동
          </span>
          <ChevronDown
            className={`h-6 w-6 shrink-0 text-accent transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden
          />
        </button>

        <div
          id="education-panel"
          role="region"
          aria-labelledby="education-trigger"
          hidden={!open}
          className={open ? "space-y-14" : undefined}
        >
          {open && (
            <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {educationCurriculumTracks.map(({ title, topics }) => (
                  <article
                    key={title}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-glass backdrop-blur-md"
                  >
                    <h4 className="mb-3 text-sm font-semibold leading-snug text-accent">
                      {title}
                    </h4>
                    <ul className="space-y-2 text-xs leading-relaxed text-zinc-400 sm:text-[13px]">
                      {topics.map((t) => (
                        <li key={t} className="flex gap-2 break-keep">
                          <span
                            className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-600"
                            aria-hidden
                          />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-6 shadow-glass backdrop-blur-md sm:p-8">
                <div className="mb-8 flex flex-wrap items-start gap-3">
                  <GraduationCap
                    className="h-7 w-7 shrink-0 text-accent"
                    aria-hidden
                  />
                  <h3 className="text-lg font-semibold leading-snug text-zinc-100 sm:text-xl">
                    {saraminCourse.title}
                  </h3>
                </div>

                <ol className="space-y-10">
                  {saraminCourse.pillars.map((pillar, idx) => (
                    <li key={pillar.title}>
                      <h4 className="mb-4 flex flex-wrap items-baseline gap-2 text-base font-semibold text-zinc-200">
                        <span className="text-accent">{idx + 1}.</span>
                        {pillar.title}
                      </h4>
                      <ul className="space-y-3 border-l border-white/10 pl-4 sm:pl-5">
                        {pillar.items.map((line) => (
                          <li
                            key={line}
                            className="break-keep text-sm leading-[1.75] text-zinc-400"
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>

                <div className="mt-10 flex gap-3 rounded-xl border border-accent/25 bg-accent/[0.08] p-4 sm:p-5">
                  <Award
                    className="h-6 w-6 shrink-0 text-accent"
                    aria-hidden
                  />
                  <p className="text-sm font-medium leading-relaxed text-zinc-200">
                    {saraminCourse.award}
                  </p>
                </div>
              </div>

              {/* 심화 과정 — 휴먼AI교육센터 */}
              <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/[0.06] to-transparent p-6 shadow-glass backdrop-blur-md sm:p-8">
                <div className="mb-8 flex flex-wrap items-start gap-3">
                  <Brain
                    className="h-7 w-7 shrink-0 text-accent"
                    aria-hidden
                  />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-accent">
                      심화 과정
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-zinc-100 sm:text-xl">
                      {humanAiAdvancedCourse.org}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">
                      {humanAiAdvancedCourse.period}
                    </p>
                  </div>
                </div>

                <p className="mb-6 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  역량 · 수행 정리
                </p>

                <ol className="space-y-10">
                  {humanAiAdvancedCourse.pillars.map((pillar, idx) => (
                    <li key={pillar.title}>
                      <h4 className="mb-4 flex flex-wrap items-baseline gap-2 text-base font-semibold text-zinc-200">
                        <span className="text-accent">{idx + 1}.</span>
                        {pillar.title}
                      </h4>
                      <ul className="space-y-3 border-l border-white/10 pl-4 sm:pl-5">
                        {pillar.items.map((line) => (
                          <li
                            key={line}
                            className="break-keep text-sm leading-[1.75] text-zinc-400"
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
