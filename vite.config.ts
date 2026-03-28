import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * GitHub Pages 프로젝트 사이트 배포 시 base 경로를 저장소 이름과 동일하게 맞춥니다.
 * 예: https://MadSadly.github.io/KimMinSu.github.io/ → base: '/KimMinSu.github.io/'
 * 사용자 페이지(username.github.io) 루트면 base: '/' 로 두세요.
 */
export default defineConfig({
  plugins: [react()],
  base: "/KimMinSu.github.io/",
});
