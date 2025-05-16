'use client';

import { useQuery } from '@tanstack/react-query';
import { use } from 'react';
import type { Article } from '@/app/_lib/types';
import Image from 'next/image';

export default function Category({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsObj = use(params);
  // console.log(paramsObj.id);

  const { isPending, data, isError, error } = useQuery<{
    title: string;
    sub: string[];
    category: Article[];
  }>({
    queryKey: ['category', paramsObj.id],
    queryFn: () =>
      fetch(`http://localhost:9090/category/${paramsObj.id}`).then((res) =>
        res.json()
      ),
  });
  // console.log(data);

  return (
    <main className="h-[100%] w-[100%] max-w-[1320px] p-[0_20px_0_20px] mx-auto mt-[200px] mb-[145px]">
      <div className="flex justify-start items-center">
        <span className="w-[20px] h-[40px] bg-black"></span>
        <h2 className="text-[44px] text-black font-bold ml-[10px]">
          {data?.title}
        </h2>
      </div>
      <ul className="flex  mt-[16px]">
        {data?.sub.map((item) => (
          <li
            key={item}
            className="text-[22px] text-[#333]  mr-[60px] font-bold"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-[70px]">
        <ul className="flex flex-wrap">
          {data?.category.map((item) => (
            <li key={item.id}>
              <Image
                src={item.image}
                alt={item.title}
                width={1000}
                height={1000}
                priority
                className="w-[100%] h-[470px]"
              />
              <h2 className="text-black text-[16px] font-bold mt-[10px]">
                {item.subcategory}
              </h2>
              <p className="text-black text-[22px] ">{item.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
