import { test, expect } from '../../_fixtures/fixtures';
import { SUCCESS_CODE } from '../../../src/api/constants/responceCodes';

/*
Test:
1. Send GET request to '/todos' endpoint
2. Assert that the Success Response code is received
3. Assert that the Body is not empty
*/

test('GET all todos', async ({ todosAPI }) => {
  const response = await todosAPI.getAllTodos();

  expect(todosAPI.parseStatus(response)).toEqual(SUCCESS_CODE);

  const body = await todosAPI.parseBody(response);

  expect(body.length).toBeGreaterThan(0);
});
