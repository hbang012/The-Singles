'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import type { Article } from '@/app/_lib/types';
import Image from 'next/image';
import Header from '@/app/componets/home/Header/Header';
import Footer from '@/app/componets/home/Footer';

export default function SearchResult() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';

  const { isPending, data, isError } = useQuery<{ results: Article[] }>({
    queryKey: ['search', keyword],
    queryFn: () =>
      fetch(
        `http://localhost:9090/search?keyword=${encodeURIComponent(keyword)}`
      ).then((res) => res.json()),
  });

  return (
    <>
      <Header />
      <main className="max-w-[1320px] mx-auto mt-[200px] mb-[145px] px-5">
        <h2 className="text-black text-[44px] font-bold ml-2">
          "{keyword}" 검색 결과
        </h2>
        {isPending ? (
          <p>검색 중...</p>
        ) : isError ? (
          <p>오류 발생!</p>
        ) : (
          <ul className="flex flex-wrap gap-[20px]">
            {data?.results.map((item) => (
              <li key={item.id} className="cursor-pointer">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={300}
                />
                <h3 className="text-[22px] font-bold">{item.title}</h3>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}
