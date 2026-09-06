import { test } from '../../_fixtures/fixtures';

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

let userId;

test.beforeEach(async ({ todosAPI, baseAPI }) => {
  const response = await todosAPI.getAllTodos();

  await baseAPI.assertSuccessResponseCode(response);

  const body = await baseAPI.parseBody(response);

  const incompleteTodo = body.find(todo => todo.completed === false);
  userId = incompleteTodo.userId;
});

test('GET incompleted todos by existing userId', async ({
  todosAPI,
  baseAPI,
}) => {
  const response = await todosAPI.getTodosByUserIdAndStatus(userId, false);

  await baseAPI.assertSuccessResponseCode(response);
  await baseAPI.assertUserIdIsCorrect(response, userId);
  await baseAPI.assertIncompletedFieldIsCorrect(response);
});
