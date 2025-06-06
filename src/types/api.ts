// 문화체육관광부 문화정보서비스 API 타입 정의

export interface CulturalEvent {
  seq: string; // 일련번호
  title: string; // 공연/전시명
  startDate: string; // 시작일자 (YYYY-MM-DD)
  endDate: string; // 종료일자 (YYYY-MM-DD)
  place: string; // 장소명
  realmName: string; // 분야명 (연극, 뮤지컬, 콘서트 등)
  area: string; // 지역명 (시도)
  subArea?: string; // 세부지역명 (시군구)
  thumbnail?: string; // 썸네일 이미지 URL
  gpsX?: string; // GPS X좌표 (경도)
  gpsY?: string; // GPS Y좌표 (위도)
  placeUrl?: string; // 장소 URL
  phone?: string; // 문의전화
  placeAddr?: string; // 장소주소
  placeAddrOld?: string; // 장소주소(구주소)
  homepage?: string; // 홈페이지
  ticket?: string; // 관람료
  performer?: string; // 출연진/제작진
  program?: string; // 프로그램소개
  dtlContents?: string; // 상세내용
  imageObject?: string; // 포스터이미지정보
}

// API 응답 구조
export interface ApiResponse<T> {
  response: {
    header: {
      resultCode: string; // "00" = 정상
      resultMsg: string; // 결과 메시지
    };
    body: {
      items?: {
        item: T[];
      };
      numOfRows: number; // 한 페이지 결과 수
      pageNo: number; // 페이지 번호
      totalCount: number; // 전체 결과 수
    };
  };
}

// API 요청 파라미터
export interface ApiRequestParams {
  serviceKey: string; // 인증키
  numOfRows?: number; // 한 페이지 결과 수 (기본값: 10, 최대: 100)
  pageNo?: number; // 페이지 번호 (기본값: 1)
  from?: string; // 검색 시작일 (YYYYMMDD)
  to?: string; // 검색 종료일 (YYYYMMDD)
  sido?: string; // 시도명
  gugun?: string; // 구군명
  classify?: string; // 분류 (A000: 연극, B000: 음악, C000: 무용, D000: 미술, E000: 건축, F000: 영상, G000: 문학, H000: 문화일반)
  sortStdr?: '1' | '2' | '3' | '4'; // 정렬기준 (1: 등록일, 2: 공연명, 3: 지역명, 4: 공연시작일)
}

// 필터링을 위한 지역 정보
export interface Region {
  sido: string; // 시도명
  gugun?: string[]; // 구군명 배열
}

// 캘린더 이벤트 타입 (FullCalendar용)
export interface CalendarEvent {
  id: string;
  title: string;
  start: string; // ISO 8601 형식
  end: string; // ISO 8601 형식
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  extendedProps: {
    place: string;
    area: string;
    realmName: string;
    thumbnail?: string;
    originalData: CulturalEvent;
  };
}

// 에러 응답 타입
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}
