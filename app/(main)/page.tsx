import { Suspense } from 'react';
import { Article } from '@/app/_lib/types';
import MainSlider from '@/app/componets/home/MainSlider';
import Today from '@/app/componets/home/Today';
import YoutubeSlider from '@/app/componets/home/YoutubeSlider';
import Style from '@/app/componets/home/Style';
import Beauty from '@/app/componets/home/Beauty';
import Sns from '@/app/componets/home/Sns';
import Lifestyle from '@/app/componets/home/Lifestyle';
import Horoscope from '@/app/componets/home/Horoscope';
import Research from '@/app/componets/home/Research';
import Love from '@/app/componets/home/Love';
import Submail from '@/app/componets/home/Submail';

// 투데이 최신
export async function getArticles(): Promise<Article[]> {
  const res = await fetch('http://localhost:9090/articles/latest');

  if (!res.ok) {
    throw new Error('데이터 가져오기 실패');
  }

  return res.json();
}

// 스타일
export async function getStyleArticles(): Promise<Article[]> {
  const res = await fetch('http://localhost:9090/articles/style');

  if (!res.ok) {
    throw new Error('Style 아티클 데이터를 가져오는 데 실패했습니다.');
  }

  return res.json();
}

const styleData = getStyleArticles();

// 뷰티
export async function getBeautyArticles(): Promise<Article[]> {
  const res = await fetch('http://localhost:9090/articles/beauty');

  if (!res.ok) {
    throw new Error('beauty 아티클 데이터를 가져오는 데 실패했습니다.');
  }

  return res.json();
}
const beautyData = getBeautyArticles();

// 라이프 스타일
export async function getLifestyleArticles(): Promise<Article[]> {
  const res = await fetch('http://localhost:9090/articles/lifestyle');

  if (!res.ok) {
    throw new Error('lifestyle 아티클 데이터를 가져오는 데 실패했습니다.');
  }

  return res.json();
}

const lifestyleData = getLifestyleArticles();

// 리서치
export async function getResearchArticles(): Promise<Article[]> {
  const res = await fetch('http://localhost:9090/articles/research');

  if (!res.ok) {
    throw new Error('research 아티클 데이터를 가져오는 데 실패했습니다.');
  }

  return res.json();
}

const researchData = getResearchArticles();

// 러브
export async function getLoveArticles(): Promise<Article[]> {
  const res = await fetch('http://localhost:9090/articles/love');

  if (!res.ok) {
    throw new Error('love 아티클 데이터를 가져오는 데 실패했습니다.');
  }

  return res.json();
}

const loveData = getLoveArticles();

export default function Home() {
  const latestdata = getArticles();

  async function ArticleData() {
    const res = await fetch('http://localhost:9090/articles');

    if (!res.ok) {
      throw new Error('데이터 가져오기 에러');
    }

    return res.json();
  }
  const data = ArticleData();

  return (
    <main className="flex flex-col justify-center w-[100%]">
      <div className="bg-[#f2f2f2]">
        <div className="max-w-[1420px] mx-auto">
          <div className="h-full">
            <Suspense fallback={<p>로딩중...</p>}>
              <MainSlider data={data} />
            </Suspense>
          </div>

          <div className="h-[100%] mt-[84px] p-[0_20px_128px_20px]">
            <Suspense fallback={<p>로딩중...</p>}>
              <Today data={latestdata} />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] w-[100%] h-[753px] p-[0_20px] mt-[142px] mx-auto max-md:h-[20%] max-sm:mt-[30px]">
        <Suspense fallback={<p>로딩중...</p>}>
          <YoutubeSlider />
        </Suspense>
      </div>

      <div className="mt-[153px] max-w-[1320px] mx-auto max-sm:w-[100%] max-sm:mt-[20px]">
        <Suspense fallback={<p>로딩중...</p>}>
          <Style data={styleData} />
        </Suspense>
      </div>

      <div className="bg-[#333] mt-[153px] max-w-[1320px] mx-auto max-sm:mt-[20px] max-sm:mx-0">
        <Suspense fallback={<p>로딩중...</p>}>
          <Beauty data={beautyData} />
        </Suspense>
      </div>

      <div className="hidden max-sm:block">
        <div className="max-w-[1320px] mx-auto bg-[#f2f2f2] p-[50px] mt-[153px] max-md:p-[40px] max-sm:p-[30px] max-sm:mt-[0px]">
          <Horoscope />
        </div>
      </div>

      <div className="max-w-[1320px] w-[100%] mx-auto bg-[#f2f2f2] p-[50px] mt-[153px] max-md:p-[40px] max-sm:p-[30px] max-sm:mt-[0px]">
        <Sns />
      </div>

      <div className="mt-[153px] max-w-[1320px] mx-auto max-sm:w-[100%] max-sm:mt-[20px]">
        <Suspense fallback={<p>로딩중...</p>}>
          <Lifestyle data={lifestyleData} />
        </Suspense>
      </div>

      <div className="pl-[12%] pr-[12%] max-sm:p-0">
        <div className="mt-[153px] w-[100%]  max-sm:w-[100%] max-sm:mt-[20px]">
          <Suspense fallback={<p>로딩중...</p>}>
            <Research data={researchData} />
          </Suspense>
        </div>
      </div>

      <div className="bg-[#333] mt-[153px] max-sm:mt-[0px]">
        <Suspense fallback={<p>로딩중...</p>}>
          <div className="max-w-[1320px] mx-auto">
            <Love data={loveData} />
          </div>
        </Suspense>
      </div>

      <div className="bg-[#d7000f]">
        <Suspense fallback={<p>로딩중...</p>}>
          <div className="max-w-[1320px] m-auto">
            <Submail />
          </div>
        </Suspense>
      </div>
    </main>
  );
}
