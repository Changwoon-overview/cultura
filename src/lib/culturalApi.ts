import { ApiRequestParams, CalendarEvent, CulturalEvent } from '@/types/api';
import axios from 'axios';
import { parseString } from 'xml2js';

export class CulturalApiService {
  private axiosInstance: ReturnType<typeof axios.create>;
  private serviceKey: string;
  private baseUrl =
    'https://apis.data.go.kr/B553457/nopenapi/rest/publicperformancedisplays';

  constructor(serviceKey: string) {
    this.serviceKey = serviceKey;
    this.axiosInstance = axios.create({
      timeout: 10000, // 10초 타임아웃
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * 문화행사 정보를 조회합니다.
   * @param params API 요청 파라미터
   * @returns 문화행사 데이터 배열
   */
  async getCulturalEvents(
    params: Partial<ApiRequestParams> = {}
  ): Promise<CulturalEvent[]> {
    try {
      const requestParams: ApiRequestParams = {
        serviceKey: this.serviceKey,
        numOfRows: 50, // 기본값: 50개
        pageNo: 1,
        sortStdr: '4', // 공연시작일 순
        ...params,
      };

      console.log('API 요청 파라미터:', requestParams);

      // XML 응답을 받기 위해 responseType을 text로 설정
      const response = await this.axiosInstance.get(this.baseUrl, {
        params: requestParams,
        responseType: 'text',
      });

      // XML을 JSON으로 파싱
      const parsedData = await new Promise<any>((resolve, reject) => {
        parseString(response.data, { explicitArray: false }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });

      console.log('파싱된 응답 데이터:', JSON.stringify(parsedData, null, 2));

      // 다양한 XML 응답 구조 처리
      let responseData = parsedData;

      // SOAP Fault 오류 체크
      if (parsedData['soapenv:Envelope']?.['soapenv:Body']?.['soapenv:Fault']) {
        const fault =
          parsedData['soapenv:Envelope']['soapenv:Body']['soapenv:Fault'];
        throw new ApiError({
          code: 'SOAP_FAULT',
          message: fault.faultstring || 'SOAP 오류가 발생했습니다',
          details: fault,
        });
      }

      // 일반적인 응답 구조에서 response 찾기
      if (parsedData.response) {
        responseData = parsedData.response;
      } else if (parsedData.Response) {
        responseData = parsedData.Response;
      }

      // API 응답 상태 확인
      const header = responseData.header || responseData.Header;
      if (header && header.resultCode !== '00') {
        throw new ApiError({
          code: header.resultCode || 'UNKNOWN_ERROR',
          message: header.resultMsg || '알 수 없는 오류',
        });
      }

      // 데이터가 없는 경우 빈 배열 반환
      const body = responseData.body || responseData.Body;
      const items = body?.items?.item || body?.Items?.Item;

      if (!items) {
        console.log('조회된 데이터가 없습니다.');
        return [];
      }

      // item이 배열이 아닌 경우 배열로 변환
      const itemsArray = Array.isArray(items) ? items : [items];

      console.log(`${itemsArray.length}개의 문화행사 데이터를 조회했습니다.`);

      return itemsArray.map(this.normalizeEventData);
    } catch (error) {
      console.error('문화행사 API 호출 오류:', error);
      if (axios.isAxiosError(error)) {
        throw new ApiError({
          code: 'API_ERROR',
          message: `API 호출 실패: ${error.message}`,
          details: error.response?.data,
        });
      }
      throw error;
    }
  }

  /**
   * 지역별 문화행사 정보를 조회합니다.
   * @param sido 시도명 (예: "서울특별시", "부산광역시")
   * @param gugun 구군명 (선택적)
   * @param additionalParams 추가 파라미터
   */
  async getCulturalEventsByRegion(
    sido: string,
    gugun?: string,
    additionalParams: Partial<ApiRequestParams> = {}
  ): Promise<CulturalEvent[]> {
    return this.getCulturalEvents({
      sido,
      gugun,
      ...additionalParams,
    });
  }

  /**
   * 기간별 문화행사 정보를 조회합니다.
   * @param startDate 시작일 (YYYYMMDD)
   * @param endDate 종료일 (YYYYMMDD)
   * @param additionalParams 추가 파라미터
   */
  async getCulturalEventsByPeriod(
    startDate: string,
    endDate: string,
    additionalParams: Partial<ApiRequestParams> = {}
  ): Promise<CulturalEvent[]> {
    return this.getCulturalEvents({
      from: startDate,
      to: endDate,
      ...additionalParams,
    });
  }

  /**
   * 문화행사 데이터를 캘린더 이벤트 형식으로 변환합니다.
   * @param events 문화행사 데이터 배열
   * @returns 캘린더 이벤트 배열
   */
  convertToCalendarEvents(events: CulturalEvent[]): CalendarEvent[] {
    return events.map((event) => ({
      id: event.seq,
      title: event.title,
      start: this.formatDateForCalendar(event.startDate),
      end: this.formatDateForCalendar(event.endDate, true), // 종료일은 하루 추가
      backgroundColor: this.getEventColor(event.realmName),
      borderColor: this.getEventColor(event.realmName),
      textColor: '#ffffff',
      extendedProps: {
        place: event.place,
        area: event.area,
        realmName: event.realmName,
        thumbnail: event.thumbnail,
        originalData: event,
      },
    }));
  }

  /**
   * API 응답 데이터를 정규화합니다.
   * @param rawData 원시 API 응답 데이터
   * @returns 정규화된 문화행사 데이터
   */
  private normalizeEventData(rawData: unknown): CulturalEvent {
    // 타입 가드: rawData가 객체인지 확인
    if (!rawData || typeof rawData !== 'object') {
      throw new Error('Invalid event data format');
    }

    const data = rawData as Record<string, unknown>;

    return {
      seq: String(data.seq || ''),
      title: String(data.title || '제목 없음'),
      startDate: String(data.startDate || ''),
      endDate: String(data.endDate || ''),
      place: String(data.place || ''),
      realmName: String(data.realmName || ''),
      area: String(data.area || ''),
      subArea: data.subArea ? String(data.subArea) : undefined,
      thumbnail: data.thumbnail ? String(data.thumbnail) : undefined,
      gpsX: data.gpsX ? String(data.gpsX) : undefined,
      gpsY: data.gpsY ? String(data.gpsY) : undefined,
      placeUrl: data.placeUrl ? String(data.placeUrl) : undefined,
      phone: data.phone ? String(data.phone) : undefined,
      placeAddr: data.placeAddr ? String(data.placeAddr) : undefined,
      placeAddrOld: data.placeAddrOld ? String(data.placeAddrOld) : undefined,
      homepage: data.homepage ? String(data.homepage) : undefined,
      ticket: data.ticket ? String(data.ticket) : undefined,
      performer: data.performer ? String(data.performer) : undefined,
      program: data.program ? String(data.program) : undefined,
      dtlContents: data.dtlContents ? String(data.dtlContents) : undefined,
      imageObject: data.imageObject ? String(data.imageObject) : undefined,
    };
  }

  /**
   * 날짜를 캘린더 형식으로 변환합니다.
   * @param dateString YYYY-MM-DD 형식의 날짜 문자열
   * @param isEndDate 종료일인지 여부 (종료일은 하루 추가)
   * @returns ISO 8601 형식의 날짜 문자열
   */
  private formatDateForCalendar(dateString: string, isEndDate = false): string {
    if (!dateString) return new Date().toISOString().split('T')[0];

    const date = new Date(dateString);
    if (isEndDate) {
      date.setDate(date.getDate() + 1); // FullCalendar는 종료일이 exclusive
    }

    return date.toISOString().split('T')[0];
  }

  /**
   * 행사 분야에 따른 색상을 반환합니다.
   * @param realmName 분야명
   * @returns 색상 코드
   */
  private getEventColor(realmName: string): string {
    const colorMap: Record<string, string> = {
      연극: '#3B82F6', // 파란색
      뮤지컬: '#8B5CF6', // 보라색
      콘서트: '#EF4444', // 빨간색
      음악: '#10B981', // 녹색
      무용: '#F59E0B', // 주황색
      미술: '#6B7280', // 회색
      전시: '#EC4899', // 핑크색
      문학: '#14B8A6', // 청록색
      영화: '#84CC16', // 라임색
    };

    // 키워드 매칭으로 색상 결정
    for (const [keyword, color] of Object.entries(colorMap)) {
      if (realmName.includes(keyword)) {
        return color;
      }
    }

    return '#6B7280'; // 기본 회색
  }
}

// API 에러 클래스
class ApiError extends Error {
  public code: string;
  public details?: unknown;

  constructor({
    code,
    message,
    details,
  }: {
    code: string;
    message: string;
    details?: unknown;
  }) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
  }
}

// 환경변수에서 API 키를 가져오는 함수
export function createCulturalApiService(): CulturalApiService {
  const serviceKey =
    process.env.NEXT_PUBLIC_CULTURE_API_KEY || process.env.CULTURE_API_KEY;

  if (!serviceKey) {
    throw new Error(
      '문화체육관광부 API 키가 설정되지 않았습니다. CULTURE_API_KEY 환경변수를 확인해주세요.'
    );
  }

  return new CulturalApiService(serviceKey);
}

// 기본 내보내기
export default CulturalApiService;
