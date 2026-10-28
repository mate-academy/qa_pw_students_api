import { test } from '../../_fixtures/fixtures';

test('GET all todos', async ({ todosApi }) => {
  const response = await todosApi.getAllTodos();

  await todosApi.assertSuccessResponseCode(response);
  await todosApi.assertBodyIsNotEmpty(response);
});
