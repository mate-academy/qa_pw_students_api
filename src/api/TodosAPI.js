import { BaseAPI } from './BaseAPI';

export class TodosAPI extends BaseAPI {
  async getAllTodos() {
    return await this.step(`GET all todos`, async () => {
      return await this.request.get('/todos', {});
    });
  }

  async getTodosForUserByCompleted(userId, completed) {
    return await this.step(
      `GET todos for userId=${userId} completed=${completed}`,
      async () => {
        return await this.request.get('/todos', {
          params: { userId, completed },
        });
      },
    );
  }
}
