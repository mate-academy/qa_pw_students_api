import { expect } from '../../tests/_fixtures/fixtures';
import { BaseAPI } from './BaseAPI';

export class ToDosAPI extends BaseAPI {
  constructor(request) {
    super(request);
  }

  async getAllTodos(params = {}) {
    return await this.step(`GET all ToDos`, async () => {
      return await this.request.get('/students-api/todos', { params });
    });
  }

  async getTodoById(id) {
    return await this.step(`GET ToDo by id`, async () => {
      return await this.request.get(`/students-api/todos/${id}`, {});
    });
  }

  async assertAllTodosCompleted(response) {
    await this.step(`Assert all ToDos are completed`, async () => {
      const body = await this.parseBody(response);
      const allCompleted = body.every(el => el.completed);

      expect(allCompleted).toBe(true);
    });
  }

  async assertAllTodosNotCompleted(response) {
    await this.step(`Assert all todos are not completed`, async () => {
      const body = await this.parseBody(response);
      const allNotCompleted = body.every(el => !el.completed);

      expect(allNotCompleted, 'List of completed ToDos').toBe(true);
    });
  }

  async assertAllTodosBelongToUser(response, userId) {
    await this.step(`Assert all todos belong to user ${userId}`, async () => {
      const body = await this.parseBody(response);
      const allBelongToUser = body.every(el => el.userId === userId);

      expect(allBelongToUser, 'List of NOT completed ToDos').toBe(true);
    });
  }
}
