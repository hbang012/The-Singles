import { Suspense } from 'react';
import { Article } from '@/app/_lib/types';
import MainSlider from '@/app/componets/home/MainSlider';
import Today from '@/app/componets/home/Today';
import YoutubeSlider from '@/app/componets/home/YoutubeSlider';
import Style from '@/app/componets/home/Style';

export async function getArticles(): Promise<Article[]> {
  const res = await fetch('http://localhost:9090/articles/latest');

  if (!res.ok) {
    throw new Error('데이터 가져오기 실패');
  }

  return res.json();
}

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
    <main className="flex flex-col w-[100%]">
      <div className="bg-[#f2f2f2]">
        <div className="max-w-[1420px] m-auto">
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

      <div className="max-w-[80%] h-[753px] p-[0_20px] mt-[142px] m-auto max-sm:max-w-[100%] ">
        <Suspense fallback={<p>로딩중...</p>}>
          <YoutubeSlider />
        </Suspense>
      </div>

      <div className="mt-[153px] max-w-[1420px] m-auto">
        <Style />
      </div>
    </main>
  );
}
