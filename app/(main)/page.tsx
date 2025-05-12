import MainSlider from '@/app/componets/home/MainSlider';
import Today from '@/app/componets/home/Today';

export type Article = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  subcategory: string;
};

export default async function Home() {
  const res = await fetch('http://localhost:9090/articles');

  if (!res.ok) {
    throw new Error('데이터 가져오기 에러');
  }

  const data: Article[] = await res.json();

  return (
    <main className="flex flex-col w-[100%]">
      <div className="bg-[#f2f2f2]">
        <div className="max-w-[1420px] m-auto">
          <div className="h-full">
            <MainSlider articles={data} />
          </div>

          <div className="h-[927px] mt-[84px] p-[0_20px_128px_20px]">
            <Today articles={data} />
          </div>

          <div className="max-w-[1320px] p-[0_20px]"></div>
        </div>
      </div>
    </main>
  );
}
