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

  async getTodosBy(params) {
    return await this.step(`GET todos by params`, async () => {
      return await this.request.get('/students-api/todos', { params });
    });
  }

  async getCompletedTodosByUser(userId) {
    return await this.step(`GET completed todos by userId ${userId}`, async () => {
      return await this.request.get('/students-api/todos', {
        params: { userId, completed: true },
      });
    });
  }

  async getNotCompletedTodosByUser(userId) {
    return await this.step(`GET not-completed todos by userId ${userId}`, async () => {
      return await this.request.get('/students-api/todos', {
        params: { userId, completed: false },
      });
    });
  }
}
