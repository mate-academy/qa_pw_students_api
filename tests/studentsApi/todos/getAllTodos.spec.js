import { test } from '../../_fixtures/fixtures';

/*
Test:
1. Send GET request to '/todos' endpoint
2. Assert that the Success Response code is received
3. Assert that the Body is not empty
*/

test('GET all todos', async ({ todosAPI }) => {
  const response = await todosAPI.getAllTodos();

  await todosAPI.assertSuccessResponseCode(response);
  await todosAPI.assertBodyIsNotEmpty(response);
});
