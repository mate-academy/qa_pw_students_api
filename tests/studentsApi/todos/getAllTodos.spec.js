import { expect, test } from '../../_fixtures/fixtures';

/*
Test:
1. Send GET request to '/todos' endpoint
2. Assert that the Success Response code is received
3. Assert that the Body is not empty
*/

test('GET all todos', async ({ request }) => {
  const response = await request.get('/todos', {});
  const status = response.status();
  const body = await response.json();

  expect(status).toEqual(200);
  expect(body).not.toBe([]);
});
