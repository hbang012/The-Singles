import { http, HttpResponse } from 'msw';
import articles from './articles.json';
import category from './category.json';
import research from './research.json';
import youtube from './youtube.json';

export const searchHandlers = [
  http.get('http://localhost:9090/search', async ({ request }) => {
    await sleep(200);

    const url = new URL(request.url);
    const keyword = url.searchParams.get('keyword')?.toLowerCase();

    if (!keyword) {
      return HttpResponse.json({ results: [] });
    }

    const filteredResults = articles.filter((item) =>
      item.title.toLowerCase().includes(keyword)
    );

    return HttpResponse.json({ results: filteredResults });
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
