'use client';

import { Article } from '@/app/_lib/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function Today({ data }: { data: Promise<Article[]> }) {
  const articles = use(data);
  const router = useRouter();

  return (
    <div className="pl-[25px] pr-[25px]">
      <div className="flex flex-col mt-[35px] w-full">
        <div className="w-full flex items-center justify-start">
          <span className="bg-black w-[28px] h-[56px] mr-[15px] max-md:w-[25px] max-md:h-[45px]"></span>
          <h2 className="text-black text-[60px] font-bold max-md:text-[45px] cursor-default">
            Today
          </h2>
        </div>

        <ul className="flex justify-center flex-wrap gap-[30px] mt-[30px] max-md:gap-[20px]">
          {articles.length > 0 &&
            articles.map((article) => (
              <li
                key={article.id}
                className="flex flex-col gap-4 w-[290px] max-md:w-[220px] cursor-pointer"
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  width={540}
                  height={675}
                  priority={true}
                  className="h-[290px] w-[290px] object-cover mb-[20px] max-md:h-[220px] max-md:w-[220px]"
                  onClick={() => router.push(`/articles/${article.id}`)}
                />
                <strong
                  className={`w-[290px] text-[16px] font-bold max-md:w-[220px] text-[#d7000f]`}
                >
                  {article.subcategory || 'today'}
                </strong>
                <h2 className="w-[290px] leading-[30px] text-black text-[24px] font-medium max-md:text-[20px] max-md:w-[220px]">
                  {article.title}
                </h2>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
