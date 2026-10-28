import { expect } from 'allure-playwright';
import { BaseAPI } from './BaseAPI';

export class TodosApi extends BaseAPI {
  constructor(request) {
    super(request);
    this.request = request;
  }

  async getAllTodos() {
    return await this.step('Get All Todos', async () => {
      return await this.request.get('/students-api/todos', {});
    });
  }

  findFirstCompletedTodoWithUser(todos) {
    return todos.find(item => item.completed === true && item.userId != null);
  }

  findFirstNotCompletedTodoWithUser(todos) {
    return todos.find(item => item.completed === false && item.userId != null);
  }

  async assertTodoIsFound(todo) {
    await this.step(`Assert a todo with non-null userId exists`, async () => {
      expect(todo, 'Todo with non-null userId should exist').toBeDefined();
    });
  }

  async getCompletedTodosForUser(userId) {
    return await this.step('Get Completed Todos for user', async () => {
      return await this.request.get('/students-api/todos', {
        params: { userId, completed: true },
      });
    });
  }

  async getNotCompletedTodosForUser(userId) {
    return await this.step('Get Not Completed Todos for user', async () => {
      return await this.request.get('/students-api/todos', {
        params: { userId, completed: false },
      });
    });
  }

  async assertTodosCompleted(response, expected) {
    await this.step(
      `Assert all todos have completed = ${expected}`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.length).toBeGreaterThan(0);
        for (const item of body) {
          expect(item.completed).toEqual(expected);
        }
      },
    );
  }

  async assertTodosNotCompleted(response, expected) {
    await this.step(
      `Assert all todos have Not completed = ${expected}`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.length).toBeGreaterThan(0);
        for (const item of body) {
          expect(item.completed).toEqual(expected);
        }
      },
    );
  }

  async assertTodosBelongToUser(response, userId) {
    await this.step(`Assert all todos belong to user ${userId}`, async () => {
      const body = await this.parseBody(response);

      for (const item of body) {
        expect(item.userId).toEqual(userId);
      }
    });
  }
}
