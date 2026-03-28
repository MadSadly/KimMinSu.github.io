/** 상세 탭 한 칸 (시연 영상 + 문서형 탭용) */
export interface ProjectDetailTab {
  id: string;
  label: string;
  /** 줄바꿈은 \n 으로 구분해 JSON에 작성 */
  content: string;
  /** public 기준 경로 (예: projects/lawpartner/network.png), 탭 상단에 순서대로 표시 */
  images?: string[];
  /**
   * public 기준 HTML 페이지 (예: projects/lawpartner/erd.html).
   * 있으면 탭에 iframe 미리보기 + 전체보기(새 탭)를 쓰고, 보통 images는 비웁니다.
   */
  embedPage?: string;
}

/** JSON 설정으로 불러오는 프로젝트 항목 타입 */
export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  tags: string[];
  /** true면 상단에 시연 영상(플레이스홀더) 영역 표시 */
  showDemoPlaceholder?: boolean;
  /**
   * 시연 영상
   * - 상대 경로: public 기준 (예: "videos/foo.mp4") → BASE_URL 붙여 <video>
   * - http(s)://… 직접 mp4 → 그 URL로 <video> (CDN·외부 호스팅, GitHub 용량 제한 회피)
   * - YouTube watch/shorts/youtu.be 링크 → iframe 임베드
   */
  demoVideoSrc?: string;
  /** 있으면 탭 UI로 상세 표시; 없으면 기본 ProjectCard */
  detailTabs?: ProjectDetailTab[];
}
