import { expect } from '../../tests/_fixtures/fixtures';
import { BaseAPI } from './BaseAPI';

export class TodosAPI extends BaseAPI {
  async getAllTodos(options = {}) {
    return await this.step(`GET all todos`, async () => {
      return await this.request.get(`/students-api/todos`, options);
    });
  }

  async getCompletedTodosForUser(userId) {
    return await this.step(`GET completed todos for user`, async () => {
      return await this.request.get(`/students-api/todos`, {
        params: { userId, completed: true },
      });
    });
  }

  async getNotCompletedTodosForUser(userId) {
    return await this.step(`GET not completed todos for user`, async () => {
      return await this.request.get(`/students-api/todos`, {
        params: { userId, completed: false },
      });
    });
  }

  async assertUserIdIsCorrect(response, userId) {
    await this.step(`Assert the userId is correct`, async () => {
      const body = await this.parseBody(response);

      for (const todo of body) {
        expect(todo.userId).toEqual(userId);
      }
    });
  }

  async assertCompletedIsCorrect(response, completed) {
    await this.step(`Assert the completed is correct`, async () => {
      const body = await this.parseBody(response);

      for (const todo of body) {
        expect(todo.completed).toEqual(completed);
      }
    });
  }
}
