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
  const [articleData, setArticleData] = useState<Article[] | undefined>([]);

  const { isPending, data, isError, error } = useQuery({
    queryKey: ['articles', id],
    queryFn: () =>
      fetch(`http://localhost:9090/articles/${id}`).then((res) => {
        return res.json();
      }),
  });

  useEffect(() => {
    if (data) {
      setArticleData(data);
    }
  }, [data]);

  // 카테고리 데이타 불러오기
  const {
    data: categoryData,
    isPending: isCategoryPending,
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
  const categoryId = data?.categoryId;

  return (
    <main className="mt-[200px] h-[100%] max-w-[1280px] mx-auto p-[0_20px]">
      <ul className="flex items-center gap-[5px] border-b-1 border-[#bfbfbf] ">
        <li
          className="mb-[20px] font-bold text-[16px] text-[#bfbfbf] hover:text-[#fcd200] cursor-pointer"
          onClick={() => router.push('/')}
        >
          HOME
        </li>
        <li className="mb-[20px]">
          <Image
            src="/arrow-lite.png"
            alt=""
            width={24}
            height={24}
            className="w-[20px] h-[20px]"
          />
        </li>
        <li
          className="mb-[20px] font-bold text-[16px] text-[#bfbfbf] hover:text-[#fcd200] cursor-pointer"
          onClick={() => router.push(`/category/${categoryId}`)}
        >
          {categoryName}
        </li>
        <li className="mb-[20px]">
          <Image
            src="/arrow-lite.png"
            alt=""
            width={24}
            height={24}
            className="w-[20px] h-[20px]"
          />
        </li>
        <li
          className="mb-[20px] font-bold text-[16px] text-[#bfbfbf] hover:text-[#fcd200] cursor-pointer"
          onClick={() => {
            if (data?.subcategory) {
              router.push(
                `/category/${data?.categoryId}?subcategory=${data.subcategory}`
              );
            } else {
              console.warn('서브 카테고리 값이 없습니다.');
            }
          }}
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
          <p className="text-[#9f9f9f] text-[14px]">
            <span className="mr-[5px] max-sm:text-[12px]">BY 에디터</span>
            {data?.editor}
          </p>
          <span className="w-[1px] h-[15px] bg-[#9f9f9f]"></span>
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
              priority
              className="rounded-[10px] w-[100%] h-[500px] object-cover"
            />
          ) : (
            <p className="font-bold text-[20px] ">
              이미지를 불러올 수 없습니다.
            </p>
          )}
          <p className="h-[300px] mt-[50px] text-[18px] text-black leading-[24px] max-sm:text-[15px]">
            당신의 감각을 깨우는 단 하나의 콘텐츠, 싱글즈. 일상 속 작은 순간부터
            전 세계 트렌드까지, 지금 가장 빛나는 이야기들을 모아 한 편의
            아티클로 전합니다. 새로운 시선을 제안하고, 익숙한 것들에 깊이를
            더하며, 오직 당신만을 위한 감성적인 인사이트를 선사합니다. 스타일,
            뷰티, 라이프, 그리고 사랑에 이르기까지— 이 페이지에 담긴 모든 단어는
            당신의 내일을 조금 더 특별하게 만들어 줄 거예요. 지금, 싱글즈와 함께
            삶의 디테일을 다시 들여다보세요.
            <span className="font-bold">에디터 {data?.editor}</span>
          </p>
        </div>
        <p className="text-start font-bold text-[14px] text-[#9f9f9f] mb-[30px] cursor-default">
          사진제공
          <span className="ml-[30px] font-normal">{data?.photoCredit}</span>
        </p>

        {/* 태그 */}
        <div className="flex flex-col text-center">
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
                src="/favorite.png"
                alt="좋아요"
                width={60}
                height={60}
                className="w-[40px] h-[40px] cursor-pointer"
              />
              <span className="text-[15px] ml-[10px] cursor-default">
                {data?.likes}
              </span>
            </div>

            <div className="flex gap-[20px] ">
              <Image
                src="/Share.svg"
                alt="공유"
                width={20}
                height={22}
                className="w-[26px] h-[26px] cursor-pointer"
              />
              <Image
                src="/iTwitter.svg"
                alt="트위터"
                width={22}
                height={18}
                className="w-[26px] h-[26px] cursor-pointer"
              />
              <Image
                src="/iChatDark.svg"
                alt="카카오"
                width={21}
                height={20}
                className="w-[26px] h-[26px] cursor-pointer"
              />
              <Image
                src="/iFacebookDark.svg"
                alt="페이스북"
                width={11}
                height={18}
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
