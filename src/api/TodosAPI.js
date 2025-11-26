// helpers/api/TodosAPI.js
import { BaseAPI } from './BaseAPI';
import { test } from '@playwright/test';

export class TodosAPI extends BaseAPI {
  constructor(request) {
    super(request, '/todos');
  }

  async getAllTodos() {
    return test.step('GET all todos', async () => {
      return this.get('');
    });
  }

  async getTodosByUser(userId) {
    return test.step(`GET todos for user ${userId}`, async () => {
      return this.get(`?userId=${userId}`);
    });
  }

  async getCompletedTodos(userId) {
    return test.step(`GET completed todos for user ${userId}`, async () => {
      return this.get(`?userId=${userId}&completed=true`);
    });
  }

  async getNotCompletedTodos(userId) {
    return test.step(`GET not completed todos for user ${userId}`, async () => {
      return this.get(`?userId=${userId}&completed=false`);
    });
  }
}
