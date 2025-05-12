import { http, HttpResponse } from 'msw';
import categories from './categoris.json';

export const categoriesHandlers = [
  http.get('http://localhost:9090/categories/:id', async ({ params }) => {
    await sleep(200);

    const { id } = params;

    // 해당 id를 가진 카테고리 찾기
    const category = categories.find((item) => item.id === id);

    if (!category) {
      return HttpResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json({ subcategories: category.subcategories });
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
