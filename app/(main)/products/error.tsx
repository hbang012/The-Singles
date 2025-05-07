'use client';

import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

export default function error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  function reload() {
    // 오류를 캐치한 후 복구해야하므로 우선순위를 낮춰 에러 이후 실행되게함
    startTransition(() => {
      //  새로고침
      router.refresh();
      // 초기화
      reset();
    });
  }

  return (
    <div>
      <p>{error.message}로딩중 에러가 발생했으니 새로고침을 해주세요</p>
      <button type="button" className="btn" onClick={() => reload()}>
        다시 시도
      </button>
    </div>
  );
}
