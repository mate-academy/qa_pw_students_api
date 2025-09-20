import { test, expect } from '../../_fixtures/fixtures';

/*
Preconditions:
1. Send GET request to '/todos' endpoint
2. Assert that the Success Response Code is received
3. Find the entry in the Repsonse Body where "completed" equals "false"
4. Save the userId of this "todo" entry

Test:
1. Send GET request to '/todos' endpoint with params userId & completed=false 
2. Assert that the Success Response code is received
3. Assert that the userId field in Response Body has correct value correct
4. Assert that the completed field in Response Body has correct value correct
*/

let existingUserId;

test.beforeEach(async ({ todosAPI }) => {
  const res = await todosAPI.getAllTodos();
  await todosAPI.assertSuccessResponseCode(res);

  const body = await todosAPI.parseBody(res);
  const anyNotCompleted = body.find(t => t?.completed === false);

  expect(anyNotCompleted, 'There should be at least one not-completed todo').toBeTruthy();
  existingUserId = anyNotCompleted.userId;
});

test('GET not-completed todos by existing userId', async ({ todosAPI }) => {
  const res = await todosAPI.getTodosBy({ userId: existingUserId, completed: false });

  await todosAPI.assertSuccessResponseCode(res);

  const body = await todosAPI.parseBody(res);
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);

  for (const item of body) {
    expect(item.userId).toBe(existingUserId);
    expect(item.completed).toBe(false);
  }
});
