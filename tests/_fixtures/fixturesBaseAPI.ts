import { test as base } from '@playwright/test';
import { BaseAPI } from '../../src/api/BaseAPI';

export const test = base.extend<{
  baseAPI: BaseAPI;
}>({
  baseAPI: async ({ request }, use) => {
    const client = new BaseAPI(request);

    await use(client);
  },
});
