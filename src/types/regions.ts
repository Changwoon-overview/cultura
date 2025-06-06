/**
 * 한국 지역 정보 타입 정의 및 상수 데이터
 * 문화행사 캘린더에서 사용할 지역 필터링을 위한 타입과 데이터
 */

// 지역 정보를 나타내는 기본 인터페이스
export interface Region {
  /** 지역 코드 (문화체육관광부 API 표준) */
  code: string;
  /** 지역 이름 (한국어) */
  name: string;
  /** 영문 지역 이름 */
  nameEn?: string;
  /** 상위 지역 코드 (시/군/구의 경우 시/도 코드) */
  parentCode?: string;
  /** 지역 타입 구분 */
  type: 'province' | 'city' | 'district';
}

// 지역 선택 옵션을 위한 인터페이스
export interface RegionOption {
  /** 선택 옵션의 고유 값 */
  value: string;
  /** 사용자에게 표시될 텍스트 */
  label: string;
  /** 옵션 그룹 (시/도별 그룹화용) */
  group?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
}

// 지역 필터 상태를 관리하기 위한 인터페이스
export interface RegionFilter {
  /** 선택된 시/도 코드 */
  province?: string;
  /** 선택된 시/군/구 코드 */
  city?: string;
  /** 전체 지역 선택 여부 */
  isAllRegions: boolean;
}

/**
 * 한국의 17개 시/도 데이터
 * 문화체육관광부 API 지역 코드 기준
 */
export const PROVINCES: Region[] = [
  { code: '11', name: '서울특별시', nameEn: 'Seoul', type: 'province' },
  { code: '26', name: '부산광역시', nameEn: 'Busan', type: 'province' },
  { code: '27', name: '대구광역시', nameEn: 'Daegu', type: 'province' },
  { code: '28', name: '인천광역시', nameEn: 'Incheon', type: 'province' },
  { code: '29', name: '광주광역시', nameEn: 'Gwangju', type: 'province' },
  { code: '30', name: '대전광역시', nameEn: 'Daejeon', type: 'province' },
  { code: '31', name: '울산광역시', nameEn: 'Ulsan', type: 'province' },
  { code: '36', name: '세종특별자치시', nameEn: 'Sejong', type: 'province' },
  { code: '41', name: '경기도', nameEn: 'Gyeonggi', type: 'province' },
  { code: '43', name: '충청북도', nameEn: 'Chungbuk', type: 'province' },
  { code: '44', name: '충청남도', nameEn: 'Chungnam', type: 'province' },
  { code: '45', name: '전라북도', nameEn: 'Jeonbuk', type: 'province' },
  { code: '46', name: '전라남도', nameEn: 'Jeonnam', type: 'province' },
  { code: '47', name: '경상북도', nameEn: 'Gyeongbuk', type: 'province' },
  { code: '48', name: '경상남도', nameEn: 'Gyeongnam', type: 'province' },
  { code: '50', name: '제주특별자치도', nameEn: 'Jeju', type: 'province' },
  { code: '51', name: '강원특별자치도', nameEn: 'Gangwon', type: 'province' },
];

/**
 * 주요 시/군/구 데이터 (MVP에서 많이 사용될 것으로 예상되는 지역)
 */
