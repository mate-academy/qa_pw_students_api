import { test } from '../../_fixtures/fixtures';

test('GET all todos', async ({ todosAPI }) => {
  const response = await todosAPI.getAllTodos();

  await todosAPI.assertSuccessResponseCode(response);
  await todosAPI.assertBodyIsNotEmpty(response);
});
