import { http, HttpResponse } from 'msw';
import articles from './articles.json';
let maxId = Math.max(...articles.map((item) => item.id));

export const articlesHandlers = [
  http.get('http://localhost:9090/articles/search', async ({ request }) => {
    await sleep(200);

    //  request객체에 searchParams가 없으므로 js URL객체로 변환
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    const page = Number(url.searchParams.get('page') as string);

    // 페이지별 데이터 가져오기
    function getDataByPage(
      data: {
        id: number;
        title: string;
        subtitle: string;
        editor: string;
        date: string;
        image: string;
        photoCredit: string;
        likes: number;
        categoryId: number;
        subcategory: string;
        tags: string[];
      }[],
      page: number,
      limit: number
    ) {
      const totalPages = Math.ceil(data.length / limit);

      // 페이지번호가 잘못들어갔을때
      if (page < 1 || page > totalPages) {
        return [];
      }

      // 잘라낼 배열 시작 위치
      const start = (page - 1) * limit;
      const end = start + limit;

      return {
        result: data.slice(start, end),
        total: data.length,
      };
    }

    // 검색어에 대한 데이터 필터링 search값이 있을때만
    if (search !== 'undefined' && search) {
      const filterd = articles.filter((item) => {
        return item.title.toLowerCase().includes(search.toLowerCase());
      });
      const result = getDataByPage(filterd, page, 5);
      return HttpResponse.json(result);
    }

    // 검색어 없는 경우 모두 보냄
    const result = getDataByPage(articles, page, 5);
    return HttpResponse.json(result);
  }),
  // 최근 아티클 4개
  http.get('http://localhost:9090/articles', async () => {
    await sleep(200);

    const articlesSlice = articles
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);

    return HttpResponse.json(articlesSlice);
  }),
  // 최근 아티클 4개 -Today
  http.get('http://localhost:9090/articles/latest', async () => {
    await sleep(200);

    const getLatestArticles = () => {
      return articles
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 4);
    };

    return HttpResponse.json(getLatestArticles());
  }),

  // 최신순
  http.get('http://localhost:9090/articles/newest', async () => {
    await sleep(200);

    const getNewstArticles = () => {
      return articles.sort(
        (a, b) =>
          new Date(
            b.date ? b.date.replace(/\./g, '-') : '2020-01-01'
          ).getTime() -
          new Date(a.date ? a.date.replace(/\./g, '-') : '2020-01-01').getTime()
      );
    };

    return HttpResponse.json(getNewstArticles());
  }),

  //좋아요 많은순
  http.get('http://localhost:9090/articles/popular', async () => {
    await sleep(200);

    const getPopularArticles = () => {
      return articles.sort((a, b) => b.likes - a.likes);
    };

    return HttpResponse.json(getPopularArticles());
  }),

  // style 아티클만 필터
  http.get('http://localhost:9090/articles/style', async () => {
    await sleep(200);

    const styleArticles = articles.filter((item) => item.categoryId === 1);

    return HttpResponse.json(styleArticles);
  }),

  // beauty 아티클만 필터
  http.get('http://localhost:9090/articles/beauty', async () => {
    await sleep(200);

    const beautyArticles = articles.filter((item) => item.categoryId === 2);

    return HttpResponse.json(beautyArticles);
  }),

  // lifestyle 아티클만 필터
  http.get('http://localhost:9090/articles/lifestyle', async () => {
    await sleep(200);

    const lifestyleArticles = articles.filter((item) => item.categoryId === 3);

    return HttpResponse.json(lifestyleArticles);
  }),

  // love 아티클만 필터
  http.get('http://localhost:9090/articles/love', async () => {
    await sleep(200);

    const loveArticles = articles.filter((item) => item.categoryId === 6);

    return HttpResponse.json(loveArticles);
  }),

  // 리서치 카테고리 필터링
  http.get('http://localhost:9090/articles/research', async ({ request }) => {
    await sleep(200);

    const url = new URL(request.url);
    const activeKey = url.searchParams.get('activeKey');

    let researchArticles = articles.filter((item) => item.categoryId === 7);

    if (activeKey) {
      researchArticles = researchArticles.filter(
        (item) => item.subcategory === activeKey
      );
    }

    return HttpResponse.json(researchArticles);
  }),

  // 아티클 상세 페이지
  http.get('http://localhost:9090/articles/:id', async ({ params }) => {
    await sleep(200);

    const { id } = params;
    const article = articles.find((item) => item.id === Number(id));

    return HttpResponse.json(article);
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
