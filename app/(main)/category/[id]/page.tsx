'use client';

import { useQuery } from '@tanstack/react-query';
import { use, useEffect, useState } from 'react';
import type { Article } from '@/app/_lib/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Category({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ subcategory: string }>;
}) {
  const paramsObj = use(params);
  const [sorted, setSorted] = useState<Article[] | undefined>([]);
  const searchParamObj = use(searchParams);
  const urlSearch = new URLSearchParams(searchParamObj);
  const router = useRouter();

  const defaultTab = 'All';
  const searchParamTab = use(searchParams).subcategory ?? defaultTab;
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<string | null>('latest');

  const { isPending, data, isError, error } = useQuery<{
    title: string;
    sub: string[];
    category: Article[];
  }>({
    queryKey: ['category', paramsObj.id, searchParamObj.subcategory],
    queryFn: () =>
      fetch(
        `http://localhost:9090/category/${paramsObj.id}?subcategory=${searchParamObj.subcategory}`
      ).then((res) => res.json()),
  });

  useEffect(() => {
    setSorted(data?.category);
  }, [data]);

  const [visibleCount, setVisibleCount] = useState(10);
  const items = data?.category ?? [];

  function handleLike() {
    if (data?.category) {
      const sort = [...data?.category].sort((a, b) => b.likes - a.likes);
      setSorted(sort);
      setActiveSort('popular');
    }
  }

  function handleLatest() {
    if (data?.category) {
      const sort = [...data?.category].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setSorted(sort);
      setActiveSort('latest');
    }
  }

  // 탭 핸들
  function handleSub(sub: string) {
    if (sub !== 'All') {
      urlSearch.set('subcategory', sub);
      router.push(`?${urlSearch.toString()}`);
    } else {
      urlSearch.delete('subcategory');
      router.push(`?${urlSearch.toString()}`);
    }
    setActiveIndex(sub);
  }

  return (
    <main className="h-[100%] w-[100%] max-w-[1320px] p-[0_20px_0_20px] mx-auto mt-[200px] mb-[145px] max-sm:mt-[120px]">
      <div className="flex justify-start items-center px-[20px]">
        <span className="w-[20px] h-[40px] bg-black max-sm:w-[15px] max-sm:h-[30px]"></span>
        <h2 className="text-[44px] text-black font-bold ml-[10px] max-sm:text-[30px] cursor-default">
          {data?.title}
        </h2>
      </div>
      {Array.isArray(data?.sub) && data.sub.length > 0 && (
        <div className="flex mt-[16px] px-[20px] max-md:flex-wrap ">
          {data?.sub.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleSub(searchParamTab === item ? '' : item)}
              className={`text-[22px] leading-[70px] mr-[60px] font-bold max-md:text-[25px] max-md:mr-[45px] max-sm:leading-[40px] max-sm:text-[18px] max-sm:mr-[20px] ${
                searchParamTab === item ? 'text-[#333]' : 'text-[#9f9f9f]'
              } `}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <div className="mt-[70px] ">
        <div className="flex items-center justify-end gap-[10px] mb-[20px] mr-[20px]">
          <button
            type="button"
            onClick={handleLatest}
            className={`text-[16px] ${
              activeSort === 'latest'
                ? 'font-bold text-[#333]'
                : 'text-[#9f9f9f]'
            }`}
          >
            최신순
          </button>
          <span className="h-[20px] w-[1px] bg-[#ccc]"></span>
          <button
            type="button"
            onClick={handleLike}
            className={`text-[16px] ${
              activeSort === 'popular'
                ? 'font-bold text-[#333]'
                : 'text-[#9f9f9f]'
            }`}
          >
            인기순
          </button>
        </div>

        <ul className="flex flex-wrap justify-baseline max-sm:justify-center">
          {sorted?.slice(0, visibleCount).map((item, index) => (
            <li
              key={`${item.id}-${index}`}
              className={`nth-child mx-[20px] mb-[35px] max-sm:w-[100%] max-sm:text-center ${
                [5, 9].includes(index + 1)
                  ? 'w-[calc(66.67%-40px)]'
                  : ' w-[calc(33.33%-40px)]'
              }`}
            >
              <Link href={`/articles/${item.id}`} className="block">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1000}
                  height={1000}
                  priority={true}
                  className="w-[100%] h-[470px] object-cover max-sm:h-[335px]"
                />
                <h2 className="text-black text-[16px] font-bold mt-[10px] max-sm:text-[10px] ">
                  {item.subcategory}
                </h2>
                <p className="text-black text-[24px] max-sm:text-[18px] ">
                  {item.title}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-center mt-[50px]">
          {visibleCount < items.length && (
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 10)}
              className='className=" w-[100px] font-bold text-[20px] underline underline-offset-3 text-[#333] max-sm:text-[15px] max-sm:text-[#333] max-sm:w-[70px]"'
            >
              +MORE
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
