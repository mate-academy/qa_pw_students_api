import { test } from '../../_fixtures/fixtures';

/*
Preconditions:
1. Send GET request to '/todos' endpoint
2. Assert that the Success Response Code is received
3. Find the entry in the Response Body where "completed" equals "true"
4. Save the userId of this "todo" entry

Test:
1. Send GET request to '/todos' endpoint with params
   userId & completed=true
2. Assert that the Success Response code is received
3. Assert that the userId field in Response Body is correct
4. Assert that the completed field in Response Body is correct
*/

let userId;

test.beforeEach(async ({ todosAPI }) => {
  const response = await todosAPI.getAllTodos();

  await todosAPI.assertSuccessResponseCode(response);

  const body = await todosAPI.parseBody(response);

  const completedTodo = body.find(todo => todo.completed === true);

  if (!completedTodo) {
    throw new Error('No completed todo found');
  }

  userId = completedTodo.userId;
});

test('GET completed todos by existing userId', async ({ todosAPI }) => {
  const response = await todosAPI.getTodosForUser(userId, true);

  await todosAPI.assertSuccessResponseCode(response);
  await todosAPI.assertUserIdIsCorrect(response, userId);
  await todosAPI.assertCompletedIsCorrect(response, true);
});
