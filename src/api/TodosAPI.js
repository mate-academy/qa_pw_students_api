import { BaseAPI } from './BaseAPI';
import { expect } from '@playwright/test';

export class TodosAPI extends BaseAPI {
  
  async getAllTodos() {
    return await this.step('GET all todos', async () => {
      return await this.request.get('/students-api/todos');
    });
  }

  async getTodosForUser(userId, completed) {
    return await this.step(`GET todos for user ${userId}`, async () => {
      return await this.request.get('/students-api/todos', {
        params: {
          userId,
          completed,
        },
      });
    });
  }

  async assertUserIdIsCorrect(response, userId) {
    await this.step('Assert userId is correct', async () => {
      const body = await this.parseBody(response);

      expect(body.every(todo => todo.userId === userId)).toBe(true);
    });
  }

  async assertCompletedIsCorrect(response, completed) {
    await this.step('Assert completed status is correct', async () => {
      const body = await this.parseBody(response);

      expect(body.every(todo => todo.completed === completed)).toBe(true);
    });
  }
}
