import { test as base } from '@playwright/test';
import { TodosAPI } from '../../src/api/TodosAPI';

export const test = base.extend<{
  todosAPI: TodosAPI;
}>({
  todosAPI: async ({ request }, use) => {
    const todosAPI = new TodosAPI(request, process.env.API_URL);
    await use(todosAPI);
  },
});
