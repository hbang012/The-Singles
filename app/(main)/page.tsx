// app/(main)/page.tsx

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
const isDev = process.env.NODE_ENV === 'development';

// API 호출 실패 시 또는 환경 변수 미설정 시 사용할 빈 배열
const fallbackData: Article[] = [];

async function fetchArticles(endpoint?: string): Promise<Article[]> {
  // API_BASE_URL 없으면 무조건 mock
  if (!API_BASE_URL) {
    console.warn('API_BASE_URL not defined, using fallbackData');
    return fallbackData;
  }

  // 개발 환경에서는 mock만 사용 (원한다면 여길 반대로 바꿔도 됩니다)
  if (isDev) {
    return fallbackData;
  }

  // 배포 환경: 실제 API 호출
  const path = endpoint ? `/articles/${endpoint}` : `/articles`;
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.error(`Error fetching ${endpoint || 'all'}:`, res.statusText);
      return fallbackData;
    }
    const data = await res.json();
    return Array.isArray(data) ? data : fallbackData;
  } catch (err) {
    console.error(`fetchArticles error (${endpoint || 'all'}):`, err);
    return fallbackData;
  }
}

export default async function Home() {
  // 모든 섹션 데이터를 병렬로 불러옵니다
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
    fetchArticles(),
    fetchArticles('style'),
    fetchArticles('beauty'),
    fetchArticles('lifestyle'),
    fetchArticles('research'),
    fetchArticles('love'),
  ]);

  return (
    <main className="pt-[100px] max-sm:pt-[90px]">
      {/* 메인 슬라이더 */}
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

      {/* 유튜브 슬라이더 */}
      <div className="max-w-[1320px] w-full h-[753px] p-[0_20px] mt-[142px] mx-auto max-md:h-[20%] max-sm:mt-[30px] max-sm:p-0">
        <Suspense fallback={<p>로딩중...</p>}>
          <YoutubeSlider />
        </Suspense>
      </div>

      {/* 스타일 섹션 */}
      <div className="mt-[153px] max-w-[1320px] mx-auto max-sm:mt-[20px]">
        <Suspense fallback={<p>로딩중...</p>}>
          <Style data={styleData} />
        </Suspense>
      </div>

      {/* 뷰티 섹션 */}
      <div className="bg-[#333] mt-[153px] max-w-[1320px] mx-auto max-sm:pt-[1px] max-sm:pb-[1px]">
        <Suspense fallback={<p>로딩중...</p>}>
          <Beauty data={beautyData} />
        </Suspense>
      </div>

      {/* 모바일 전용 운세 섹션 */}
      <div className="hidden max-sm:block">
        <div className="max-w-[1320px] mx-auto bg-[#f2f2f2] p-[50px] mt-[153px] max-md:p-[40px] max-sm:p-[30px] max-sm:mt-0">
          <Horoscope />
        </div>
      </div>

      {/* SNS 섹션 */}
      <div className="max-w-[1320px] w-full mx-auto bg-[#f2f2f2] p-[50px] mt-[153px] max-md:p-[40px] max-sm:p-[30px] max-sm:mt-0">
        <Sns />
      </div>

      {/* 라이프스타일 섹션 */}
      <div className="mt-[153px] max-w-[1320px] mx-auto max-sm:mt-[100px]">
        <Suspense fallback={<p>로딩중...</p>}>
          <Lifestyle data={lifestyleData} />
        </Suspense>
      </div>

      {/* 리서치 섹션 */}
      <div className="pl-[12%] pr-[12%] max-sm:p-0">
        <div className="mt-[153px] w-full max-sm:mt-[100px]">
          <Suspense fallback={<p>로딩중...</p>}>
            <Research data={researchData} />
          </Suspense>
        </div>
      </div>

      {/* 러브 섹션 */}
      <div className="bg-[#333] mt-[153px] max-sm:mt-0">
        <Suspense fallback={<p>로딩중...</p>}>
          <div className="max-w-[1320px] mx-auto">
            <Love data={loveData} />
          </div>
        </Suspense>
      </div>

      {/* 구독 섹션 */}
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
