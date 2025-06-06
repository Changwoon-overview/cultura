# 팀 개발 가이드라인

## 🚀 빠른 시작 가이드

### 새 팀원 온보딩

1. **환경 설정**
   ```bash
   # Node.js 18+ 설치
   # MySQL 8.0+ 설치
   # Git 설치
   ```

2. **프로젝트 클론 및 설정**
   ```bash
   git clone <repository-url>
   cd project-name
   npm install
   cp .env.example .env
   # .env 파일에 실제 데이터베이스 정보 입력
   npm run db:generate
   npm run db:push
   npm run db:seed
   npm run dev
   ```

## 📝 개발 워크플로우

### 1. 브랜치 전략 (GitFlow)

- `main`: 프로덕션 브랜치
- `develop`: 개발 브랜치
- `feature/*`: 새 기능 개발
- `hotfix/*`: 긴급 수정
- `release/*`: 릴리스 준비

### 2. 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 변경
style: 코드 포맷팅 (기능 변경 없음)
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드 프로세스나 도구 변경
```

예시:
```bash
git commit -m "feat: 사용자 로그인 기능 추가"
git commit -m "fix: 데이터베이스 연결 오류 수정"
```

### 3. Pull Request 프로세스

1. feature 브랜치에서 작업
2. 작업 완료 후 develop 브랜치로 PR 생성
3. 코드 리뷰 진행
4. 승인 후 merge

## 🔧 코드 품질 관리

### 자동화된 도구

- **ESLint**: 코드 품질 검사
- **Prettier**: 코드 포맷팅
- **Husky**: Git 훅으로 자동 검사
- **Lint-staged**: 스테이징된 파일만 검사

### 코드 스타일

1. **TypeScript 사용 필수**
   - 모든 함수에 타입 정의
   - any 타입 사용 금지
   - strict 모드 활성화

2. **컴포넌트 네이밍**
   ```typescript
   // ✅ 좋은 예
   const UserProfile = () => { ... }
   const UserListItem = () => { ... }
   
   // ❌ 나쁜 예
   const userprofile = () => { ... }
   const user_profile = () => { ... }
   ```

3. **파일 구조**
   ```
   src/
   ├── components/
   │   ├── ui/           # 재사용 가능한 UI 컴포넌트
   │   ├── forms/        # 폼 관련 컴포넌트
   │   └── layout/       # 레이아웃 컴포넌트
   ├── app/
   │   ├── api/          # API 라우트
   │   └── (pages)/      # 페이지 컴포넌트
   ├── lib/              # 유틸리티 함수
   ├── hooks/            # 커스텀 훅
   └── types/            # 타입 정의
   ```

## 🧪 테스트 가이드라인

### 테스트 작성 규칙

1. **모든 컴포넌트에 테스트 작성**
   ```typescript
   // Button.test.tsx
   describe('Button', () => {
     it('renders correctly', () => {
       render(<Button>Test</Button>);
       expect(screen.getByRole('button')).toBeInTheDocument();
     });
   });
   ```

2. **API 라우트 테스트**
   ```typescript
   // users.test.ts
   describe('/api/users', () => {
     it('should return users list', async () => {
       const response = await GET();
       expect(response.status).toBe(200);
     });
   });
   ```

3. **테스트 커버리지 80% 이상 유지**

### 테스트 실행

```bash
# 모든 테스트 실행
npm run test

# 특정 파일 테스트
npm run test -- Button.test.tsx

# 커버리지 확인
npm run test:coverage
```

## 🗄️ 데이터베이스 관리

### Prisma 사용법

1. **스키마 변경**
   ```bash
   # schema.prisma 수정 후
   npm run db:push  # 개발 환경
   npm run db:migrate  # 프로덕션 환경
   ```

2. **시드 데이터**
   ```bash
   npm run db:seed
   ```

3. **데이터베이스 GUI**
   ```bash
   npm run db:studio
   ```

### 마이그레이션 가이드라인

- 모든 스키마 변경은 마이그레이션으로 관리
- 마이그레이션 파일은 절대 수동 편집하지 않음
- 프로덕션 배포 전 마이그레이션 테스트 필수

## 🔒 보안 가이드라인

### 환경 변수 관리

1. **민감한 정보는 환경 변수로 관리**
   ```env
   DATABASE_URL="mysql://..."
   NEXTAUTH_SECRET="..."
   ```

2. **환경 변수는 절대 커밋하지 않음**
   - `.env` 파일은 `.gitignore`에 포함
   - `.env.example`로 템플릿 제공

### API 보안

1. **입력 값 검증 필수**
   ```typescript
   if (!email || !password) {
     return NextResponse.json(
       { error: 'Required fields missing' },
       { status: 400 }
     );
   }
   ```

2. **에러 메시지 최소화**
   - 내부 시스템 정보 노출 금지
   - 일반적인 에러 메시지 사용

## 📋 코드 리뷰 체크리스트

### 기능 검토

- [ ] 요구사항이 정확히 구현되었는가?
- [ ] 엣지 케이스가 고려되었는가?
- [ ] 에러 처리가 적절한가?

### 코드 품질

- [ ] 타입 정의가 적절한가?
- [ ] 함수와 변수명이 명확한가?
- [ ] 중복 코드가 없는가?
- [ ] 성능상 문제가 없는가?

### 테스트

- [ ] 테스트가 작성되었는가?
- [ ] 테스트가 의미 있는가?
- [ ] 커버리지가 충분한가?

### 문서화

- [ ] 복잡한 로직에 주석이 있는가?
- [ ] API 변경 시 문서가 업데이트되었는가?

## 🚀 배포 가이드라인

### 배포 전 체크리스트

- [ ] 모든 테스트 통과
- [ ] 린팅 에러 없음
- [ ] 빌드 성공
- [ ] 환경 변수 설정 확인
- [ ] 데이터베이스 마이그레이션 준비

### 배포 프로세스

1. **스테이징 환경 배포**
   ```bash
   npm run build
   npm run test
   ```

2. **프로덕션 환경 배포**
   - Vercel 자동 배포 또는
   - 수동 배포 프로세스 따르기

## 🆘 문제 해결

### 자주 발생하는 문제

1. **Prisma 연결 오류**
   ```bash
   npm run db:generate
   npm run db:push
   ```

2. **패키지 설치 오류**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **타입 에러**
   ```bash
   npm run build
   # 에러 메시지 확인 후 수정
   ```

### 도움 요청

- Slack #development 채널
- GitHub Issues
- 코드 리뷰 요청

## 📚 추가 리소스

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Prisma 공식 문서](https://www.prisma.io/docs)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

---

**이 가이드는 팀의 효율적인 협업을 위한 것입니다. 궁금한 점이 있으면 언제든지 문의해주세요!** 