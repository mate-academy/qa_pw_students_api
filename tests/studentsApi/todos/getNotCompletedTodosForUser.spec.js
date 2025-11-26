import { test, expect } from '../../_fixtures/fixtures';

test('GET not completed todos by existing userId', async ({ todosAPI }) => {
  const userId = 1;

  const response = await todosAPI.getNotCompletedTodos(userId);
  expect(response.ok()).toBeTruthy();

  const todos = await response.json();

  expect(todos.length).toBeGreaterThan(0);
  todos.forEach(todo => {
    expect(todo.userId).toBe(userId);
    expect(todo.completed).toBe(false);
  });
});
