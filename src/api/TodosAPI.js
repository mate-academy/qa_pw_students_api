import { expect } from '../../tests/_fixtures/fixtures';
import { BaseAPI } from './BaseAPI';

export class TodosAPI extends BaseAPI {
  constructor(request) {
    super();
    this.request = request;
  }

  async getAllTodos() {
    return await this.step(`GET all todos`, async () => {
      return await this.request.get('/students-api/todos', {});
    });
  }

  async getTodosByParams(params) {
    return await this.step(
      `GET todos with params: ${JSON.stringify(params)}`,
      async () => {
        return await this.request.get('/students-api/todos', {
          params: params,
        });
      },
    );
  }

  async getUserIdOfTodoByCompletionStatus(response, expectedCompletedStatus) {
    return await this.step(
      `Find userId of todo with completed status: ${expectedCompletedStatus}`,
      async () => {
        const todos = await response.json();
        const foundTodo = todos.find(
          todo => todo.completed === expectedCompletedStatus,
        );

        // Assert that a todo with the specified completed status was found
        expect(
          foundTodo,
          `A todo with "completed: ${expectedCompletedStatus}" must exist for this test precondition.`,
        ).not.toBeUndefined();

        return foundTodo.userId;
      },
    );
  }

  async assertTodosAreCompleted(response) {
    await this.step(`Assert all todos in response are completed`, async () => {
      const todos = await response.json();
      for (const todo of todos) {
        expect(todo.completed).toEqual(true);
      }
    });
  }

  async assertTodosAreNotCompleted(response) {
    await this.step(`Assert all todos in response are completed`, async () => {
      const todos = await response.json();
      for (const todo of todos) {
        expect(todo.completed).toEqual(false);
      }
    });
  }

  async assertTodosHaveCorrectUserId(response, expectedUserId) {
    await this.step(
      `Assert all todos in response have userId: ${expectedUserId}`,
      async () => {
        const todos = await response.json();
        for (const todo of todos) {
          expect(todo.userId).toEqual(expectedUserId);
        }
      },
    );
  }
}
