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

  async getCompletedTodos(userId) {
    return await this.step(`GET completed todos`, async () => {
      return await this.request.get('/students-api/todos', {
        params: {
          completed: true,
          userId: userId,
        },
      });
    });
  }

  async getUncompletedTodos(userId) {
    return await this.step(`GET uncompleted todos`, async () => {
      return await this.request.get('/students-api/todos', {
        params: {
          completed: false,
          userId: userId,
        },
      });
    });
  }
}
