'use client';

import { CulturalEvent } from '@/types/api';
import React from 'react';

interface EventCardProps {
  event: CulturalEvent;
  onClick?: () => void;
  className?: string;
}

/**
 * 문화행사 정보를 표시하는 카드 컴포넌트
 * @param event 문화행사 데이터
 * @param onClick 클릭 이벤트 핸들러
 * @param className 추가 CSS 클래스
 */
export default function EventCard({
  event,
  onClick,
  className = '',
}: EventCardProps) {
  // 날짜 포맷팅 함수
  const formatDateRange = (startDate: string, endDate: string): string => {
    if (!startDate) return '날짜 미정';

    const start = new Date(
      startDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
    );
    const end = endDate
      ? new Date(endDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'))
      : start;

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    };

    if (startDate === endDate || !endDate) {
      return formatDate(start);
    }

    return `${formatDate(start)} ~ ${formatDate(end)}`;
  };

  // 카테고리 색상 매핑
  const getCategoryColor = (realmName: string): string => {
    const colorMap: Record<string, string> = {
      연극: 'bg-purple-500',
      음악: 'bg-blue-500',
      무용: 'bg-pink-500',
      미술: 'bg-green-500',
      전통: 'bg-yellow-500',
      기타: 'bg-gray-500',
    };

    return colorMap[realmName] || 'bg-blue-500';
  };

  // 이미지 로딩 에러 핸들러
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

  return (
    <div
      className={`event-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1 ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`${event.title} 행사 정보`}
    >
      {/* 썸네일 이미지 영역 */}
      <div className="relative pb-[56.25%] bg-gray-100">
        {event.thumbnail ? (
          <>
            <img
              src={event.thumbnail}
              alt={`${event.title} 행사 이미지`}
              className="absolute w-full h-full object-cover"
              loading="lazy"
              onError={handleImageError}
            />
            {/* 이미지 로딩 실패 시 폴백 */}
            <div
              className="absolute w-full h-full items-center justify-center bg-gray-200 hidden"
              style={{ display: 'none' }}
            >
              <div className="text-center text-gray-500">
                <span className="block text-2xl mb-2">🎭</span>
                <span className="text-sm">이미지 없음</span>
              </div>
            </div>
          </>
        ) : (
          <div className="absolute w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-center text-gray-500">
              <span className="block text-2xl mb-2">🎭</span>
              <span className="text-sm">이미지 없음</span>
            </div>
          </div>
        )}

        {/* 카테고리 배지 */}
        {event.realmName && (
          <div
            className={`absolute top-2 right-2 ${getCategoryColor(event.realmName)} text-white text-xs px-2 py-1 rounded-full font-medium`}
          >
            {event.realmName}
          </div>
        )}
      </div>

      {/* 행사 정보 영역 */}
      <div className="p-4">
        {/* 행사 제목 */}
        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 leading-tight">
          {event.title || '제목 없음'}
        </h3>

        {/* 날짜 정보 */}
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <span className="inline-block w-4 mr-2 text-center">📅</span>
          <span>{formatDateRange(event.startDate, event.endDate)}</span>
        </div>

        {/* 장소 정보 */}
        {event.place && (
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <span className="inline-block w-4 mr-2 text-center">📍</span>
            <span className="line-clamp-1">{event.place}</span>
          </div>
        )}

        {/* 지역 정보 */}
        {event.area && (
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <span className="inline-block w-4 mr-2 text-center">🏢</span>
            <span className="line-clamp-1">{event.area}</span>
          </div>
        )}

        {/* 추가 정보 표시자 */}
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            {event.seq && `ID: ${event.seq}`}
          </span>

          {/* 호버 시 상세보기 힌트 */}
          <span className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
            자세히 보기 →
          </span>
        </div>
      </div>
    </div>
  );
}

// 추가 유틸리티 컴포넌트들

/**
 * 행사 목록을 그리드 형태로 표시하는 컴포넌트
 */
interface EventGridProps {
  events: CulturalEvent[];
  onEventClick?: (event: CulturalEvent) => void;
  className?: string;
}

export function EventGrid({
  events,
  onEventClick,
  className = '',
}: EventGridProps) {
  if (!events.length) {
    return (
      <div className="text-center py-12">
        <span className="text-4xl mb-4 block">🎭</span>
        <p className="text-gray-500 text-lg">표시할 행사가 없습니다</p>
        <p className="text-gray-400 text-sm mt-2">
          다른 날짜나 지역을 선택해보세요
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
    >
      {events.map((event) => (
        <EventCard
          key={event.seq}
          event={event}
          onClick={() => onEventClick?.(event)}
        />
      ))}
    </div>
  );
}

/**
 * 행사 목록을 리스트 형태로 표시하는 컴포넌트
 */
interface EventListProps {
  events: CulturalEvent[];
  onEventClick?: (event: CulturalEvent) => void;
  className?: string;
}

export function EventList({
  events,
  onEventClick,
  className = '',
}: EventListProps) {
  if (!events.length) {
    return (
      <div className="text-center py-8">
        <span className="text-3xl mb-3 block">📝</span>
        <p className="text-gray-500">표시할 행사가 없습니다</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {events.map((event) => (
        <div
          key={event.seq}
          className="flex bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onEventClick?.(event)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onEventClick?.(event);
            }
          }}
        >
          {/* 썸네일 (작은 크기) */}
          <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
            {event.thumbnail ? (
              <img
                src={event.thumbnail}
                alt={`${event.title} 행사 이미지`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-400 text-lg">🎭</span>
              </div>
            )}
          </div>

          {/* 행사 정보 */}
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 line-clamp-1">
                  {event.title || '제목 없음'}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {formatDateRange(event.startDate, event.endDate)}
                </p>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {event.place} {event.area && `• ${event.area}`}
                </p>
              </div>

              {/* 카테고리 배지 */}
              {event.realmName && (
                <span
                  className={`${getCategoryColor(event.realmName)} text-white text-xs px-2 py-1 rounded-full font-medium ml-3`}
                >
                  {event.realmName}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// 개별 함수들도 export
function formatDateRange(startDate: string, endDate: string): string {
  if (!startDate) return '날짜 미정';

  const start = new Date(
    startDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
  );
  const end = endDate
    ? new Date(endDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'))
    : start;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (startDate === endDate || !endDate) {
    return formatDate(start);
  }

  return `${formatDate(start)} ~ ${formatDate(end)}`;
}

function getCategoryColor(realmName: string): string {
  const colorMap: Record<string, string> = {
    연극: 'bg-purple-500',
    음악: 'bg-blue-500',
    무용: 'bg-pink-500',
    미술: 'bg-green-500',
    전통: 'bg-yellow-500',
    기타: 'bg-gray-500',
  };

  return colorMap[realmName] || 'bg-blue-500';
}
