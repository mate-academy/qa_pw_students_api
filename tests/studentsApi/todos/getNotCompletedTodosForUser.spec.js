import { SUCCESS_CODE } from '../../../src/api/constants/responceCodes';
import { expect, test } from '../../_fixtures/fixtures';
/*
Preconditions:
1. Send GET request to '/todos' endpoint
2. Assert that the Success Response Code is received
3. Find the entry in the Repsonse Body where "completed" equals "false"
4. Save the userId of this "todo" entry

Hint
To send the GET request with parameters use the argument 'options':
```
const response = await request.get(
'/todos',
options : { params: { userId, completed: false} }
);
```

Test:
1. Send GET request to '/todos' endpoint with params userId & completed=false 
2. Assert that the Success Response code is received
3. Assert that the userId field in Response Body has correct value correct
4. Assert that the completed field in Response Body has correct value correct
*/
let savedUserId;

test.beforeEach(async ({ request }) => {
  const response = await request.get('/todos');
  expect(response.status()).toBe(SUCCESS_CODE);
  const body = await await response.json();

  const completeToDo = body.find(todo => todo.completed === false);
  expect(completeToDo).toBeDefined();

  savedUserId = completeToDo.userId;
});

test('GET uncompleted todos by existing userId', async ({ request }) => {
  const response = await request.get('/todos', {
    params: {
      userId: savedUserId,
      completed: false,
    },
  });

  expect(response.status()).toBe(SUCCESS_CODE);

  const body = await response.json();

  for (const todo of body) {
    expect(todo.userId).toBe(savedUserId);
    expect(todo.completed).toBe(false);
  }
});
