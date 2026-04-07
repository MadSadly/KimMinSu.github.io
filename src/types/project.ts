/** 통합 테스트·문서 등 — 한 탭 안에서 섹션별로 이미지를 나눌 때 사용 */
export interface ProjectDetailImageSection {
  id: string;
  label: string;
  /** public 기준 경로, 해당 섹션에서 순서대로 표시 */
  images: string[];
}

/** 상세 탭 한 칸 (시연 영상 + 문서형 탭용) */
export interface ProjectDetailTab {
  id: string;
  label: string;
  /** 줄바꿈은 \n 으로 구분해 JSON에 작성 */
  content: string;
  /** public 기준 경로 (예: projects/lawpartner/network.png), 탭 상단에 순서대로 표시 */
  images?: string[];
  /**
   * 섹션 갤러리: 있으면 검색·칩으로 구간을 고른 뒤 해당 이미지만 표시 (images·embedPage와 동시 사용하지 않음)
   */
  imageSections?: ProjectDetailImageSection[];
  /**
   * public 기준 HTML 페이지 (예: projects/lawpartner/erd.html).
   * 있으면 탭에 iframe 미리보기 + 전체보기(새 탭)를 쓰고, 보통 images는 비웁니다.
   */
  embedPage?: string;
  /**
   * public 기준 PDF (예: projects/ai-portfolio/report.pdf).
   * 페이지에 임베드하고 전체 화면·새 탭 열기를 제공합니다. embedPage·imageSections와 동시 사용하지 않습니다.
   */
  embedPdf?: string;
}

/** JSON 설정으로 불러오는 프로젝트 항목 타입 */
export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  /** 없으면 카드·상세에서 GitHub 버튼을 숨깁니다 */
  githubUrl?: string;
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
