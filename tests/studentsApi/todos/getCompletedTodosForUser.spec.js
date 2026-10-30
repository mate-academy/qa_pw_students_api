import { test, expect } from '../../_fixtures/fixtures';

let userId;

test.beforeEach(async ({ todosAPI }) => {
  const response = await todosAPI.getAllTodos();

  await todosAPI.assertSuccessResponseCode(response);

  const body = await todosAPI.parseBody(response);

  const completedTodo = body.find(todo => todo.completed === true);

  expect(completedTodo).toBeDefined();

  userId = completedTodo.userId;
});


test('GET completed todos by existing userId', async ({ todosAPI }) => {

  const response = await todosAPI.getTodosForUser(userId, true);

  await todosAPI.assertSuccessResponseCode(response);
  await todosAPI.assertBodyIsNotEmpty(response);
  await todosAPI.assertUserIdIsCorrect(response, userId);
  await todosAPI.assertCompletedIsCorrect(response, true);
});