export const MAJOR_CITIES: Region[] = [
  // 서울특별시 주요 구
  { code: '1111', name: '종로구', parentCode: '11', type: 'district' },
  { code: '1114', name: '중구', parentCode: '11', type: 'district' },
  { code: '1117', name: '용산구', parentCode: '11', type: 'district' },
  { code: '1120', name: '성동구', parentCode: '11', type: 'district' },
  { code: '1121', name: '광진구', parentCode: '11', type: 'district' },
  { code: '1123', name: '동대문구', parentCode: '11', type: 'district' },
  { code: '1124', name: '중랑구', parentCode: '11', type: 'district' },
  { code: '1125', name: '성북구', parentCode: '11', type: 'district' },
  { code: '1126', name: '강북구', parentCode: '11', type: 'district' },
  { code: '1127', name: '도봉구', parentCode: '11', type: 'district' },
  { code: '1128', name: '노원구', parentCode: '11', type: 'district' },
  { code: '1129', name: '은평구', parentCode: '11', type: 'district' },
  { code: '1130', name: '서대문구', parentCode: '11', type: 'district' },
  { code: '1131', name: '마포구', parentCode: '11', type: 'district' },
  { code: '1132', name: '양천구', parentCode: '11', type: 'district' },
  { code: '1133', name: '강서구', parentCode: '11', type: 'district' },
  { code: '1134', name: '구로구', parentCode: '11', type: 'district' },
  { code: '1135', name: '금천구', parentCode: '11', type: 'district' },
  { code: '1136', name: '영등포구', parentCode: '11', type: 'district' },
  { code: '1137', name: '동작구', parentCode: '11', type: 'district' },
  { code: '1138', name: '관악구', parentCode: '11', type: 'district' },
  { code: '1139', name: '서초구', parentCode: '11', type: 'district' },
  { code: '1140', name: '강남구', parentCode: '11', type: 'district' },
  { code: '1141', name: '송파구', parentCode: '11', type: 'district' },
  { code: '1142', name: '강동구', parentCode: '11', type: 'district' },

  // 부산광역시 주요 구/군
  { code: '2611', name: '중구', parentCode: '26', type: 'district' },
  { code: '2614', name: '서구', parentCode: '26', type: 'district' },
  { code: '2615', name: '동구', parentCode: '26', type: 'district' },
  { code: '2616', name: '영도구', parentCode: '26', type: 'district' },
  { code: '2617', name: '부산진구', parentCode: '26', type: 'district' },
  { code: '2618', name: '동래구', parentCode: '26', type: 'district' },
  { code: '2619', name: '남구', parentCode: '26', type: 'district' },
  { code: '2620', name: '북구', parentCode: '26', type: 'district' },
  { code: '2621', name: '해운대구', parentCode: '26', type: 'district' },
  { code: '2622', name: '사하구', parentCode: '26', type: 'district' },

  // 경기도 주요 시
  { code: '4111', name: '수원시', parentCode: '41', type: 'city' },
  { code: '4113', name: '성남시', parentCode: '41', type: 'city' },
  { code: '4115', name: '의정부시', parentCode: '41', type: 'city' },
  { code: '4117', name: '안양시', parentCode: '41', type: 'city' },
  { code: '4119', name: '부천시', parentCode: '41', type: 'city' },
  { code: '4121', name: '광명시', parentCode: '41', type: 'city' },
  { code: '4122', name: '평택시', parentCode: '41', type: 'city' },
  { code: '4125', name: '안산시', parentCode: '41', type: 'city' },
  { code: '4127', name: '고양시', parentCode: '41', type: 'city' },
  { code: '4128', name: '과천시', parentCode: '41', type: 'city' },
  { code: '4129', name: '구리시', parentCode: '41', type: 'city' },
  { code: '4131', name: '남양주시', parentCode: '41', type: 'city' },
  { code: '4136', name: '화성시', parentCode: '41', type: 'city' },
];

/**
 * 지역 필터링을 위한 유틸리티 함수들
 */

// 특정 시/도에 속한 시/군/구 목록을 반환하는 함수
export const getCitiesByProvince = (provinceCode: string): Region[] => {
  return MAJOR_CITIES.filter((city) => city.parentCode === provinceCode);
};

// 지역 코드로 지역 정보를 찾는 함수
export const getRegionByCode = (code: string): Region | undefined => {
  const province = PROVINCES.find((p) => p.code === code);
  if (province) return province;

  return MAJOR_CITIES.find((city) => city.code === code);
};

// 지역 이름으로 지역 정보를 찾는 함수 (검색 기능용)
export const getRegionByName = (name: string): Region | undefined => {
  const province = PROVINCES.find((p) => p.name.includes(name));
  if (province) return province;

  return MAJOR_CITIES.find((city) => city.name.includes(name));
};

// 드롭다운 선택 옵션으로 변환하는 함수
export const createRegionOptions = (
  includeAll: boolean = true
): RegionOption[] => {
  const options: RegionOption[] = [];

  // 전체 선택 옵션 추가
  if (includeAll) {
    options.push({
      value: 'all',
      label: '전국',
      group: 'special',
    });
  }

  // 시/도 옵션 추가
  PROVINCES.forEach((province) => {
    options.push({
      value: province.code,
      label: province.name,
      group: 'province',
    });
  });

  return options;
};

// 기본 지역 필터 상태
export const DEFAULT_REGION_FILTER: RegionFilter = {
  isAllRegions: true,
  province: undefined,
  city: undefined,
};

/**
 * 지역 코드 검증 함수
 */
export const isValidRegionCode = (code: string): boolean => {
  return getRegionByCode(code) !== undefined;
};

/**
 * 지역 타입별 총 개수 상수
 */
export const REGION_COUNTS = {
  PROVINCES: PROVINCES.length,
  MAJOR_CITIES: MAJOR_CITIES.length,
  TOTAL_REGIONS: PROVINCES.length + MAJOR_CITIES.length,
} as const;
