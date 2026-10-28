import { BaseAPI } from './BaseAPI';
import { expect } from '../../tests/_fixtures/fixtures';

export class TodosAPI extends BaseAPI {
  constructor(request) {
    super(request);
  }

  async getAllTodos() {
    return await this.step(`GET all Todos`, async () => {
      return await this.request.get('/students-api/todos', {});
    });
  }

  async getTodosById(id) {
    return await this.step(`GET todos by id`, async () => {
      return await this.request.get(`/students-api/todos/${id}`, {});
    });
  }

  async getTodosByUserAndStatus(userId, completed) {
    return await this.step(`GET todos by user and status`, async () => {
      return await this.request.get('/students-api/todos', {
        params: { userId, completed },
      });
    });
  }

  async assertUserIdIsCorrect(response, userId) {
    await this.step(`Assert all todos have userId ${userId}`, async () => {
      const body = await this.parseBody(response);

      for (const todo of body) {
        expect(todo.userId).toEqual(userId);
      }
    });
  }

  async assertCompletedIsCorrect(response, completed) {
    await this.step(`Assert completed todos is correct`, async () => {
      const body = await this.parseBody(response);

      for (const todo of body) {
        expect(todo.completed).toEqual(completed);
      }
    });
  }
}
