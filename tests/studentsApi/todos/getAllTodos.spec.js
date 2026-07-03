import { test } from '../../_fixtures/fixtures';

test('GET all todos', async ({ todosAPI }) => {
    const response = await todosAPI.getAllToDos();

    await todosAPI.assertSuccessResponseCodeReceived(response);
    await todosAPI.assertBodyIsNotEmpty(response);
});

/*
Test:
1. Send GET request to '/todos' endpoint
2. Assert that the Success Response code is received
3. Assert that the Body is not empty
*/
