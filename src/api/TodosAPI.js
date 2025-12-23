import { BaseAPI } from './BaseAPI';

export class TodosAPI extends BaseAPI {
  async getAllTodos() {
    return await this.get('/todos', 'Get all todos');
  }

  async getTodosForUser(userId) {
    return await this.get(
      `/todos?userId=${userId}`,
      `Get todos for user ${userId}`,
    );
  }

  async getCompletedTodosForUser(userId) {
    return await this.get(
      `/todos?userId=${userId}&completed=true`,
      `Get completed todos for user ${userId}`,
    );
  }

  async getNotCompletedTodosForUser(userId) {
    return await this.get(
      `/todos?userId=${userId}&completed=false`,
      `Get not completed todos for user ${userId}`,
    );
  }
}
