import { expect } from '../../tests/_fixtures/fixtures';
import { BaseAPI } from './BaseAPI';
import { ENDPOINTS } from './constants/endpoints';

export class TodosAPI extends BaseAPI {
  /* constructor(request) {
    super(request);
    this.request = request;
  }
*/
  async getAllTodos() {
    return await this.step(`GET all todos`, async () => {
      return await this.request.get(ENDPOINTS.TODOS, {});
    });
  }

  async getAllTodosAndValidateResponse() {
    const response = await this.getAllTodos();
    await this.assertSuccessResponseCode(response);
    await this.assertBodyIsNotEmpty(response);
    return response;
  }

  async getNotCompletedTodosForUser(userId) {
    return await this.step(
      `GET not completed todos for userId=${userId}`,
      async () => {
        return await this.request.get(ENDPOINTS.TODOS, {
          params: {
            userId,
            completed: false,
          },
        });
      },
    );
  }

  async getCompletedTodosForUser(userId) {
    return await this.step(
      `GET completed todos for userId=${userId}`,
      async () => {
        return await this.request.get(ENDPOINTS.TODOS, {
          params: {
            userId,
            completed: true,
          },
        });
      },
    );
  }

  async assertUserIdIsCorrect(response, userId) {
    await this.step(`Assert userId is correct`, async () => {
      const body = await this.parseBody(response);
      expect(body.every(todo => todo.userId === userId)).toBe(true);
    });
  }

  async assertTodosAreCompleted(response) {
    await this.step(`Assert Todo has completed: true`, async () => {
      const body = await this.parseBody(response);
      expect(body.every(todo => todo.completed === true)).toBe(true);
    });
  }

  async assertTodosAreNotCompleted(response) {
    await this.step(`Assert Todo has completed: false`, async () => {
      const body = await this.parseBody(response);
      expect(body.every(todo => todo.completed === false)).toBe(true);
    });
  }
}
