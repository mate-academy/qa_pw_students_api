import { test as base, request } from '@playwright/test';
import { GoodsAPI } from '../../src/api/GoodsAPI';

export const test = base.extend<{
  goodsAPI;
}>({
  goodsAPI: async ({ request }, use) => {
    const client = new GoodsAPI(request);

    await use(client);
  }
});
