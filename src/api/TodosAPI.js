import { expect, testStep } from '../common/helpers/pw';
import { SUCCESS_CODE } from './constants/responceCodes';

export class TodosAPI {
  constructor(request) {
    this.request = request;
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun);
  }

  async getAllTodos() {
    return await this.step(`GET all todos`, async () => {
      return await this.request.get('/students-api/todos', {});
    });
  }

  async getTodosByUserIdAndCompletionStatus(userId, completed) {
    return await this.step(
      `GET todos by userId and completion status`,
      async () => {
        return await this.request.get('/students-api/todos', {
          params: {
            userId: userId,
            completed: completed,
          },
        });
      },
    );
  }

  parseStatus(response) {
    return response.status();
  }

  async parseBody(response) {
    return await response.json();
  }

  async assertSuccessResponseCode(response) {
    await this.step(`Assert the code ${SUCCESS_CODE} is returned`, async () => {
      expect(this.parseStatus(response)).toEqual(SUCCESS_CODE);
    });
  }

  async assertBodyIsNotEmpty(response) {
    await this.step(`Assert response body is not empty`, async () => {
      const body = await this.parseBody(response);

      expect(body).not.toBe([]);
    });
  }
}
