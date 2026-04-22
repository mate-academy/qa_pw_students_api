import { expect } from '../../tests/_fixtures/fixtures';
import { testStep } from '../common/helpers/pw';
import { BaseAPI } from './BaseAPI';
import { SUCCESS_CODE } from './constants/responceCodes';

export class TodosAPI extends BaseAPI {
  constructor(request) {
    super(request);
  }

  async getAllTodos() {
    return await this.step(`GET all todos`, async () => {
      return await this.request.get('/students-api/todos', {});
    });
  }

  async getNotCompletedTodos(userId) {
    return await this.step(`GET not completed todos`, async () => {
      return await this.request
        .get(`/students-api/todos`, { params: { userId, completed: false } });
    })
  }

  async getCompletedTodos(userId) {
    return await this.step(`GET completed todos`, async () => {
      return await this.request
        .get(`/students-api/todos`, { params: { userId, completed: true } });
    })
  }

  async assertUserIDIsCorrect(response, id) {
    await this.step(`Assert the todo's userId is correct`, async () => {
      const body = await this.parseBody(response);

      body.forEach(entry => {
        expect(entry.userId).toEqual(id);
      });
    });
  }

  async assertCompletedStatusIsCorrect(response, completed) {
    await this.step(`Assert the todo's completed status is correct`,
      async () => {
        const body = await this.parseBody(response);

        body.forEach(entry => {
          expect(entry.completed).toEqual(completed);
        });
      });
  }
}