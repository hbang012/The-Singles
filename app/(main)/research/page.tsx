'use client';

import { useQuery } from '@tanstack/react-query';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Research } from '@/app/_lib/types';
import Image from 'next/image';

export default function Researchs({
  searchParams,
}: {
  searchParams: Promise<{ subcategory: string }>;
}) {
  const searchParamObj = use(searchParams);
  const urlSearch = new URLSearchParams(searchParamObj);
  const router = useRouter();

  const [sorted, setSorted] = useState<Research[] | undefined>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isExpired, setIsExpired] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isPending, isError, error, data } = useQuery<{
    title: string;
    sub: string[];
    date: number;
    done: string;
    closeDate?: string;
    category: Research[];
  }>({
    queryKey: ['research', searchParamObj.subcategory],
    queryFn: () =>
      fetch(
        `http://localhost:9090/research?subcategory=${searchParamObj.subcategory}`
      ).then((res) => res.json()),
  });

  useEffect(() => {
    if (data?.category) {
      setSorted(data.category);
    }
  }, [data]);

  // 탭메뉴
  function handleSub(sub: string) {
    const labelToQueryMap: Record<string, string> = {
      'Do&Don-t': 'canDo',
      'Life Survey': 'lifeSurvey',
    };

    const subcategory = labelToQueryMap[sub];

    if (subcategory) {
      urlSearch.set('subcategory', subcategory);
      router.push(`/research?${urlSearch.toString()}`);
    }
  }

  // 날짜
  useEffect(() => {
    const today = new Date();
    const lastDate = new Date(data?.closeDate || '1970-01-01');

    setIsExpired(
      today.getTime() - lastDate.getTime() > 30 * 24 * 60 * 60 * 1000
    );
  }, [data?.closeDate]);

  return (
    <main className="max-w-[1320px] mx-auto mt-[200px] mb-[145px] px-5 max-sm:mt-[120px]">
      <div className="flex items-center">
        <span className="w-[20px] h-[40px] bg-black max-sm:w-[15px] max-sm:h-[30px]"></span>
        <h2
          className="text-black text-[44px] font-bold ml-2 max-sm:text-[30px] cursor-pointer"
          onClick={() => router.push(`/research?subcategory=canDo`)}
        >
          {data?.title}
        </h2>
      </div>

      <div className="flex mt-4">
        {data?.sub?.map((sub) => (
          <button
            key={sub}
            onClick={() => handleSub(sub)}
            className="text-[22px] text-[#333] font-bold mr-[60px] max-sm:text-[16px] max-sm:mr-[30px]"
          >
            {sub}
          </button>
        ))}
      </div>

      <div className="mt-[75px]">
        <ul className="flex flex-wrap gap-[20px] justify-center ">
          {sorted?.slice(0, visibleCount).map((item) => (
            <li
              key={item.id}
              className=" w-[calc(50%-10px)] mb-[35px] max-sm:w-full  cursor-pointer"
              onClick={() => router.push(`/research/${item.id}`)}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={1000}
                height={1000}
                priority={true}
                className="w-full h-[470px] object-cover max-sm:h-[335px] rounded-[10px]"
              />
              <div className="justify-center">
                <div className="flex items-center">
                  <h2 className="text-[16px] font-bold mt-2 max-sm:text-[10px]  mr-[30px]">
                    {typeof item.date === 'number' && item.date > 0
                      ? item.date
                      : item.done || '종료'}
                  </h2>

                  <p className="text-[18px] mt-2 text-[#9f9f9f] max-sm:text-[18px]">
                    {item.openDate}
                    <span>~</span>
                    {item.closeDate}
                  </p>
                </div>
                <p className="text-black text-[24px] max-sm:text-[18px] truncate">
                  {item.title}{' '}
                </p>
                <button
                  className={`mt-[10px] px-[5px] py-[10px] w-[100%] text-white font-bold rounded ${
                    isExpired ? 'bg-gray-400 ' : 'bg-[#333]'
                  }`}
                  disabled={isExpired}
                >
                  {isExpired ? '결과보기' : '투표하기'}
                </button>
              </div>
            </li>
          ))}
        </ul>

        {visibleCount < (sorted?.length || 0) && (
          <div className="flex justify-center mt-[50px]">
            <button
              onClick={() => setVisibleCount((prev) => prev + 10)}
              className="w-[100px] text-[20px] underline font-bold text-[#333] max-sm:w-[70px] max-sm:text-[15px]"
            >
              +MORE
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
