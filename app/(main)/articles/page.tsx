// 아티클 리스트 페이지
'use client';

// import Pagination from '@/app/ui/Pagination';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect, useRef, useState } from 'react';

// 위에서 타입을 잡아줌
type Article = {
  id: number;
  title: string;
  content: string;
};

// 볼드처리 함수 : b를 감아서
function BoldText({ text, keyword }: { text: string; keyword: string }) {
  // console.log(text, keyword);
  // 키워드 기준으로 분리 시킨다
  // 정규표현식 (new RegExp(`(${keyword})`, 'gi'))
  // split 사용시 왜 정규표현을 써야하는가 ,
  // split후 기준문자가 포함되려면 정규표현식 그룹 () 사용
  // 정규표현식 내부에 변수사용시 RegExp 객체 사용
  // gi는 옵션이며 g는 글로벌(global) i는 이그노어 케이스(ignore case)
  // g: 문자열 전체 검색 | i : 대소문자구분안함
  const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
  // console.log(parts);

  // split된 문자 배열중 검색어와 같으면 <b>로 감아주고 아니면 그냥 리턴
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
  // 프라미스 해제된 검색파라메터 객체를 URLSearchParams의 넣어줌/인스턴스로 복제
  const paramsObj = use(searchParams);
  const [params] = useState(new URLSearchParams(paramsObj));
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 경로에 관련된 동작
  const router = useRouter();
  // console.log(paramsObj.search);

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

  // data 변경시 totalpage 계산
  useEffect(() => {
    if (data) {
      setTotalPage(Math.ceil(data?.total / 5) || 0);
    }
  }, [data]);

  // 페이지 변경시 쿼리 파라미터 추가
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
                {/* BoldText 컴퍼런트라서 리턴값이 있어야함 */}
                <BoldText text={article.title} keyword={paramsObj.search} />
              </Link>
            </li>
          ))}
        </ul>
      )}
      {/* 검색하곤 상관없음 로딩후의 영역 */}
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
