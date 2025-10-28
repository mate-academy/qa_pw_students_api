import { expect } from '../../tests/_fixtures/fixtures';
import { testStep } from '../common/helpers/pw';
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

  async getTodoById(id) {
    return await this.step(`GET todo by id`, async () => {
      return await this.request.get(`/students-api/todos/${id}`, {});
    });
  }

  async getCompletedTodos(userId) {
    return await this.step(`GET completed todos`, async () => {
      return await this.request.get('/students-api/todos', {
        params: { userId, completed: true },
      });
    });
  }

  async getTodosByUserIdAndCompleted(userId, completed) {
    return await this.step(`GET todos by userId and completed=${completed}`, async () => {
      return await this.request.get('/students-api/todos', {
        params: { userId, completed },
      });
    });
  }


  async getAnyCompletedTrueTodo() {
    return await this.step(`GET todos with completed = true`, async () => {
      return await this.request.get('/students-api/todos', {
        params: { completed: true },
      });
    });
  }

  async getAnyCompletedFalseTodo() {
    return await this.step(`GET todos with completed = false`, async () => {
      return await this.request.get('/students-api/todos', {
        params: { completed: false },
      });
    });
  }

  parseStatus(response) {
    return response.status();
  }

  async parseBody(response) {
    return await response.json();
  }

  async assertBodyIsNotEmpty(response) {
    return await this.step(`Assert response body is not empty`, async () => {
      const body = await this.parseBody(response);

      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);

      return body;
    });
  }

  async assertSuccessResponseCode(response) {
    await this.step(`Assert the code ${SUCCESS_CODE} is returned`, async () => {
      expect(this.parseStatus(response)).toEqual(SUCCESS_CODE);
    });
  }

  async assertIdIsCorrect(response, id) {
    await this.step(`Assert the todo' id is correct`, async () => {
      const body = await this.assertBodyIsNotEmpty(response);

      expect(body[0].userId).toEqual(id);
    });
  }

  async assertCompletedValue(response, expectedValue) {
    await this.step(`Assert the todo 'completed' value is ${expectedValue}`, async () => {
      const body = await this.assertBodyIsNotEmpty(response);
      expect(body[0].completed).toEqual(expectedValue);
    });
  }
}
