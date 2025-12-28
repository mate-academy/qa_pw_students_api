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

let userId;

test.beforeEach(async ({ todosAPI }) => {
  const response = await todosAPI.getAllTodos();

  await todosAPI.assertSuccessResponseCode(response);
  const body = await todosAPI.parseBody(response);
  const notCompletedUser = body.find(todo => todo.completed === false);

  if (!notCompletedUser) {
    throw new Error('No uncompleted todo found');
  }

  userId = notCompletedUser.userId;
});

test('GET not completed todos by existing userId', async ({ todosAPI }) => {
  const response = await todosAPI.getUncompletedTodos(userId);

  await todosAPI.assertSuccessResponseCode(response);
  await todosAPI.assertBodyIsNotEmpty(response);

  const body = await todosAPI.parseBody(response);

  body.forEach(todo => {
    expect(todo).toMatchObject({
      userId: userId,
      completed: false,
      id: expect.any(Number),
      title: expect.any(String),
    });
  });
});
