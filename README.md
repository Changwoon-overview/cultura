# Next.js + MySQL 프로젝트

이 프로젝트는 Next.js와 MySQL을 사용하여 구축된 풀스택 웹 애플리케이션입니다.

## 🚀 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **언어**: TypeScript
- **데이터베이스**: MySQL
- **ORM**: Prisma
- **스타일링**: Tailwind CSS
- **테스팅**: Jest + React Testing Library
- **코드 품질**: ESLint + Prettier + Husky + Lint-staged

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/database_name"

# Next.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Development
NODE_ENV="development"
```

### 3. 데이터베이스 설정
```bash
# Prisma 클라이언트 생성
npm run db:generate

# 데이터베이스 푸시 (개발 환경)
npm run db:push

# 시드 데이터 생성
npm run db:seed
```

### 4. 개발 서버 실행
```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

## 🛠️ 사용 가능한 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린팅
npm run lint
npm run lint:fix

# 코드 포맷팅
npm run format
npm run format:check

# 테스트
npm run test
npm run test:watch
npm run test:coverage

# 데이터베이스 관련
npm run db:generate    # Prisma 클라이언트 생성
npm run db:push        # 데이터베이스에 스키마 푸시
npm run db:migrate     # 마이그레이션 실행
npm run db:studio      # Prisma Studio 실행
npm run db:seed        # 시드 데이터 생성
```

## 📁 프로젝트 구조

```
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API 라우트
│   │   ├── layout.tsx      # 루트 레이아웃
│   │   └── page.tsx        # 홈 페이지
│   ├── components/         # React 컴포넌트
│   │   ├── ui/            # 재사용 가능한 UI 컴포넌트
│   │   └── forms/         # 폼 컴포넌트
│   ├── lib/               # 유틸리티 함수
│   │   ├── db.ts          # 데이터베이스 연결
│   │   └── utils.ts       # 공통 유틸리티
│   └── types/             # TypeScript 타입 정의
├── prisma/
│   ├── schema.prisma      # 데이터베이스 스키마
│   └── seed.ts           # 시드 데이터
├── public/               # 정적 파일
└── init/                # 초기 설정 문서
```

## 🧪 테스트

```bash
# 모든 테스트 실행
npm run test

# 워치 모드로 테스트 실행
npm run test:watch

# 커버리지 포함 테스트
npm run test:coverage
```

## 🔧 개발 도구

- **ESLint**: 코드 품질 검사
- **Prettier**: 코드 포맷팅
- **Husky**: Git 훅 관리
- **Lint-staged**: 스테이징된 파일에 대한 린팅
- **Jest**: 테스트 프레임워크
- **Prisma Studio**: 데이터베이스 GUI

## 📋 코딩 규칙

프로젝트는 다음 코딩 규칙을 따릅니다:
- TypeScript strict 모드 사용
- ESLint와 Prettier를 통한 코드 품질 관리
- 컴포넌트명은 PascalCase 사용
- 파일명은 kebab-case 또는 camelCase 사용
- Git 커밋 전 자동 린팅 및 포맷팅

## 🚀 배포

### Vercel 배포
가장 쉬운 배포 방법은 [Vercel Platform](https://vercel.com/new)을 사용하는 것입니다.

### 환경 변수 설정
배포 시 다음 환경 변수를 설정해야 합니다:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

## 📖 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [Prisma 문서](https://www.prisma.io/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [TypeScript 문서](https://www.typescriptlang.org/docs)
