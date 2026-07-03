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

let user;

test.beforeEach(async ({todosAPI}) => {
 const allResponse = await todosAPI.getAllToDos();
  const todos = await allResponse.json();
  const completedTodo = todos.find(t => t.completed === false);
  user = { id: completedTodo.userId };
});

test('GET not completed todos by existing userId', async ({
todosAPI,
}) => {

const response = await todosAPI.getNotCompletedTodosByUserId(user.id);

await todosAPI.assertSuccessResponseCodeReceived(response);
const result = await response.json();

await todosAPI.assertUserIdCorrect(result[0], user.id);
await todosAPI.assertCompletedFieldCorrect(result[0], false);

});
