import { http } from 'msw';

import youtubeData from '@/mocks/youtube.json';

export type YoutubeItem = {
  id: string;
  title: string;
};

export const getYoutubeData = (): YoutubeItem[] => {
  return youtubeData;
};

// MSW API
export const youtubeHandlers = [
  http.get('/api/youtube', async () => {
    return new Response(JSON.stringify(youtubeData), {
      headers: { 'Content-Type': 'application/json' },
    });
  }),
];
