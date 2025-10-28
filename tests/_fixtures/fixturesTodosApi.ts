import { test as base, request } from '@playwright/test';
import { TodosAPI } from '../../src/api/TodosAPI';

export const test = base.extend<{
  todosAPI;
}>({
  todosAPI: async ({ request }, use) => {
    const client = new TodosAPI(request);

    await use(client);
  }
});
