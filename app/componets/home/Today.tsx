'use client';

import Image from 'next/image';

export type Article = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  subcategory: string;
};

export default function Today({ articles }: { articles: Article[] }) {
  return (
    <div className="flex flex-wrap mt-[35px]">
      <div className="flex items-center">
        <span className="bg-black w-[28px] h-[56px] mr-[15px]"></span>
        <h2 className="text-black text-[60px] font-bold">Today</h2>
      </div>

      <div>
        {articles.length > 0 &&
          articles?.map((article) => (
            <ul key={article.id} className="w-[25%] max-w-[calc(100%-40px)]">
              <li className="">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={540}
                  height={675}
                  priority
                  className="w-full h-full object-cover"
                />
                <strong className="text-[16px] text-[#d7000f] font-bold ">
                  {article.subcategory}
                </strong>
                <h2 className="text-black text-[24px] font-medium">
                  {article.title}
                </h2>
              </li>
            </ul>
          ))}
      </div>
    </div>
  );
}
