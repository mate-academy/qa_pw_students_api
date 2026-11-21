import { expect } from '../../tests/_fixtures/fixtures';
import { BaseAPI } from './BaseAPI';

export class TodosAPI extends BaseAPI {
  constructor(request) {
    super(request);
  }

  async getAllToDos() {
    return await this.step(`GET all todos`, async () => {
      return await this.request.get('/students-api/todos', {});
    });
  }

  async getCompletedToDosByUserId(userId) {
    return await this.step(
      `GET completed To Dos todos per user ${userId}`,
      async () => {
        return await this.request.get('/students-api/todos', {
          params: { userId, completed: true },
        });
      },
    );
  }

  async getNotCompletedToDosByUserId(userId) {
    return await this.step(
      `GET not completed To Dos todos per user ${userId}`,
      async () => {
        return await this.request.get('/students-api/todos', {
          params: { userId, completed: false },
        });
      },
    );
  }

  async getUserIdWithCompletedToDos(response) {
    return await this.step(`Get userId with completed To Dos`, async () => {
      const body = await this.parseBody(response);
      const completedTodo = body.find(todo => todo.completed === true);
      const userId = completedTodo.userId;

      return userId;
    });
  }

  async getUserIdWithNotCompletedToDos(response) {
    return await this.step(`Get userId with uncompleted To Dos`, async () => {
      const body = await this.parseBody(response);
      const completedTodo = body.find(todo => todo.completed === false);
      const userId = completedTodo.userId;

      return userId;
    });
  }

  async assertAllToDosCompleted(response) {
    await this.step(`Assert all To Dos completed`, async () => {
      const body = await this.parseBody(response);
      expect(body.length).toBeGreaterThan(0);
      expect(body.every(todo => todo.completed === true)).toBe(true);
    });
  }

  async assertAllToDosNotCompleted(response) {
    await this.step(`Assert all To Dos not completed`, async () => {
      const body = await this.parseBody(response);
      expect(body.length).toBeGreaterThan(0);
      expect(body.every(todo => todo.completed === false)).toBe(true);
    });
  }

  async assertAllToDosHaveUserId(response, userId) {
    await this.step(`Assert all To Dos from user`, async () => {
      const body = await this.parseBody(response);
      expect(body.length).toBeGreaterThan(0);
      expect(body.every(todo => todo.userId === userId)).toBe(true);
    });
  }
}
