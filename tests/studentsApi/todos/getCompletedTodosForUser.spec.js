import { test } from '../../_fixtures/fixtures';

let todo;

test.beforeEach(async ({ todosAPI }) => {
  const response = await todosAPI.getAnyCompletedTrueTodo();

  await todosAPI.assertSuccessResponseCode(response);

  const body = await todosAPI.parseBody(response);

  todo = body[0];
});

test('GET completed todos by existing userId', async ({ todosAPI }) => {
  const userId = todo.userId;
  const response = await todosAPI.getCompletedTodos(userId);

  await todosAPI.assertSuccessResponseCode(response);
  await todosAPI.assertIdIsCorrect(response, userId);
  await todosAPI.assertCompletedValue(response, true);
});
