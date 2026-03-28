import { Sparkles } from "lucide-react";

/** 히어로: 지정 문구 그대로 표시 (메인 인트로) */
export function Hero() {
  return (
    <section
      id="intro"
      className="relative overflow-hidden px-4 pb-20 pt-12 sm:px-6 sm:pt-16"
    >
      {/* 배경 글로우 장식 (성능: CSS만 사용) */}
      <div
        className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-accent/15 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-[90px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl">
        {/* 소개 타이포는 폭을 좁혀 한 줄 길이(약 45~65자)를 맞춰 가독성 확보 */}
        <div className="max-w-[40rem]">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[13px] text-accent backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
            Full-stack Developer
          </p>

          <h1 className="mb-10 text-balance break-keep text-[1.375rem] font-bold leading-[1.65] tracking-normal text-zinc-100 sm:text-2xl sm:leading-[1.62] lg:text-[1.65rem] lg:leading-[1.68]">
            WebSocket 기반 실시간 채팅과 Java·Python 멀티 서버 아키텍처를 설계하고
            트랜잭션·이벤트 처리 구조를 개선해 응답 안정성과 데이터 일관성을 높인
            풀스택 개발자{" "}
            <span className="font-extrabold text-accent drop-shadow-[0_0_20px_rgba(34,211,238,0.28)]">
              김민수
            </span>
            입니다.
          </h1>
        </div>

        <div className="max-w-[40rem] rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-glass backdrop-blur-md sm:p-8">
          {/* 본문은 문장 단위로 나눠 시선이 머물기 쉽게, 대비는 zinc-300으로 상향 */}
          <div className="space-y-5 text-[1.0625rem] leading-[1.85] text-zinc-300 sm:text-lg sm:leading-[1.82]">
            <p className="break-keep text-pretty">
              기술적 구현을 넘어 비즈니스 모델의 실현 가능성과 수익성을 최우선으로
              고려하는 시스템 설계를 지향합니다.
            </p>
            <p className="break-keep text-pretty">
              개발 리소스와 사업적 가치를 객관적으로 분석하여 최적의 아키텍처를
              결정하며, 무분별한 기능 확장보다 서비스의 지속 가능성에 집중합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
