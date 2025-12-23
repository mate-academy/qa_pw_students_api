import { test, expect } from '../../_fixtures/fixtures';

test('Get not completed todos for user', async ({ todosAPI }) => {
  const userId = 1;
  const response = await todosAPI.getNotCompletedTodosForUser(userId);
  const todos = await response.json();

  expect(todos.length).toBeGreaterThan(0);

  todos.forEach(todo => {
    expect(todo.userId).toBe(userId);
    expect(todo.completed).toBe(false);
  });
});
