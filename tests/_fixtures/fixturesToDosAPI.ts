import { test as base } from '@playwright/test';
import { ToDosAPI } from '../../src/api/TodosAPI';

export const test = base.extend<{
  toDosAPI;
}>({
  toDosAPI: async ({ request }, use) => {
    const client = new ToDosAPI(request);

    await use(client);
  },
});
