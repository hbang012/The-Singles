import { http, HttpResponse } from 'msw';
import categorys from './category.json';
import researchs from './research.json';

export const researchHandlers = [
  http.get('http://localhost:9090/research', async ({ request }) => {
    await sleep(200);
    const url = new URL(request.url);
    let subcategory = url.searchParams.get('subcategory');

    subcategory =
      subcategory === 'canDo'
        ? 'Do&Don’t'
        : subcategory === 'lifeSurvey'
        ? 'Life Survey'
        : subcategory;

    let category: any = [];

    if (subcategory) {
      category = researchs.filter((item) => item.subcategory === subcategory);
    }

    category.sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const title = categorys.find((item) => item.id === 7)?.name;
    const sub = categorys.find((item) => item.id === 7)?.subcategorys;

    return HttpResponse.json({ title, sub, category });
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
