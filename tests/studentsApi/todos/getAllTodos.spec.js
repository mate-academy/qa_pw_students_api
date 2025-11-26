import { test, expect } from '../../_fixtures/fixtures';

test('GET all todos', async ({ todosAPI }) => {
  const response = await todosAPI.getAllTodos();
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.length).toBeGreaterThan(0);
});
