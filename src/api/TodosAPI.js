import { expect } from 'playwright/test';
import { BaseAPI } from './BaseAPI';

export class TodosAPI extends BaseAPI {
  constructor(request) {
    super(request);
  }

  async getAllTodos() {
    return await this.step('Get all todos', async () => {
      return await this.request.get('/students-api/todos', {});
    });
  }

  async getTodosByUserId(userId, isCompleted) {
    return await this.step(`Get todos by userId`, async () => {
      return await this.request.get('/students-api/todos', {
        params: { userId, completed: isCompleted },
      });
    });
  }

  async assertUserIdIsCorrect(response, userId) {
    await this.step(`Assert userId is correct`, async () => {
      const body = await this.parseBody(response);

      expect(body[0].userId).toEqual(userId);
    });
  }

  async assertIsCompleted(response, isCompleted) {
    await this.step(`Assert completed value is correct`, async () => {
      const body = await this.parseBody(response);

      expect(body[0].completed).toEqual(isCompleted);
    });
  }
}
