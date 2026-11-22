import { expect } from '../../tests/_fixtures/fixtures';
import { BaseAPI } from './BaseAPI';

export class TodosAPI extends BaseAPI {
  constructor(request) {
    super(request);
  }

  async getAllTodos() {
    return await this.step('GET all todos', async () => {
      return await this.request.get('/students-api/todos');
    });
  }

  async getTodosForUser(userId, completed) {
    return await this.step(
      `GET todos for user ${userId} with completed=${completed}`,
      async () => {
        return await this.request.get('/students-api/todos', {
          params: {
            userId,
            completed,
          },
        });
      },
    );
  }

  async assertUserIdIsCorrect(response, userId) {
    await this.step('Assert userId is correct', async () => {
      const body = await this.parseBody(response);

      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);

      for (const todo of body) {
        expect(todo.userId).toEqual(userId);
      }
    });
  }

  async assertCompletedIsCorrect(response, completed) {
    await this.step(`Assert completed equals ${completed}`, async () => {
      const body = await this.parseBody(response);

      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);

      for (const todo of body) {
        expect(todo.completed).toEqual(completed);
      }
    });
  }
}
