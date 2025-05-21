import { http, HttpResponse } from 'msw';
import categorys from './category.json';
import articles from './articles.json';

export const categoriesHandlers = [
  http.get(
    'http://localhost:9090/category/:id',
    async ({ params, request }) => {
      await sleep(200);

      const id = Number(params.id);
      const url = new URL(request.url);
      const subcategory = url.searchParams.get('subcategory');

      // 해당 id를 가진 카테고리 찾기 - 상세페이지 필터
      let category: any[] = [];

      if (subcategory === 'undefined') {
        category = articles.filter((item) => item.categoryId === id);
      } else {
        category = articles
          .filter((item) => item.categoryId === id)
          .filter((item) => item.subcategory === subcategory);
      }
      category.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      const title = categorys.find((item) => item.id === id)?.name;
      const sub = categorys.find((item) => item.id === id)?.subcategorys;

      return HttpResponse.json({ title, sub, category });
    }
  ),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
