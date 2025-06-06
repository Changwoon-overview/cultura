'use client';

import EventCard, {
  EventGrid,
  EventList,
} from '@/components/Calendar/EventCard';
import { CulturalEvent } from '@/types/api';

// 샘플 데이터
const sampleEvents: CulturalEvent[] = [
  {
    seq: '1',
    title: '서울아트센터 클래식 콘서트',
    startDate: '20250610',
    endDate: '20250612',
    place: '서울아트센터 콘서트홀',
    realmName: '음악',
    area: '서울특별시',
    subArea: '강남구',
    thumbnail: 'https://picsum.photos/400/300?random=1',
    gpsX: '127.027',
    gpsY: '37.518',
    placeUrl: 'https://example.com',
    phone: '02-123-4567',
    placeAddr: '서울특별시 강남구 테헤란로 123',
    homepage: 'https://example.com',
    ticket: '유료',
    performer: '서울 필하모닉 오케스트라',
    program: '베토벤 교향곡 9번',
    dtlContents: '베토벤의 대표작인 교향곡 9번 합창을 연주합니다.',
  },
  {
    seq: '2',
    title: '현대미술전시회 - 빛과 그림자',
    startDate: '20250605',
    endDate: '20250630',
    place: '국립현대미술관',
    realmName: '미술',
    area: '서울특별시',
    subArea: '종로구',
    thumbnail: '',
    phone: '02-987-6543',
    placeAddr: '서울특별시 종로구 삼청로 30',
    ticket: '무료',
    dtlContents:
      '현대미술 작품들을 통해 빛과 그림자의 미학을 탐구하는 전시회입니다.',
  },
  {
    seq: '3',
    title: '전통무용 공연 - 춘향가',
    startDate: '20250615',
    endDate: '20250615',
    place: '국립극장 해오름극장',
    realmName: '무용',
    area: '서울특별시',
    subArea: '중구',
    thumbnail: 'https://picsum.photos/400/300?random=3',
    phone: '02-567-8901',
    placeAddr: '서울특별시 중구 장충단로 59',
    ticket: '유료',
    performer: '국립무용단',
    program: '춘향가 전막',
    dtlContents: '전통 판소리를 무용으로 재해석한 작품입니다.',
  },
  {
    seq: '4',
    title: '연극 - 햄릿',
    startDate: '20250620',
    endDate: '20250625',
    place: '대학로 아트시네마',
    realmName: '연극',
    area: '서울특별시',
    subArea: '종로구',
    thumbnail: 'https://picsum.photos/400/300?random=4',
    phone: '02-234-5678',
    placeAddr: '서울특별시 종로구 대학로 123',
    ticket: '유료',
    performer: '극단 셰익스피어',
    program: '햜릿 전막',
    dtlContents:
      '셰익스피어의 불멸의 명작 햄릿을 현대적 감각으로 재해석한 작품입니다.',
  },
  {
    seq: '5',
    title: '한국 전통문화 축제',
    startDate: '20250701',
    endDate: '20250703',
    place: '한국문화의집',
    realmName: '전통',
    area: '서울특별시',
    subArea: '중구',
    thumbnail: 'https://picsum.photos/400/300?random=5',
    phone: '02-345-6789',
    placeAddr: '서울특별시 중구 명동길 123',
    ticket: '무료',
    program: '한복패션쇼, 전통음식 체험, 가야금 연주',
    dtlContents:
      '한국의 전통문화를 체험할 수 있는 다양한 프로그램이 준비되어 있습니다.',
  },
];

export default function DemoPage() {
  const handleEventClick = (event: CulturalEvent) => {
    alert(`클릭된 행사: ${event.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            EventCard 컴포넌트 데모
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            문화행사 정보를 표시하는 EventCard, EventGrid, EventList
            컴포넌트들을 미리 볼 수 있습니다.
          </p>
        </div>

        {/* 개별 EventCard 예시 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            개별 EventCard 컴포넌트
          </h2>
          <div className="max-w-sm mx-auto">
            <EventCard
              event={sampleEvents[0]}
              onClick={() => handleEventClick(sampleEvents[0])}
            />
          </div>
        </section>

        {/* EventGrid 예시 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            EventGrid 컴포넌트 (그리드 레이아웃)
          </h2>
          <EventGrid events={sampleEvents} onEventClick={handleEventClick} />
        </section>

        {/* EventList 예시 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            EventList 컴포넌트 (리스트 레이아웃)
          </h2>
          <EventList
            events={sampleEvents.slice(0, 3)}
            onEventClick={handleEventClick}
          />
        </section>

        {/* 빈 상태 예시 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            빈 상태 (Empty State)
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                빈 EventGrid
              </h3>
              <EventGrid events={[]} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                빈 EventList
              </h3>
              <EventList events={[]} />
            </div>
          </div>
        </section>

        {/* 기능 테스트 섹션 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            컴포넌트 기능 테스트
          </h2>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              구현된 기능들:
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                썸네일 이미지 표시 및 폴백 처리
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                카테고리별 색상 코딩 (연극, 음악, 무용, 미술, 전통)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                날짜 포맷팅 (한국어 형식)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                반응형 레이아웃 (모바일, 태블릿, 데스크톱)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                키보드 접근성 (Enter/Space 키 지원)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                호버 애니메이션 효과
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                텍스트 줄 제한 (line-clamp)
              </li>
            </ul>
          </div>
        </section>

        {/* 사용법 가이드 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            사용법 가이드
          </h2>
          <div className="bg-gray-900 text-green-400 rounded-lg p-6 text-sm font-mono overflow-x-auto">
            <div className="space-y-4">
              <div>
                <div className="text-gray-400">// 개별 EventCard 사용</div>
                <div>
                  import EventCard from '@/components/Calendar/EventCard';
                </div>
                <div>
                  &lt;EventCard event={`{event}`} onClick={`{handleClick}`}{' '}
                  /&gt;
                </div>
              </div>

              <div className="mt-4">
                <div className="text-gray-400">
                  // EventGrid 사용 (그리드 레이아웃)
                </div>
                <div>
                  import {`{ EventGrid }`} from
                  '@/components/Calendar/EventCard';
                </div>
                <div>
                  &lt;EventGrid events={`{events}`} onEventClick=
                  {`{handleClick}`} /&gt;
                </div>
              </div>

              <div className="mt-4">
                <div className="text-gray-400">
                  // EventList 사용 (리스트 레이아웃)
                </div>
                <div>
                  import {`{ EventList }`} from
                  '@/components/Calendar/EventCard';
                </div>
                <div>
                  &lt;EventList events={`{events}`} onEventClick=
                  {`{handleClick}`} /&gt;
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
