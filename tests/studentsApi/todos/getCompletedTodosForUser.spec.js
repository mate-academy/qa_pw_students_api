import { test, expect } from '../../_fixtures/fixtures';
import { SUCCESS_CODE } from '../../../src/api/constants/responceCodes';

/*
Preconditions:
1. Send GET request to '/todos' endpoint
2. Assert that the Success Response Code is received
3. Find the entry in the Response Body where "completed" equals "true"
4. Save the userId of this "todo" entry

Test:
1. Send GET request to '/todos' endpoint with params userId & completed=true
2. Assert that the Success Response code is received
3. Assert that the userId field in Response Body has correct value
4. Assert that the completed field in Response Body has correct value
*/

let userId;

test.beforeEach(async ({ todosAPI }) => {
  const response = await todosAPI.getAllTodos();

  expect(todosAPI.parseStatus(response)).toEqual(SUCCESS_CODE);

  const body = await todosAPI.parseBody(response);

  expect(body.length).toBeGreaterThan(0);

  const completedTodo = body.find(todo => todo.completed === true);

  expect(
    completedTodo,
    'Expected at least one completed todo in the response',
  ).toBeDefined();

  userId = completedTodo.userId;
});

test('GET completed todos by existing userId', async ({ todosAPI }) => {
  const response = await todosAPI.getTodosForUserByCompleted(userId, true);

  expect(todosAPI.parseStatus(response)).toEqual(SUCCESS_CODE);

  const body = await todosAPI.parseBody(response);

  expect(body.length).toBeGreaterThan(0);

  body.forEach(todo => {
    expect(todo.userId).toEqual(userId);
    expect(todo.completed).toEqual(true);
  });
});
