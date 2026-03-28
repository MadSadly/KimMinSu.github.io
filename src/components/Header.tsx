import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "#intro", label: "소개" },
  { href: "#skills", label: "역량" },
  { href: "#education", label: "교육·활동" },
  { href: "#stack", label: "기술 스택" },
  { href: "#projects", label: "프로젝트" },
] as const;

/**
 * 상단 고정 헤더 — 글래스모피즘 + 모바일 햄버거 메뉴
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background,box-shadow] duration-300 ${
        scrolled
          ? "border-white/10 bg-surface/80 shadow-glass backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a
          href="#intro"
          className="text-sm font-medium tracking-wide text-zinc-400 transition hover:text-accent"
        >
          Portfolio
        </a>

        {/* 데스크톱 내비게이션 */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="주요 섹션">
          {navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-zinc-400 transition hover:text-accent"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* 모바일 메뉴 토글 */}
        <button
          type="button"
          className="rounded-lg border border-white/10 bg-white/5 p-2 text-zinc-200 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* 모바일 드롭다운 패널 */}
      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-white/10 bg-surface/95 px-4 py-4 backdrop-blur-xl md:hidden"
          aria-label="모바일 메뉴"
        >
          <ul className="flex flex-col gap-3">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block rounded-lg px-3 py-2 text-zinc-300 hover:bg-white/5 hover:text-accent"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
