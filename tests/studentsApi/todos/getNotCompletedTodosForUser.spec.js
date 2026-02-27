import { test } from '../../_fixtures/fixtures';

let userId;
let response;

test.beforeEach(async ({ todosAPI }) => {
  response = await todosAPI.getAllTodos();

  await todosAPI.assertSuccessResponseCode(response);
  const completedTodo = await todosAPI.findTodo(response, false);

  userId = completedTodo.userId;
});

test('GET not completed todos by existing userId', async ({ todosAPI }) => {
  const response = await todosAPI.getAllTodos({
    params: { userId, completed: false }
  });

  await todosAPI.assertSuccessResponseCode(response);
  await todosAPI.assertUserIdFieldIsCorrect(response, userId);
  await todosAPI.assertCompletedFieldIsCorrect(response, false);
});
