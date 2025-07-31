'use client';

import { Article } from '@/app/_lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = { data?: Article[] };

export default function Lifestyle({ data }: Props) {
  // data가 배열인지 확인하고, 빈 배열로 초기화
  const articles = Array.isArray(data) ? data.filter(Boolean) : [];
  const router = useRouter();

  // 상단 대표 콘텐츠와 리스트용 슬라이스
  const topArticle = articles[0];
  const listArticles = articles.slice(1, 4);

  // 데이터가 전혀 없으면 안내 메시지
  if (!articles.length) {
    return (
      <div className="p-[0_20px]">
        <p className="text-center text-[#666] mt-[40px]">
          라이프스타일 콘텐츠가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="p-[0_20px]">
      {/* 헤더 */}
      <div className="flex justify-center items-center max-sm:mb-[10px]">
        <div className="w-[100%] flex items-center">
          <span className="bg-black w-[28px] h-[56px] mr-[15px] max-md:w-[25px] max-md:h-[45px] max-sm:w-[15px] max-sm:h-[30px] max-sm:mr-[10px]" />
          <h2 className="text-black text-[60px] font-bold max-md:text-[45px] max-sm:text-[28px] cursor-default">
            Lifestyle
          </h2>
        </div>
        <Link
          href="/category/3"
          onClick={() => window.scrollTo(0, 0)}
          className="w-[100px] font-bold text-[20px] text-[#333] underline underline-[#333] underline-offset-4 max-sm:text-[15px] max-sm:text-[#ccc] max-sm:w-[70px] max-[340px]:text-[14px]"
        >
          + MORE
        </Link>
      </div>

      {/* 상단 대표 콘텐츠 */}
      <div className="flex justify-center max-sm:flex-col-reverse cursor-pointer">
        {topArticle?.id && (
          <div
            className="bg-[#333] flex items-start justify-center flex-col w-[440px] h-[580px] pl-[20px] pr-[20px] overflow-hidden max-sm:h-[210px] max-sm:w-[100%]"
            onClick={() => router.push(`/articles/${topArticle.id}`)}
          >
            <span className="text-[25px] text-[#d7000f] font-bold max-sm:text-[15px]">
              {topArticle.subcategory}
            </span>
            <h2 className="text-[48px] text-white font-bold truncate w-[100%] mb-[20px] max-sm:text-[30px] max-sm:mb-[5px]">
              {topArticle.title}
            </h2>
            <p className="text-[20px] text-white font-medium max-sm:text-[16px]">
              {topArticle.subtitle}
            </p>
          </div>
        )}

        {topArticle?.image && (
          <div className="w-[100%] h-[580px] mb-[20px] max-sm:mb-0 max-sm:w-full max-sm:h-[372px]">
            <Image
              src={topArticle.image}
              alt={topArticle.title}
              width={840}
              height={470}
              priority
              className="h-[100%] w-[100%] object-cover mb-[20px] max-sm:mb-0"
            />
          </div>
        )}
      </div>

      {/* 리스트 콘텐츠 (2~4번째 아이템) */}
      {listArticles.length > 0 && (
        <ul className="flex justify-between flex-wrap gap-[10px] mt-[30px] mb-[30px] max-md:mt-0">
          {listArticles.map((article) => (
            <li
              key={article.id}
              className="flex flex-col gap-[10px] w-[32%] max-[555px]:w-full max-sm:gap-[5px]"
              onClick={() =>
                article.id && router.push(`/articles/${article.id}`)
              }
            >
              {article.image && (
                <Image
                  src={article.image}
                  alt={article.title}
                  width={540}
                  height={675}
                  priority
                  className="h-[470px] w-[100%] object-cover cursor-pointer mb-[10px] max-sm:h-[200px] max-sm:mb-0 max-sm:mt-[28px]"
                />
              )}
              <strong className="text-[22px] text-[#d7000f] font-bold max-sm:text-[18px] max-sm:mt-[5px]">
                {article.subcategory}
              </strong>
              <h2 className="leading-[30px] text-[#000] text-[24px] font-medium max-md:text-[20px] max-md:w-[240px] max-sm:w-[100%] max-sm:text-[18px] max-sm:truncate">
                {article.title}
              </h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
