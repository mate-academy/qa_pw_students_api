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

  async getTodosByUserIdAndCompleted(userId, completed) {
    return await this.step(
      `GET todos by userId ${userId} and completed ${completed}`,
      async () => {
        return await this.request.get('/students-api/todos', {
          params: { userId, completed },
        });
      }
    );
  }

  async getTodoById(id) {
    return await this.step(`GET todo by id`, async () => {
      return await this.request.get(`/students-api/goods/${id}`, {});
    });
  }

  async getFirstTodoByCompletedStatus(responseBody, completed) {
    return await this.step(
      `Find the first todo by completed status ${completed}`,
      async () => {
        return responseBody.find((todo) => todo.completed === completed);
      }
    );
  }

  async assertTitleIsCorrect(response, title) {
    await this.step(`Assert the todos' title is correct`, async () => {
      const body = await this.parseBody(response);

      expect(body.title).toEqual(title);
    });
  }

  async assertUserIdIsCorrect(response, userId) {
    await this.step(`Assert the todos' userId is correct`, async () => {
      const body = await this.parseBody(response);

      expect(body[0].userId).toEqual(userId);
    });
  }

  async assertCompletedIsCorrect(response, completed) {
    await this.step(`Assert the todos' completed is correct`, async () => {
      const body = await this.parseBody(response);

      expect(body[0].completed).toEqual(completed);
    });
  }
}
