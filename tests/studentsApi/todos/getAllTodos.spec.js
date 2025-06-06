import { test } from '../../_fixtures/fixtures';

test('GET all todos', async ({ todosAPI }) => {
  // 1. Send GET request to '/todos' endpoint
  const response = await todosAPI.getAllTodos();

  // 2. Assert that the Success Response code is received
  await todosAPI.assertSuccessResponseCode(response);
  // 3. Assert that the Body is not empty
  await todosAPI.assertBodyIsNotEmpty(response);
});
