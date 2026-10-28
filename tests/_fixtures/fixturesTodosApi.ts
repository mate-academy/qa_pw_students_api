import { test as base } from '@playwright/test';
import { TodosApi } from '../../src/api/TodosAPI';

export const test = base.extend<{
  todosApi;
}>({
  todosApi: async ({ request }, use) => {
    const client = new TodosApi(request);

    await use(client);
  },
});
