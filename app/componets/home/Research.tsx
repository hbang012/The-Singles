'use client';

import { Article } from '@/app/_lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';

export default function Research({ data }: { data: Promise<Article[]> }) {
  const article = use(data) ?? [];

  // 최신 'Do&Don’t' 아티클
  const latestArticle = article
    .filter((item) => item.subcategory === 'Do&Don’t')
    .sort(
      (a, b) =>
        new Date(b.closeDate).getTime() - new Date(a.closeDate).getTime()
    )
    .at(0);

  const [doWidth, setDoWidth] = useState('0%');
  const [dontWidth, setDontWidth] = useState('0%');

  useEffect(() => {
    if (latestArticle?.do) {
      setDoWidth(`${latestArticle.do}%`);
    }
    if (latestArticle?.dont) {
      setDontWidth(`${latestArticle.dont}%`);
    }
  }, [latestArticle]);

  return (
    <div className="">
      <div className="flex justify-center items-center max-sm:mb-[10px]">
        <div className="w-full flex items-center max-sm:ml-[20px]">
          <span className="bg-black w-[28px] h-[56px] mr-[15px] max-md:w-[25px] max-md:h-[45px] max-sm:w-[15px] max-sm:h-[30px] max-sm:mr-[10px]"></span>
          <h2 className="text-black text-[60px] font-bold max-md:text-[45px] max-sm:text-[28px]">
            Research
          </h2>
        </div>
        <Link
          href={`/research?subcategory=canDo`}
          onClick={() => window.scrollTo(0, 0)}
          className="w-[100px] font-bold text-[20px] text-[#333] underline underline-[#333] underline-offset-4 max-sm:text-[15px] max-sm:text-[#ccc] max-sm:w-[70px]"
        >
          + MORE
        </Link>
      </div>

      {latestArticle && (
        <div className="flex flex-row max-sm:flex-col">
          <div className="w-[100%] h-[580px] max-sm:mb-[0px] max-sm:w-full">
            <Image
              src={latestArticle.image}
              alt={latestArticle.title}
              width={620}
              height={400}
              priority
              className="h-[100%] w-[100%] object-cover mb-[20px] max-sm:mb-[0px] bg-amber-300"
            />
          </div>

          {/* 투표 데이터 */}
          <div className="bg-[#333] w-[50%] h-[580px] p-[0_40px_0_40px] flex flex-col gap-[20px] pt-[20px] max-sm:w-[100%] max-sm:items-center max-sm:justify-center max-sm:h-[332px] max-sm:gap-0 max-sm:p-[0_30px_0_30px] max-sm:pt-[0px]">
            <span className="text-[#d7000f] text-[16px] mt-[10px] max-sm:text-[10px]">
              {new Date() > new Date(latestArticle.closeDate)
                ? ' 투표 종료'
                : '진행중'}
            </span>
            <p className="text-[14px] text-[#999] font-bold max-sm:text-[14px]">
              {latestArticle.openDate} <span>~</span> {latestArticle.closeDate}
            </p>
            <h2 className="text-[30px] text-white font-bold mb-[20px] max-md:line-clamp-6 max-sm:text-[16px] leading-[1.2] max-sm:pl-[20px] max-sm:pr-[20px] max-sm:mt-[10px]">
              {latestArticle.title}
            </h2>

            <div className="text-center">
              {/* 투표 그래프 */}
              <div className="relative flex justify-between mb-[60px] max-sm:mb-[50px]">
                <div
                  className=" bg-[#b3935c] text-[16px] text-[#fff] rounded-tl-[5px] rounded-bl-[5px] h-[35px] max-sm:h-[24px]"
                  style={{ width: doWidth }}
                >
                  <p className="absolute top-[5px] left-[10px] max-sm:top-[1px] max-sm:text-[12px] max-sm:mt-[3px] ">
                    {latestArticle.do} %
                  </p>
                  <p className="text-[#b3935c] text-[16px] mt-[40px]">DO</p>
                </div>

                <div
                  className="bg-[#999] text-[16px] text-[#fff] rounded-tr-[5px] rounded-br-[5px] h-[35px] max-sm:h-[24px]"
                  style={{ width: dontWidth }}
                >
                  <p className="absolute top-[5px] right-[10px] max-sm:top-[1px]  max-sm:text-[12px] max-sm:mt-[3px]">
                    {latestArticle.dont} %
                  </p>
                  <p className="text-[#999] text-[16px] mt-[40px] ml-[60%]">
                    DON'T
                  </p>
                </div>
              </div>
              <button className="btn border-0 bg-white w-[180px] h-[50px] rounded-[5px] text-[16px] text-black max-sm:h-[40px] max-sm:mt-[15px]">
                {new Date() > new Date(latestArticle.closeDate)
                  ? '결과보기'
                  : '투표하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
