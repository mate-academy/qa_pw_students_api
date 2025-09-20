import { test, expect } from '../../_fixtures/fixtures';

/*
Test:
1. Send GET request to '/todos' endpoint
2. Assert that the Success Response code is received
3. Assert that the Body is not empty
*/

test('GET all todos', async ({ todosAPI }) => {
  const res = await todosAPI.getAllTodos();

  await todosAPI.assertSuccessResponseCode(res);
  await todosAPI.assertBodyIsNotEmpty(res);
});
