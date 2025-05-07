// 여기에 프라미스 넘겨서 사용
// 훅사용시 붙여줘야함
// 'use client';

import { use } from 'react';

// 원래라면 posts 로받는데 타입을 모르겠다는 에러뜸
// 모든 프론트로 들어오는 데이타는 Promise
export default function Child2({
  posts,
}: {
  posts: Promise<{ id: number; title: string; content: string }[]>;
}) {
  // 사용하는측/프라미스 완료 결과 받을 때 use훅 사용
  // 클라이언트, 서버 컴포넌트 모두 사용가능
  // 프라미스 헤제 (완료)를 기다린후 jsx가 리턴됨

  const allPosts = use(posts);
  // console.log(allPosts);

  return (
    <div>
      <ul>
        {allPosts.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
