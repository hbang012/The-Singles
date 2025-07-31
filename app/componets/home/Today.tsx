'use client';

import { Article } from '@/app/_lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Today({ data }: { data: Article[] }) {
  const articles = data ?? [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  return (
    <div className="flex flex-col mt-[35px] w-full">
      <div className="w-full flex items-center justify-start">
        <span className="bg-black w-[28px] h-[56px] mr-[15px] max-md:w-[25px] max-md:h-[45px] max-sm:w-[14px] max-sm:h-[30px] max-sm:mr-[10px]"></span>
        <h2 className="text-black text-[60px] font-bold max-md:text-[45px] cursor-default max-sm:text-[28px]">
          Today
        </h2>
      </div>

      <ul className="flex justify-center gap-[30px] mt-[30px] max-md:gap-[20px] max-sm:flex-wrap">
        {articles.length > 0 &&
          articles.map((article) => (
            <li
              key={article.id}
              className="flex flex-col w-[25%] max-sm:w-[calc(50%-10px)]"
            >
              <Link href={`/articles/${article.id}`} className="block">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={540}
                    height={675}
                    priority={true}
                    className="w-[100%] object-cover"
                  />
                </div>
                <strong
                  className={`block text-[16px] font-bold text-[#d7000f] mt-[10px]`}
                >
                  {article.subcategory || 'today'}
                </strong>
                <h2 className="leading-[30px] text-black text-[24px] font-medium max-md:text-[20px] mt-[10px]">
                  {article.title}
                </h2>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
