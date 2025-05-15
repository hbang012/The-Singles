// 카테고리 리스트 페이지
'use client';

import Link from 'next/link';
import categories from '@/mocks/categoris.json';

export default function Categoris() {
  return (
    <div className="h-[1200px] bg-blue-200">
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="border">
            <Link href={`/categoris/${category.id}`}>
              {category.name} 상세 보기
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
