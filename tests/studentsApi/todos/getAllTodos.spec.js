import { test } from '../../_fixtures/fixtures';

test('Get all Todos', async ({ todosAPI }) => {
  const response = await todosAPI.getAllTodos();

  await todosAPI.assertSuccessResponseCode(response);
  await todosAPI.assertBodyIsNotEmpty(response);
});
