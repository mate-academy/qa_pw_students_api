import { test as base } from '@playwright/test';
import { GoodsAPI } from '../../src/api/GoodsAPI';
import { ToDosAPI } from '../../src/api/ToDosAPI';

export const test = base.extend<{
  goodsAPI;
  todosAPI;
}>({
  goodsAPI: async ({ request }, use) => {
    const client = new GoodsAPI(request);

    await use(client);
  },
  todosAPI: async ({ request }, use) => {
    const client = new ToDosAPI(request);

    await use(client);
  },
});
