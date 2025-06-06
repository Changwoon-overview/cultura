# TaskMaster AI MCP 설정 가이드

## 개요

이 프로젝트는 TaskMaster AI MCP (Model Context Protocol) 서버를 사용하여 AI 기반 작업 관리를 구현합니다.

## 설치 완료 ✅

### 설치된 구성 요소

- `task-master-ai` 패키지 (v0.16.1)
- MCP 설정 파일 (`mcp-config.json`)
- TaskMaster 설정 파일 (`taskmaster.config.json`)
- Tasks 디렉토리 (`./tasks`)

### 스크립트

- `npm run mcp:task-master-ai` - TaskMaster AI MCP 실행

## API 키 설정이 필요합니다 ⚠️

`mcp-config.json` 파일에서 다음 API 키들을 실제 값으로 교체해야 합니다:

```json
{
  "mcpServers": {
    "taskmaster-ai": {
      "env": {
        "ANTHROPIC_API_KEY": "실제_ANTHROPIC_API_키_입력",
        "PERPLEXITY_API_KEY": "실제_PERPLEXITY_API_키_입력",
        "OPENAI_API_KEY": "실제_OPENAI_API_키_입력"
        // 기타 선택사항...
      }
    }
  }
}
```

**최소 요구사항:** Anthropic API 키 또는 OpenAI API 키 중 하나 이상 필요

## 사용 방법

1. **API 키 설정** - `mcp-config.json`에서 API 키 교체
2. **TaskMaster 초기화** - AI 채팅에서 "Initialize taskmaster-ai in my project" 입력
3. **PRD 파일 생성** - `scripts/prd.txt` 또는 `.taskmaster/docs/prd.txt`에 프로젝트 요구사항 문서 작성
4. **작업 생성** - "Can you parse my PRD?" 명령으로 작업 생성
5. **작업 실행** - "What's the next task I should work on?" 명령으로 다음 작업 확인

## 주요 명령어

- `Can you parse my PRD at scripts/prd.txt?` - PRD 파싱
- `What's the next task I should work on?` - 다음 작업 계획
- `Can you help me implement task 3?` - 특정 작업 구현
- `Can you help me expand task 4?` - 작업 세분화

## 문제 해결

API 키 관련 오류가 발생하면:

1. `mcp-config.json`에서 API 키 확인
2. Cursor 설정에서 MCP 탭의 새로고침 버튼 클릭
3. "taskmaster-ai" 토글 활성화 확인
