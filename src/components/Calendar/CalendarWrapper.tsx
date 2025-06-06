'use client';

import type { CalendarEvent } from '@/types/api';
import type {
  CalendarApi,
  EventClickArg,
  EventInput,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { useCallback, useRef } from 'react';

interface CalendarWrapperProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: Date) => void;
  loading?: boolean;
  className?: string;
}

/**
 * FullCalendar 라이브러리를 감싸는 React 컴포넌트
 * 한국의 문화행사 데이터를 월간 캘린더 형태로 표시합니다.
 */
export default function CalendarWrapper({
  events,
  onEventClick,
  onDateClick,
  loading = false,
  className = '',
}: CalendarWrapperProps) {
  const calendarRef = useRef<FullCalendar>(null);

  // FullCalendar 이벤트 형식으로 변환
  const calendarEvents: EventInput[] = events.map((event) => ({
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    backgroundColor: event.backgroundColor,
    borderColor: event.borderColor,
    textColor: event.textColor,
    extendedProps: event.extendedProps,
  }));

  // 이벤트 클릭 핸들러
  const handleEventClick = useCallback(
    (clickInfo: EventClickArg) => {
      const originalEvent = clickInfo.event.extendedProps
        .originalData as CalendarEvent;
      if (onEventClick && originalEvent) {
        onEventClick(originalEvent);
      }
    },
    [onEventClick]
  );

  // 날짜 클릭 핸들러
  const handleDateClick = useCallback(
    (dateInfo: { date: Date }) => {
      if (onDateClick) {
        onDateClick(dateInfo.date);
      }
    },
    [onDateClick]
  );

  // 캘린더 API 접근 함수들
  const getCalendarApi = useCallback((): CalendarApi | null => {
    return calendarRef.current?.getApi() || null;
  }, []);

  const goToDate = useCallback(
    (date: Date) => {
      const api = getCalendarApi();
      if (api) {
        api.gotoDate(date);
      }
    },
    [getCalendarApi]
  );

  const goToToday = useCallback(() => {
    const api = getCalendarApi();
    if (api) {
      api.today();
    }
  }, [getCalendarApi]);

  const goToPrev = useCallback(() => {
    const api = getCalendarApi();
    if (api) {
      api.prev();
    }
  }, [getCalendarApi]);

  const goToNext = useCallback(() => {
    const api = getCalendarApi();
    if (api) {
      api.next();
    }
  }, [getCalendarApi]);

  // 외부에서 사용할 수 있도록 ref에 메서드들 노출
  if (calendarRef.current) {
    (calendarRef.current as any).goToDate = goToDate;
    (calendarRef.current as any).goToToday = goToToday;
    (calendarRef.current as any).goToPrev = goToPrev;
    (calendarRef.current as any).goToNext = goToNext;
  }

  return (
    <div className={`calendar-wrapper ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-600">
              문화행사 정보를 불러오는 중...
            </span>
          </div>
        </div>
      )}

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        height="auto"
        aspectRatio={1.8}
        locale="ko"
        headerToolbar={{
          left: '',
          center: '',
          right: '',
        }}
        dayMaxEvents={3}
        moreLinkClick="popover"
        eventDisplay="block"
        displayEventTime={false}
        eventClassNames="cursor-pointer hover:opacity-80 transition-opacity"
        dayHeaderClassNames="text-sm font-medium text-gray-700 bg-gray-50 py-2"
        dayCellClassNames="border-gray-200 hover:bg-gray-50 transition-colors"
        eventMouseEnter={(info) => {
          info.el.style.transform = 'scale(1.02)';
          info.el.style.transition = 'transform 0.2s ease';
        }}
        eventMouseLeave={(info) => {
          info.el.style.transform = 'scale(1)';
        }}
        nowIndicator={true}
        selectable={true}
        selectMirror={true}
        dayPopoverFormat={{ month: 'long', day: 'numeric' }}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: false,
        }}
        titleFormat={{ year: 'numeric', month: 'long' }}
        buttonText={{
          today: '오늘',
          month: '월',
          week: '주',
          day: '일',
        }}
        weekText="주"
        allDayText="종일"
        noEventsText="등록된 행사가 없습니다"
        moreLinkText={(num) => `+${num}개 더보기`}
      />
    </div>
  );
}

// 컴포넌트 타입 export (다른 컴포넌트에서 ref 타입으로 사용)
export type CalendarWrapperRef = FullCalendar & {
  goToDate: (date: Date) => void;
  goToToday: () => void;
  goToPrev: () => void;
  goToNext: () => void;
};
