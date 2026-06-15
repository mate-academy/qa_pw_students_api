import { test } from '../../_fixtures/fixtures';

/*
Preconditions:
1. Send GET request to '/todos' endpoint
2. Assert that the Success Response Code is received
3. Find the entry in the Repsonse Body where "completed" equals "true"
4. Save the userId of this "todo" entry

Hint
To send the GET request with parameters use the argument 'options':
```
const response = await request.get(
'/todos',
options : { params: { userId, completed: true} }
);
```

Test:
1. Send GET request to '/todos' endpoint with params userId & completed=true 
2. Assert that the Success Response code is received
3. Assert that the userId field in Response Body has correct value correct
4. Assert that the completed field in Response Body has correct value correct
*/
let userId;

test.beforeEach(async ({ todosAPI }) => {
  const response = await todosAPI.getAllTodos();
  const responseBody = await todosAPI.parseBody(response);

  await todosAPI.assertSuccessResponseCode(response);
  const todoWithTrue = await todosAPI.getFirstTodoByCompletedStatus(
    responseBody,
    true
  );
  userId = todoWithTrue.userId;
});

test('GET completed todos by existing userId', async ({ todosAPI }) => {
  const response = await todosAPI.getTodosByUserIdAndCompleted(userId, true);

  await todosAPI.assertSuccessResponseCode(response);
  await todosAPI.assertBodyIsNotEmpty(response);
  await todosAPI.assertUserIdIsCorrect(response, userId);
  await todosAPI.assertCompletedIsCorrect(response, true);
});
