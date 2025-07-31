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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchArticles(endpoint: string): Promise<Article[]> {
  const res = await fetch(`${API_BASE_URL}/articles/${endpoint}`);
  if (!res.ok) throw new Error(`${endpoint} 데이터 가져오기 실패`);
  return res.json();
}

export default async function Home() {
  const [
    latestData,
    allData,
    styleData,
    beautyData,
    lifestyleData,
    researchData,
    loveData,
  ] = await Promise.all([
    fetchArticles('latest'),
    fetchArticles(''),
    fetchArticles('style'),
    fetchArticles('beauty'),
    fetchArticles('lifestyle'),
    fetchArticles('research'),
    fetchArticles('love'),
  ]);

  return (
    <main className="pt-[100px] max-sm:pt-[90px]">
      <div className="bg-[#f2f2f2]">
        <div className="max-w-[1420px] mx-auto">
          <Suspense fallback={<p>로딩중...</p>}>
            <MainSlider data={allData} />
          </Suspense>
          <div className="max-w-[1320px] mx-auto mt-[84px] p-[0_20px_128px_20px]">
            <Suspense fallback={<p>로딩중...</p>}>
              <Today data={latestData} />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] w-full h-[753px] p-[0_20px] mt-[142px] mx-auto max-md:h-[20%] max-sm:mt-[30px] max-sm:p-0">
        <Suspense fallback={<p>로딩중...</p>}>
          <YoutubeSlider />
        </Suspense>
      </div>

      <div className="mt-[153px] max-w-[1320px] mx-auto max-sm:mt-[20px]">
        <Suspense fallback={<p>로딩중...</p>}>
          <Style data={styleData} />
        </Suspense>
      </div>

      <div className="bg-[#333] mt-[153px] max-w-[1320px] mx-auto max-sm:pt-[1px] max-sm:pb-[1px]">
        <Suspense fallback={<p>로딩중...</p>}>
          <Beauty data={beautyData} />
        </Suspense>
      </div>

      <div className="hidden max-sm:block">
        <div className="max-w-[1320px] mx-auto bg-[#f2f2f2] p-[50px] mt-[153px] max-md:p-[40px] max-sm:p-[30px] max-sm:mt-[0px]">
          <Horoscope />
        </div>
      </div>

      <div className="max-w-[1320px] w-full mx-auto bg-[#f2f2f2] p-[50px] mt-[153px] max-md:p-[40px] max-sm:p-[30px] max-sm:mt-[0px]">
        <Sns />
      </div>

      <div className="mt-[153px] max-w-[1320px] mx-auto max-sm:mt-[100px]">
        <Suspense fallback={<p>로딩중...</p>}>
          <Lifestyle data={lifestyleData} />
        </Suspense>
      </div>

      <div className="pl-[12%] pr-[12%] max-sm:p-0">
        <div className="mt-[153px] w-full max-sm:mt-[100px]">
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
          <div className="max-w-[1320px] mx-auto max-sm:pb-[10px]">
            <Submail />
          </div>
        </Suspense>
      </div>
    </main>
  );
}
