import { test } from '../../_fixtures/fixtures';

let good;

test.beforeEach(async ({todosAPI}) => {
  const response = await todosAPI.getAllTodos();

  await todosAPI.assertSuccessResponseCode(response);

  const body = await todosAPI.parseBody(response);

  good = body.find(todo => todo.completed === true);
});

test('GET completed todos by existing userId', async ({todosAPI}) => {
  const userId = good.userId;
  const status = true;
  const response = await todosAPI.getCompletedTodosById(userId);

  await todosAPI.assertSuccessResponseCode(response);
  await todosAPI.assertUserIdIsCorrect(response, userId);
  await todosAPI.assertStatusIsCorrect(response, status);
});
