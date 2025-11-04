import { todo } from 'node:test';
import { expect, test } from '../../_fixtures/fixtures';
import { get } from 'http';

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
let todoList;

test.beforeEach(async ({ todosAPI }) => {
  const response = await todosAPI.getAllTodos();

  await todosAPI.assertSuccessResponseCode(response);
  const body = await todosAPI.parseBody(response);

  todoList = body[0];
});

test('GET completed todos by existing userId', async ({ todosAPI }) => {
  const todoId = todoList.userId;
  const response = await todosAPI.getTodosByUserIdAndCompletionStatus(
    todoId,
    true,
  );

  await todosAPI.assertSuccessResponseCode(response);
  const body = await todosAPI.parseBody(response);

  body.forEach(todo => {
    expect(todo.userId).toEqual(todoId);
    expect(todo.completed).toBe(true);
  });
});
