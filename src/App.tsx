import projectsData from "./data/projects.json";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Competencies } from "./components/Competencies";
import { EducationSection } from "./components/EducationSection";
import { TechStack } from "./components/TechStack";
import { ProjectsSection } from "./components/ProjectsSection";
import type { ProjectItem } from "./types/project";

/** JSON을 프로젝트 타입으로 단언 (빌드 시 타입 검사) */
const projects = projectsData as ProjectItem[];

function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 text-center text-sm text-zinc-500 sm:px-6">
      <p>© {new Date().getFullYear()} 김민수. GitHub Pages 정적 호스팅.</p>
    </footer>
  );
}

/** 앱 루트 레이아웃 — 소개 → 역량 → 교육 → 스택 → 프로젝트 */
export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Competencies />
        <EducationSection />
        <TechStack />
        <ProjectsSection projects={projects} />
      </main>
      <Footer />
    </div>
  );
}
