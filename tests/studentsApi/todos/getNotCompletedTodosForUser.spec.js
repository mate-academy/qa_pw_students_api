import { test } from '../../_fixtures/fixtures';

let todo;

test.beforeEach(async ({ todosAPI }) => {
  const response = await todosAPI.getAnyCompletedFalseTodo();

  await todosAPI.assertSuccessResponseCode(response);

  const body = await todosAPI.assertBodyIsNotEmpty(response);

  todo = body[0];
});

test('GET completed todos by existing userId', async ({ todosAPI }) => {
  const userId = todo.userId;
  const completed = false;
  const response = await todosAPI.getTodosByUserIdAndCompleted(userId, completed);

  await todosAPI.assertSuccessResponseCode(response);
  await todosAPI.assertIdIsCorrect(response, userId);
  await todosAPI.assertCompletedValue(response, false);
});

