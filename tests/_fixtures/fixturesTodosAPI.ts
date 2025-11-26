// fixtures/fixturesTodosAPI.js
import { test as base } from '@playwright/test';
import { TodosAPI } from '../../src/api/TodosAPI';

export const test = base.extend({
  todosAPI: async ({ request }, use) => {
    const todosAPI = new TodosAPI(request);
    await use(todosAPI);
  },
});

export { expect } from '@playwright/test';
