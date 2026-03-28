/** 상세 탭 한 칸 (시연 영상 + 문서형 탭용) */
export interface ProjectDetailTab {
  id: string;
  label: string;
  /** 줄바꿈은 \n 으로 구분해 JSON에 작성 */
  content: string;
  /** public 기준 경로 (예: projects/lawpartner/network.png), 탭 상단에 순서대로 표시 */
  images?: string[];
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
   * public 기준 경로 (앞의 / 없이). 예: "videos/medneduro-demo.mp4"
   * 설정 시 <video>로 재생, GitHub Pages 는 import.meta.env.BASE_URL 이 붙습니다.
   */
  demoVideoSrc?: string;
  /** 있으면 탭 UI로 상세 표시; 없으면 기본 ProjectCard */
  detailTabs?: ProjectDetailTab[];
}
