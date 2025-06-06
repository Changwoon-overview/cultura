import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('시드 데이터 생성을 시작합니다...');

  // 기존 데이터 삭제
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // 샘플 사용자 생성
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      name: '사용자 1',
      password: 'password123', // 실제로는 해시화해야 함
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      name: '사용자 2',
      password: 'password123', // 실제로는 해시화해야 함
    },
  });

  // 샘플 게시글 생성
  await prisma.post.createMany({
    data: [
      {
        title: '첫 번째 게시글',
        content: '이것은 첫 번째 게시글의 내용입니다.',
        published: true,
        authorId: user1.id,
      },
      {
        title: '두 번째 게시글',
        content: '이것은 두 번째 게시글의 내용입니다.',
        published: false,
        authorId: user1.id,
      },
      {
        title: '세 번째 게시글',
        content: '이것은 세 번째 게시글의 내용입니다.',
        published: true,
        authorId: user2.id,
      },
    ],
  });

  console.log('시드 데이터 생성이 완료되었습니다.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 