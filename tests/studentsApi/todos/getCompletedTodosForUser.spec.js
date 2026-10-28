import { test } from '../../_fixtures/fixtures';

let userId;

test.beforeEach(async ({ todosApi }) => {
  const response = await todosApi.getAllTodos();

  await todosApi.assertSuccessResponseCode(response);

  const body = await todosApi.parseBody(response);

  const todo = todosApi.findFirstCompletedTodoWithUser(body);

  await todosApi.assertTodoIsFound(todo);
  userId = todo.userId;
});

test('GET completed todos by existing userId', async ({ todosApi }) => {
  const response = await todosApi.getCompletedTodosForUser(userId);

  await todosApi.assertSuccessResponseCode(response);
  await todosApi.assertTodosBelongToUser(response, userId);
  await todosApi.assertTodosCompleted(response, true);
});
