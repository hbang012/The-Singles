import Product from '@/app/ui/product-reviews/Product';
import Reviews from '@/app/ui/product-reviews/Reviews';
import { Suspense } from 'react';

// 순차적으로 로딩 Suspense
export default function ProductReviews() {
  return (
    <main className="p-[30px]">
      <h2 className="text-[26px] font-bold mb-[20px]">product reviews</h2>
      <Suspense fallback={<p>제품 리스트 로딩...</p>}>
        <Product />
        <Suspense fallback={<p>리뷰 로딩...</p>}>
          <Reviews />
        </Suspense>
      </Suspense>
    </main>
  );
}
