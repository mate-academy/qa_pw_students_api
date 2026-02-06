import { expect } from '@playwright/test';
import { BaseAPI } from './BaseAPI';

export class TodosAPI extends BaseAPI {
  // BaseAPI provides: step(), parseStatus(), parseBody(),
  // assertSuccessResponseCode(), assertBodyIsNotEmpty()

  async getAllTodos() {
    return await this.step(`GET all todos`, async () => {
      return await this.request.get('/students-api/todos', {});
    });
  }

  async getTodoById(id) {
    return await this.step(`GET todo by id`, async () => {
      return await this.request.get(`/students-api/todos/${id}`, {});
    });
  }

  async getTodosByParams(params) {
    return await this.step(`GET todos by params`, async () => {
      return await this.request.get('/students-api/todos', { params });
    });
  }

  async getCompletedTodosForUser(userId) {
    return await this.step(`GET completed todos for userId=${userId}`, async () => {
      return await this.getTodosByParams({ userId, completed: true });
    });
  }

  async getNotCompletedTodosForUser(userId) {
    return await this.step(
      `GET not completed todos for userId=${userId}`,
      async () => {
        return await this.getTodosByParams({ userId, completed: false });
      },
    );
  }

  async assertUserIdIsCorrect(response, userId) {
    await this.step(`Assert userId field is correct`, async () => {
      const body = await this.parseBody(response);

      const todos = Array.isArray(body) ? body : [body];
      for (const todo of todos) {
        expect(todo.userId).toEqual(userId);
      }
    });
  }

  async assertCompletedIsCorrect(response, completed) {
    await this.step(`Assert completed field is correct`, async () => {
      const body = await this.parseBody(response);

      const todos = Array.isArray(body) ? body : [body];
      for (const todo of todos) {
        expect(todo.completed).toEqual(completed);
      }
    });
  }
}
