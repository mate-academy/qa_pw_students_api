import { test as base } from '@playwright/test';
import { GoodsAPI } from '../../src/api/GoodsAPI';

export const test = base.extend<{
  goodsAPI: GoodsAPI;
}>({
  goodsAPI: async ({ request }, use) => {
    const client = new GoodsAPI(request);

    await use(client);
  },
});
