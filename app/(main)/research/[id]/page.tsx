// 리서치 상세 페이지

'use client';

import { Article } from '@/app/_lib/types';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

export default function ResearchDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [articleData, setArticleData] = useState<Article[] | undefined>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isPending, data, isError, error } = useQuery({
    queryKey: ['articles', id],
    queryFn: () =>
      fetch(`http://localhost:9090/articles/${id}`).then((res) => {
        return res.json();
      }),
  });

  // 카테고리 데이타 불러오기
  const {
    data: categoryData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isPending: isCategoryPending,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isError: isCategoryError,
  } = useQuery({
    queryKey: ['categoryMeta', data?.categoryId],
    queryFn: async () => {
      if (!data?.categoryId) return null;
      const response = await fetch(
        `http://localhost:9090/category/${data.categoryId}`
      );
      return response.json();
    },
    enabled: !!data?.categoryId,
  });

  const categoryName = categoryData?.title ?? '카테고리 없음';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const categoryId = data?.categoryId;

  // 리서치 데이타 불러오기
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isPending: isResearchPending,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: researchData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isError: isResearchError,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error: researchError,
  } = useQuery({
    queryKey: ['researchDetail', id],
    queryFn: () =>
      fetch(`http://localhost:9090/research/${id}`).then((res) => res.json()),
  });

  useEffect(() => {
    if (data) {
      setArticleData(data);
    }
  }, [data]);

  return (
    <main
      className="mt-[200px] h-[100%] max-w-[1280px] mx-auto p-[0_20px]"
      onClick={() => window.scrollTo(0, 0)}
    >
      <ul className="flex items-center gap-[5px] border-b-1 border-[#bfbfbf] ">
        <li
          className="mb-[20px] font-bold text-[16px] text-[#bfbfbf] hover:text-[#fcd200] cursor-pointer"
          onClick={() => router.push('/')}
        >
          HOME
        </li>
        <li className="mb-[20px]">
          <Image
            src="/icons/arrow-lite.png"
            alt=""
            width={24}
            height={24}
            priority={true}
            className="w-[20px] h-[20px]"
          />
        </li>
        <li
          className="mb-[20px] font-bold text-[16px] text-[#bfbfbf] hover:text-[#fcd200] cursor-pointer"
          onClick={() => router.push(`/research?subcategory=canDo`)}
        >
          {categoryName}
        </li>
        <li className="mb-[20px]">
          <Image
            src="/icons/arrow-lite.png"
            alt=""
            width={24}
            height={24}
            priority={true}
            className="w-[20px] h-[20px]"
          />
        </li>
        <li
          className="mb-[20px] font-bold text-[16px] text-[#bfbfbf] hover:text-[#fcd200] cursor-pointer"
          onClick={() => router.back()}
        >
          {data && data?.subcategory}
        </li>
      </ul>

      {/* 상단제목 */}
      <div className="max-w-[840px] mx-auto mt-[50px]">
        <h2 className="mb-[20px]  mt-[10px] text-black text-[32px] font-bold max-sm:text-[26px] ">
          {data?.title}
        </h2>
        <p className="mb-[35px] text-black text-[18px] max-sm:text-[14px]">
          {data?.subtitle}
        </p>
        <div className="flex items-center gap-[10px]">
          <p className="text-[#9f9f9f] text-[14px]">{data?.done}</p>
          <span className="w-[1px] h-[15px] bg-[#9f9f9f]"></span>
          <p className="text-[#9f9f9f] text-[14px]">
            {data?.openDate}
            <span>~</span> {data?.closeDate}
          </p>
          <p className="text-[#9f9f9f] text-[14px]">{data?.date}</p>
        </div>

        {/* 내용 */}
        <div className="flex flex-wrap justify-center items-center mt-[98px] h-[100%] ">
          {data?.image ? (
            <Image
              src={data?.image}
              alt={data?.title}
              width={1000}
              height={1000}
              priority={true}
              className="rounded-[10px] w-[100%] h-[500px] object-cover"
            />
          ) : (
            <p className="font-bold text-[20px] ">
              이미지를 불러올 수 없습니다.
            </p>
          )}
        </div>

        {/* 태그 */}
        <div className="flex flex-col text-center mt-[30px]">
          <ul className="flex items-center ">
            <li className="">
              {data?.tags.map((tag: string) => (
                <button
                  type="button"
                  key={tag}
                  className="btn mr-[15px] border-0 bg-[#bfbfbf] rounded-[30px] text-[12px] text-white"
                >
                  {tag}
                </button>
              ))}
            </li>
          </ul>

          <div className="flex justify-between gap-[50%] border-b-1 border-[#9f9f9f] mt-[50px]">
            <div className="flex items-center mb-[10px]">
              <Image
                src="/icons/favorite.png"
                alt="좋아요"
                width={60}
                height={60}
                priority={true}
                className="w-[40px] h-[40px] cursor-pointer"
              />
              <span className="text-[15px] ml-[10px] cursor-default">
                {data?.likes}
              </span>
            </div>

            <div className="flex gap-[20px] ">
              <Image
                src="/icons/Share.svg"
                alt="공유"
                width={20}
                height={22}
                priority={true}
                className="w-[26px] h-[26px] cursor-pointer"
              />
              <Image
                src="/icons/iTwitter.svg"
                alt="트위터"
                width={22}
                height={18}
                priority={true}
                className="w-[26px] h-[26px] cursor-pointer"
              />
              <Image
                src="/icons/iChatDark.svg"
                alt="카카오"
                width={21}
                height={20}
                priority={true}
                className="w-[26px] h-[26px] cursor-pointer"
              />
              <Image
                src="/icons/iFacebookDark.svg"
                alt="페이스북"
                width={11}
                height={18}
                priority={true}
                className="w-[26px] h-[26px] cursor-pointer"
              />
            </div>
          </div>
          <div className="m-[50px_0_95px_0]">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn h-[56px] w-[148px] rounded-[5px] bg-[#333] text-white text-[15px] m-[14px_58px]"
            >
              목록보기
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
