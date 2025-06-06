import { test } from '../../_fixtures/fixtures';

let userId;

test.beforeEach(async ({ todosAPI }) => {
  // 1. Send GET request to '/todos' endpoint
  const response = await todosAPI.getAllTodos();

  // 2. Assert that the Success Response Code is received
  await todosAPI.assertSuccessResponseCode(response);

  // 3. Find the entry in the Repsonse Body where "completed" equals "false"
  // 4. Save the userId of this "todo" entry
  userId = await todosAPI.getUserIdOfTodoByCompletionStatus(response, false);
});

test('GET completed todos by existing userId', async ({ todosAPI }) => {
  // 1. Send GET request to '/todos' endpoint with params userId & completed=false
  const response = await todosAPI.getTodosByParams({
    userId,
    completed: 'false',
  });

  // 2. Assert that the Success Response code is received
  await todosAPI.assertSuccessResponseCode(response);

  // 3. Assert that the userId field in Response Body has correct value correct
  await todosAPI.assertTodosHaveCorrectUserId(response, userId);

  // 4. Assert that the completed field in Response Body has correct value correct
  await todosAPI.assertTodosAreNotCompleted(response);
});
