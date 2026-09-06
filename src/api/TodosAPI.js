import { BaseAPI } from './BaseAPI';

export class TodosAPI extends BaseAPI {
  async getAllTodos() {
    return await this.step(`GET all todos`, async () => {
      return await this.request.get('/students-api/todos', {});
    });
  }

  async getTodosById(id) {
    return await this.step(`GET todos by id`, async () => {
      return await this.request.get(`/students-api/todos/${id}`, {});
    });
  }

  async getTodosByUserIdAndStatus(userId, completed) {
    return await this.step(`GET completed Todos by id`, async () => {
      return await this.request.get(`/students-api/todos`, {
        params: {
          userId,
          completed,
        },
      });
    });
  }
}
