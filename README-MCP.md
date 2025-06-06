# MCP Tools 설정 가이드

이 프로젝트는 여러 MCP (Model Context Protocol) 서버를 사용하여 AI 작업 효율성을 향상시킵니다.

## 설치된 MCP Tools

### 1. TaskMaster AI MCP

- **목적**: AI 기반 작업 관리 및 프로젝트 계획
- **패키지**: task-master-ai
- **실행**: `npm run mcp:task-master-ai`

#### 주요 기능

- PRD 파싱 및 작업 생성
- 작업 우선순위 및 의존성 관리
- 프로젝트 진행 상황 추적
- 복잡도 분석 및 작업 분해

### 2. Context7 MCP 🔥

- **목적**: 실시간 최신 개발 문서 제공 및 AI 코딩 정확도 향상
- **패키지**: @upstash/context7-mcp
- **실행**: `npm run mcp:context7`

#### 주요 기능

- **실시간 문서 가져오기**: 최신 라이브러리/프레임워크 문서를 웹에서 자동 수집
- **API 오류 방지**: 존재하지 않는 API나 오래된 코드 예제 방지
- **버전별 정확한 가이드**: 사용 중인 라이브러리 버전에 맞는 정확한 문서 제공
- **즉시 사용 가능**: 프롬프트에 "use context7" 추가만으로 활성화

### 3. Allpepper Memory Bank MCP 💾

- **목적**: 프로젝트 메모리 뱅크 및 지속적인 컨텍스트 관리
- **패키지**: @allpepper/memory-bank-mcp
- **실행**: `npm run mcp:memory-bank`

#### 주요 기능

- **프로젝트별 메모리 관리**: 각 프로젝트의 메모리를 독립적으로 관리
- **지속적인 컨텍스트**: 대화 세션 간 정보 보존 및 검색
- **파일 시스템 기반**: 안정적인 로컬 파일 저장소 사용
- **다중 프로젝트 지원**: 여러 프로젝트의 메모리 뱅크를 중앙에서 관리

## 설정 상태

### ✅ 완료된 설정

- TaskMaster AI: API 키 설정 완료
- Context7: 기본 설정 완료
- Allpepper Memory Bank: 메모리 뱅크 디렉토리 설정 완료
- 세 MCP 서버 모두 `mcp-config.json`에 등록됨

### 🔧 추가 설정 옵션

#### Context7 고급 설정 (선택사항)

Context7은 기본적으로 무료로 모든 기능을 제공합니다. 추가 성능 향상을 위해 환경 변수를 설정할 수 있습니다:

```json
"context7": {
  "command": "npx",
  "args": ["-y", "@upstash/context7-mcp"],
  "env": {
    "DEFAULT_MINIMUM_TOKENS": "10000"
  }
}
```

**참고**: Context7은 Upstash 팀이 무료로 제공하는 서비스입니다!

## 사용 방법

### TaskMaster AI 명령어

- `Initialize taskmaster-ai in my project` - 초기화
- `Can you parse my PRD at scripts/prd.txt?` - PRD 파싱
- `What's the next task I should work on?` - 다음 작업 확인
- `Can you help me implement task 3?` - 작업 구현

### Context7 명령어

- `How do I use React hooks? use context7` - React 최신 문서 참조
- `Create a Next.js API route with TypeScript. use context7` - Next.js 최신 가이드
- `How to connect to MongoDB with Mongoose? use context7` - MongoDB 공식 문서 참조
- `Implement authentication with NextAuth.js. use context7` - NextAuth 최신 문서

### Memory Bank 명령어

- `Store this information for later use` - 정보를 메모리 뱅크에 저장
- `What did we discuss about the authentication setup?` - 이전 대화 기록 검색
- `List all projects in memory bank` - 저장된 프로젝트 목록 확인
- `Read the memory for this project` - 현재 프로젝트의 메모리 읽기

## Cursor에서 MCP 활성화

1. **Cursor 설정** → **MCP** 탭 이동
2. 다음 서버들이 활성화되어 있는지 확인:
   - ✅ taskmaster-ai
   - ✅ context7
   - ✅ allpepper-memory-bank
3. 비활성화된 경우 토글 스위치로 활성화
4. 새로고침 버튼 클릭하여 서버 상태 업데이트

## 문제 해결

### TaskMaster AI 관련

- API 키 오류: `mcp-config.json`에서 ANTHROPIC_API_KEY 확인
- 초기화 실패: `tasks` 디렉토리 존재 여부 확인

### Context7 관련

- 연결 오류: Cursor MCP 설정에서 context7 서버 상태 확인
- 문서를 찾을 수 없음: 라이브러리 이름을 정확히 입력하고 "use context7" 추가 확인
- 느린 응답: `DEFAULT_MINIMUM_TOKENS` 값을 낮춰서 시도

### Memory Bank 관련

- 연결 오류: Cursor MCP 설정에서 allpepper-memory-bank 서버 상태 확인
- 디렉토리 오류: `MEMORY_BANK_ROOT` 경로가 올바른지 확인 (./memory-bank)
- 권한 오류: 메모리 뱅크 디렉토리의 읽기/쓰기 권한 확인

## 참고 링크

- [TaskMaster AI 공식 문서](https://github.com/eyaltoledano/claude-task-master)
- [Context 7 공식 문서](https://context7.ai/)
- [Upstash Context 7 MCP](https://www.npmjs.com/package/@upstash/context7-mcp)
- [MCP 프로토콜 문서](https://modelcontextprotocol.io/)
