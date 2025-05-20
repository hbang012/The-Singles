'use client';

import { Article } from '@/app/_lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function Lifestyle({ data }: { data: Promise<Article[]> }) {
  const articles = use(data);
  const router = useRouter();

  return (
    <div className="p-[0_20px_0_20px]">
      <div className="flex justify-center items-center max-sm:mb-[10px]">
        <div className="w-[100%] flex items-center">
          <span className="bg-black w-[28px] h-[56px] mr-[15px] max-md:w-[25px] max-md:h-[45px] max-sm:w-[15px] max-sm:h-[30px] max-sm:mr-[10px]"></span>
          <h2 className="text-black text-[60px] font-bold max-md:text-[45px] max-sm:text-[28px]">
            Lifestyle
          </h2>
        </div>
        <Link
          href={'/category/3'}
          className="w-[100px] font-bold text-[20px] text-[#333] underline underline-[#333] underline-offset-4 max-sm:text-[15px] max-sm:text-[#ccc] max-sm:w-[70px]"
        >
          + MORE
        </Link>
      </div>

      {/* 라이프 스타일 상단 */}
      <div className="flex justify-center max-sm:flex-col-reverse cursor-pointer">
        <div
          className="bg-[#333] flex items-start justify-center flex-col w-[440px] h-[580px] pl-[20px] pr-[20px] overflow-hidden max-sm:h-[210px] max-sm:w-[100%] "
          onClick={() => router.push(`/articles/${articles[0].id}`)}
        >
          <span className="text-[25px] text-[#d7000f] font-bold max-sm:text-[15px]">
            {articles[0].subcategory}
          </span>

          <h2 className="text-[48px] text-white font-bold truncate w-[100%] mb-[20px] max-sm:text-[30px] max-sm:mb-[5px] max-sm:w-[100%] max-sm:truncate ">
            {articles[0].title}
          </h2>
          <p className=" text-[20px] text-white font-medium max-sm:text-[16px]">
            {articles[0].subtitle}
          </p>
        </div>

        <div className="w-[100%] h-[580px] mb-[20px] max-sm:mb-[0px] max-sm:w-full">
          <Image
            src={articles[0].image}
            alt={articles[0].title}
            width={840}
            height={470}
            priority
            className="h-[100%] w-[100%] object-cover mb-[20px] max-sm:mb-[0px]"
          />
        </div>
      </div>

      {/* 라이프 스타일 리스트 */}
      <ul className="flex justify-between flex-wrap gap-[10px] mt-[30px] mb-[30px] max-md:mt-[0px]">
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
                <strong className="w-[100%] text-[22px] text-[#d7000f] font-bold max-sm:text-[18px] max-sm:mt-[5px]">
                  {article.subcategory}
                </strong>
                <h2 className="w-[290px] leading-[30px] text-[#000] text-[24px] font-medium max-md:text-[20px] max-md:w-[240px] max-sm:w-[100%] max-sm:text-[18px] max-sm:truncate">
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
