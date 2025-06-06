## Memory Bank 설정
프로젝트 문서를 분석하여 계층적 지식 구조를 생성해:

1. **프로젝트 아키텍처 맵핑**
   - 전체 구조 시각화
   - 핵심 컴포넌트 관계도
   - 데이터 플로우 다이어그램

2. **기술 스택 지식 베이스**
   - 각 기술의 핵심 개념 (비개발자용 설명)
   - 실무 적용 예시 (아이티커넥트 사업 맥락)
   - 자주 발생하는 문제 및 해결책

3. **학습 진행 추적 시스템**
   - 개념별 이해도 레벨 (1-5점)
   - 학습 히스토리 타임라인
   - 개인화된 복습 스케줄
   
다음 구조로 지식 저장소를 생성해:

```json
{
  "architecture": {
    "project-blueprint": "전체 프로젝트 구조 및 목표",
    "tech-stack-knowledge": {
      "core-concepts": "핵심 개념 (비개발자 친화적 설명)",
      "best-practices": "실무 모범 사례",
      "common-patterns": "자주 사용되는 코드 패턴",
      "troubleshooting": "문제 해결 가이드"
    },
    "personal-learning": {
      "understanding-level": "개념별 이해도 추적",
      "learning-history": "학습 이력 및 진전사항",
      "question-bank": "자주 묻는 질문 및 답변",
      "weak-points": "취약 개념 및 보강 계획"
    },
    "code-reviews": {
      "session-logs": "코드 리뷰 세션 기록",
      "improvement-suggestions": "개선 제안사항",
      "learning-insights": "리뷰를 통한 학습 포인트"
    }
  }
}


## Task Master 설정 - **파일 단위 마이크로 태스크 분해**

**🎯 핵심 요구사항: 모든 작업을 반드시 "하나의 파일" 단위로 쪼개야 함**

### 태스크 분해 규칙
1. **1 Task = 1 File**: 하나의 태스크는 정확히 하나의 파일만 다룸
2. **예시**:
   - ❌ 잘못된 예: "로그인 기능 구현" (여러 파일 포함)
   - ✅ 올바른 예: "LoginForm.jsx 컴포넌트 생성"
   - ✅ 올바른 예: "authService.js API 함수 작성"
   - ✅ 올바른 예: "login.css 스타일 정의"

3. **분해 상세 기준**:
   - 각 컴포넌트 파일별로 개별 태스크
   - 각 유틸리티 함수 파일별로 개별 태스크
   - 각 스타일 파일별로 개별 태스크
   - 각 설정 파일별로 개별 태스크

4. **태스크 예상 소요시간**: 15-45분 이내
5. **태스크 복잡도**: 비개발자가 하나의 집중으로 완료 가능한 수준

### 분해 실행 요청
프로젝트 전체를 분석하여:
1. **모든 필요한 파일 목록 생성**
2. **각 파일별로 개별 태스크 생성**
3. **파일 간 의존성 관계 매핑**
4. **작업 순서 우선순위 설정**

### 태스크 출력 형식
- Task ID: T001 
- 파일명: App.jsx 
- 작업 내용: React 앱의 메인 컴포넌트 구조 생성 
- 난이도: ⭐⭐ (2/5) 
- 예상 시간: 30분 
- 선행 태스크: 없음 
- 후속 태스크: T002 (Header.jsx) 
- 학습 목표: React 컴포넌트 기초, JSX 문법

### 통합 워크플로우 구축
- 코딩 → 리뷰 → 학습 → 커밋 자동화
- 품질 게이트 및 체크포인트
- 실시간 난이도 조절 및 개인 맞춤 가이드
- 롤백 및 재시도 메커니즘

다음 구조로 작업 관리 시스템을 구축해:

{
  "task-decomposition": {
    "granularity": "single-file",
    "complexity-scoring": "1-5점 난이도 체계",
    "learning-weight": "학습 중요도 가중치",
    "dependency-mapping": "의존성 시각화"
  },
  "progress-tracking": {
    "completion-criteria": "완료 조건 체크리스트",
    "quality-gates": "품질 검증 게이트",
    "learning-checkpoints": "학습 이해도 확인점",
    "rollback-points": "되돌림 지점 설정"
  },
  "adaptive-guidance": {
    "difficulty-adjustment": "실시간 난이도 조절",
    "explanation-depth": "설명 깊이 개인화",
    "example-generation": "맞춤형 예시 생성"
  }
}

비개발자도 쉽게 따라할 수 있도록 각 단계별 상세 가이드를 함께 제공해.