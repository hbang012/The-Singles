// 아티클 리스트 페이지
'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect, useRef, useState } from 'react';

type Article = {
  id: number;
  title: string;
  content: string;
};

function BoldText({ text, keyword }: { text: string; keyword: string }) {
  const parts = text.split(new RegExp(`(${keyword})`, 'gi'));

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === keyword?.toLowerCase() ? (
          <b key={index}>{part}</b>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function Articles({
  searchParams,
}: {
  searchParams: Promise<{ search: string; page: string }>;
}) {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const paramsObj = use(searchParams);
  const [params] = useState(new URLSearchParams(paramsObj));
  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const { isPending, data, isError, error } = useQuery<{
    result: Article[];
    total: number;
  }>({
    queryKey: ['articles', page, paramsObj.search],
    queryFn: () => {
      return fetch(
        `http://localhost:9090/articles?page=${page}&search=${paramsObj.search}`
      ).then((res) => res.json());
    },
  });

  useEffect(() => {
    if (data) {
      setTotalPage(Math.ceil(data?.total / 5) || 0);
    }
  }, [data]);

  useEffect(() => {
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  }, [page]);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputRef?.current?.value) {
      params.set('search', inputRef.current.value);
    } else {
      params.delete('search');
    }
    router.push(`?${params.toString()}`);
    setPage(1);
  }

  return (
    <main className="p-[30px]">
      <h2 className="text-[26px] font-bold mb-[20px]">뉴스 기사</h2>
      <form onSubmit={handleSearch} className="flex">
        <input
          type="search"
          placeholder="검색어를 입력하세요"
          ref={inputRef}
          autoComplete="off"
          defaultValue={paramsObj.search}
          className="border border-gray-300 w-full"
        />
        <button type="submit" className="btn shrink-0">
          검색
        </button>
      </form>

      {isPending && <p>Loading....</p>}
      {isError && <p>{error.message}</p>}
      {data && data?.result?.length > 0 && (
        <ul className="space-y-[10px] mt-[20px] mb-[20px]">
          {data.result.map((article) => (
            <li key={article.id}>
              <Link href={`/articles/${article.id}`}>
                <BoldText text={article.title} keyword={paramsObj.search} />
              </Link>
            </li>
          ))}
        </ul>
      )}
      {!isPending && data?.result?.length === undefined && (
        <p className="text-gray-500 my-[40px] text-center">
          검색결과가 없습니다.
        </p>
      )}
      {/* 페이지네이션 추가 */}
      {/* {data && data?.result?.length > 0 && (
        <Pagination page={page} setPage={setPage} totalPage={totalPage} />
      )} */}
    </main>
  );
}
