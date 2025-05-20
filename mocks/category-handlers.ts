import { http, HttpResponse } from 'msw';
import categorys from './category.json';
import articles from './articles.json';

export const categoriesHandlers = [
  http.get('http://localhost:9090/category/:id', async ({ params }) => {
    await sleep(200);

    const id = Number(params.id);

    // 해당 id를 가진 카테고리 찾기
    const category = articles.filter((item) => item.categoryId === id);
    category.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const title = categorys.find((item) => item.id === id)?.name;
    const sub = categorys.find((item) => item.id === id)?.subcategorys;

    if (!category) {
      return HttpResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json({ title, sub, category });
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
