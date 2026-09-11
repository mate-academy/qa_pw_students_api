import { expect } from '../../tests/_fixtures/fixtures';
import { BaseAPI } from './BaseAPI';

export class TodosAPI extends BaseAPI {
  constructor(request) {
    super(request);
  }

  async getAllTodos() {
    return await this.step(`GET all todos`, async () => {
      return await this.request.get('/students-api/todos', {});
    });
  }

  async getTodosByUserIdAndStatus(userId, completed) {
    return await this.step(
      `GET todos by userId=${userId} and completed=${completed}`,
      async () => {
        return await this.request.get('/students-api/todos', {
          params: { userId, completed },
        });
      },
    );
  }

  async assertUserIdIsCorrect(response, userId) {
    await this.step(`Assert the userId is correct`, async () => {
      const body = await this.parseBody(response);

      body.forEach(todo => {
        expect(todo.userId).toEqual(userId);
      });
    });
  }

  async assertCompletedStatusIsCorrect(response, completed) {
    await this.step(`Assert the completed status is correct`, async () => {
      const body = await this.parseBody(response);

      body.forEach(todo => {
        expect(todo.completed).toEqual(completed);
      });
    });
  }
}
