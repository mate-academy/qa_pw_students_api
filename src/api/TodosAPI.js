import { expect } from '../../tests/_fixtures/fixtures';
import { BaseAPI } from './BaseAPI';

export class TodosAPI extends BaseAPI {
  async getAllTodos() {
    return await this.step(`GET all todos`, async () => {
      return await this.request.get('/students-api/todos', {});
    });
  }

  async getTodosByUserIdAndCompleted(userId, completed) {
    return await this.step(
      `GET todos by userId and completed status`,
      async () => {
        return await this.request.get('/students-api/todos', {
          params: { userId, completed },
        });
      },
    );
  }

  async assertUserIdIsCorrect(response, userId) {
    await this.step(`Assert the todo's userId is correct`, async () => {
      const body = await this.parseBody(response);

      expect(body[0].userId).toEqual(userId);
    });
  }

  async assertCompletedIsCorrect(response, completed) {
    await this.step(`Assert the todo's completed status is correct`, async () => {
      const body = await this.parseBody(response);

      expect(body[0].completed).toEqual(completed);
    });
  }
}
