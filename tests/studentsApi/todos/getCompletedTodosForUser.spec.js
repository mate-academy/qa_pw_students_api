import { test, expect } from '../../_fixtures/fixtures';

let userId;

test.beforeEach(async ({ todosAPI }) => {
  const response = await todosAPI.getAllTodosAndValidateResponse();
  const todos = await todosAPI.parseBody(response);
  const todo = todos.find(todo => todo.completed === true);
  expect(todo).toBeDefined();
  userId = todo.userId;
});

test('GET completed todos by existing userId', async ({ todosAPI }) => {
  const response = await todosAPI.getCompletedTodosForUser(userId);
  await todosAPI.assertSuccessResponseCode(response);
  await todosAPI.assertBodyIsNotEmpty(response);
  await todosAPI.assertUserIdIsCorrect(response, userId);
  await todosAPI.assertTodosAreCompleted(response);
});
