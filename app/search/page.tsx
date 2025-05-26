'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import type { Article } from '@/app/_lib/types';
import type { Research } from '@/app/_lib/types';
import Image from 'next/image';
import Header from '@/app/componets/home/Header/Header';
import Footer from '@/app/componets/home/Footer';

// Article Research 포함
type SearchResultItem =
  | (Article & { type: 'article' })
  | (Research & { type: 'research' });

export default function SearchResult() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const router = useRouter();

  const { isPending, data, isError } = useQuery<{
    results: SearchResultItem[];
  }>({
    queryKey: ['search', keyword],
    queryFn: () =>
      fetch(
        `http://localhost:9090/search?keyword=${encodeURIComponent(keyword)}`
      ).then((res) => res.json()),
  });

  return (
    <>
      <Header />
      <main className="max-w-[1320px] mx-auto mt-[200px] mb-[145px] px-5 max-md:mt-[250px] max-sm:mt-[130px]">
        <div className="max-sm:text-center max-sm:flex max-sm:flex-col max-sm:justify-center">
          <h2 className="text-black text-[44px] font-bold ml-2 border-b-[#ddd] border-b-1 mb-[30px] max-sm:text-[28px] max-sm:border-0">
            "{keyword}"{' '}
            <span className="text-[#999] text-[28px] max-sm:font-medium">
              검색 결과
            </span>
          </h2>
        </div>

        {isPending ? (
          <p>검색 중...</p>
        ) : isError ? (
          <p>오류 발생!</p>
        ) : (
          <ul className="flex justify-center flex-wrap gap-[20px]">
            {data?.results.map((item) => {
              const pagePath =
                item.type === 'article'
                  ? `/article/${item.id}`
                  : `/research/${item.id}`;

              return (
                <li
                  key={item.id}
                  onClick={() => router.push(pagePath)}
                  className="cursor-pointer"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1500}
                    height={1500}
                    priority={true}
                    className="w-[500px] h-[300px] object-cover rounded-[5px] mb-[10px] max-sm:mb-[5px]"
                  />
                  <div>
                    <strong className="text-[16px] text-black font-bold max-sm:text-[14px]">
                      {item.subcategory}
                    </strong>
                    <h3 className=" w-[400px] truncate text-[24px] text-black mt-[5px] max-sm:text-[18px] max-sm:mt-[0] max-sm:w-[200px]">
                      {item.title}
                    </h3>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}
