import { expect } from '../../tests/_fixtures/fixtures';
import { testStep } from '../common/helpers/pw';
import { BaseAPI } from './BaseAPI';

export class TodosAPI extends BaseAPI {
  constructor(request) {
    super(request);
  }

  async getAllTodos() {
    return await this.step(`GET all Todos`, async () => {
      return await this.request.get('/students-api/todos', {});
    });
  }

  async getTodoById(id) {
    return await this.step(`GET Todo by id`, async () => {
      return await this.request.get(`/students-api/todos/${id}`, {});
    });
  }

  async getFirstCompletedTodo(response) {
    return await this.step(
      `Get first completed todo from the response`,
      async () => {
        const body = await this.parseBody(response);
        for (const todo of body) {
          if (todo.completed) {
            return todo;
          }
        }
        throw new Error('Failed to find a completed todo in the response');
      },
    );
  }

  async getFirstNotCompletedTodo(response) {
    return await this.step(
      `Get first not completed todo from the response`,
      async () => {
        const body = await this.parseBody(response);
        for (const todo of body) {
          if (!todo.completed) {
            return todo;
          }
        }
        throw new Error('Failed to find not completed todo in the response');
      },
    );
  }

  async getCompletedTodosOfUser(userId) {
    return await this.step(
      `Get all completed todos of user ${userId}`,
      async () => {
        return await this.request.get(`/students-api/todos`, {
          params: {
            userId,
            completed: true,
          },
        });
      },
    );
  }

  async getNotCompletedTodosOfUser(userId) {
    return await this.step(
      `Get all not completed todos of user ${userId}`,
      async () => {
        return await this.request.get(`/students-api/todos`, {
          params: {
            userId,
            completed: false,
          },
        });
      },
    );
  }

  async assertUserIdOfTodos(response, userId) {
    await this.step(
      `Assert all todos in list have userID: ${userId}`,
      async () => {
        const body = await this.parseBody(response);

        for (const todo of body) {
          expect(todo.userId).toEqual(userId);
        }
      },
    );
  }

  async assertResponseHaveOnlyCompletedTodos(response) {
    await this.step(
      `Assert response have list of completed todos only`,
      async () => {
        const body = await this.parseBody(response);

        for (const todo of body) {
          expect(todo.completed).toBeTruthy();
        }
      },
    );
  }

  async assertResponseHaveOnlyNotCompletedTodos(response) {
    await this.step(
      `Assert response have list of not completed todos only`,
      async () => {
        const body = await this.parseBody(response);

        for (const todo of body) {
          expect(todo.completed).not.toBeTruthy();
        }
      },
    );
  }
}