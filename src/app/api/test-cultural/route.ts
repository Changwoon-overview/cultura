import { CulturalApiService } from '@/lib/culturalApi';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 환경변수에서 API 키 확인
    const apiKey =
      process.env.CULTURE_API_KEY || process.env.NEXT_PUBLIC_CULTURE_API_KEY;

    console.log(
      '로드된 API 키:',
      apiKey ? `${apiKey.substring(0, 20)}...` : 'undefined'
    );

    if (!apiKey || apiKey === 'your_culture_api_key_here') {
      return NextResponse.json(
        {
          error: 'API 키가 설정되지 않았습니다.',
          message: '문화체육관광부 API 키를 .env 파일에 설정해주세요.',
          guide:
            'https://www.culture.go.kr/openapi 에서 API 키를 발급받으실 수 있습니다.',
        },
        { status: 400 }
      );
    }

    // API 서비스 인스턴스 생성
    const culturalApi = new CulturalApiService(apiKey);

    // 현재 날짜부터 한 달간의 데이터 조회
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);

    const startDate = today.toISOString().split('T')[0].replace(/-/g, '');
    const endDate = nextMonth.toISOString().split('T')[0].replace(/-/g, '');

    console.log(`API 테스트: ${startDate} ~ ${endDate} 기간의 문화행사 조회`);

    // 문화행사 데이터 조회 (최대 10개만)
    const events = await culturalApi.getCulturalEventsByPeriod(
      startDate,
      endDate,
      {
        numOfRows: 10, // 테스트용으로 10개만
        sido: '서울특별시', // 서울 지역만
      }
    );

    // 캘린더 이벤트로 변환
    const calendarEvents = culturalApi.convertToCalendarEvents(events);

    return NextResponse.json({
      success: true,
      message: `${events.length}개의 문화행사 데이터를 성공적으로 조회했습니다.`,
      data: {
        period: `${startDate} ~ ${endDate}`,
        region: '서울특별시',
        totalCount: events.length,
        events: events,
        calendarEvents: calendarEvents,
      },
    });
  } catch (error: unknown) {
    console.error('문화행사 API 테스트 오류:', error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : '알 수 없는 오류가 발생했습니다.';
    const errorCode =
      error && typeof error === 'object' && 'code' in error
        ? String(error.code)
        : 'UNKNOWN_ERROR';

    return NextResponse.json(
      {
        error: '문화행사 API 호출 실패',
        message: errorMessage,
        details: errorCode,
      },
      { status: 500 }
    );
  }
}
