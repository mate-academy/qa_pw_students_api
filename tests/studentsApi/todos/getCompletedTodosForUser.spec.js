import { test, expect } from '../../_fixtures/fixtures';

/*
Preconditions:
1. Send GET request to '/todos' endpoint
2. Assert that the Success Response Code is received
3. Find the entry in the Repsonse Body where "completed" equals "true"
4. Save the userId of this "todo" entry

Test:
1. Send GET request to '/todos' endpoint with params userId & completed=true 
2. Assert that the Success Response code is received
3. Assert that the userId field in Response Body has correct value correct
4. Assert that the completed field in Response Body has correct value correct
*/

let existingUserId;

test.beforeEach(async ({ todosAPI }) => {
  const res = await todosAPI.getAllTodos();
  await todosAPI.assertSuccessResponseCode(res);

  const body = await todosAPI.parseBody(res);
  const anyCompleted = body.find(t => t?.completed === true);

  expect(anyCompleted, 'There should be at least one completed todo').toBeTruthy();
  existingUserId = anyCompleted.userId;
});

test('GET completed todos by existing userId', async ({ todosAPI }) => {
  const res = await todosAPI.getTodosBy({ userId: existingUserId, completed: true });

  await todosAPI.assertSuccessResponseCode(res);

  const body = await todosAPI.parseBody(res);
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);

  for (const item of body) {
    expect(item.userId).toBe(existingUserId);
    expect(item.completed).toBe(true);
  }
});
