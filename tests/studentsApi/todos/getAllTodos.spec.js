import { test, expect } from '../../_fixtures/fixtures';

test('Get all todos', async ({ todosAPI }) => {
  const response = await todosAPI.getAllTodos();
  const body = await response.json();

  expect(body.length).toBeGreaterThan(0);
});
