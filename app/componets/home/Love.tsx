'use client';

import { Article } from '@/app/_lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function Love({ data }: { data: Promise<Article[]> }) {
  const articles = use(data);
  const router = useRouter();

  return (
    <div className="mt-[100px] p-[0_20px_0_20px] mb-[100px]">
      <div className="flex justify-center items-center max-sm:mb-[10px]">
        <div className="w-full flex items-center">
          <span className="bg-[#fff] w-[28px] h-[56px] mr-[15px] max-md:w-[25px] max-md:h-[45px] max-sm:w-[15px] max-sm:h-[30px] max-sm:mr-[10px]"></span>
          <h2 className="text-[#fff] text-[60px] font-bold max-md:text-[45px] max-sm:text-[28px]">
            Love&Sex
          </h2>
        </div>
        <Link
          href={'/category/6'}
          className="w-[100px] font-bold text-[20px] text-[#ccc] underline underline-[#333] underline-offset-4 max-sm:text-[15px] max-sm:text-[#ccc] max-sm:w-[70px]"
        >
          + MORE
        </Link>
      </div>

      {/* 러브 리스트 */}
      <ul className="flex justify-between flex-wrap gap-[10px] mt-[30px] mb-[30px]">
        {articles.map((article, i) => {
          if (i === 1 || i === 2 || i === 3) {
            return (
              <li
                key={article.id}
                className="flex flex-col gap-[10px] w-[32%] max-[555px]:w-full max-sm:gap-[5px]"
                onClick={() => router.push(`/articles/${article.id}`)}
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  width={540}
                  height={675}
                  priority
                  className="h-[470px] w-[100%] object-cover cursor-pointer mb-[10px] max-sm:h-[200px] max-sm:mb-[0px] max-sm:mt-[28px]"
                />
                <strong className="w-[100%] text-[20px] text-[#d7000f] font-bold max-sm:text-[15px] max-sm:mt-[5px]">
                  Love&Sex
                </strong>
                <h2 className="w-[100%] leading-[30px] text-[#ddd] text-[24px] font-medium max-md:text-[20px] max-md:w-[240px] max-sm:w-[100%] max-sm:text-[18px] max-sm:truncate">
                  {article.title}
                </h2>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
