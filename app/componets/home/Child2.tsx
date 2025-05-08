// 'use client';

import { use } from 'react';

export default function Child2({
  posts,
}: {
  posts: Promise<{ id: number; title: string; content: string }[]>;
}) {
  const allPosts = use(posts);

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
