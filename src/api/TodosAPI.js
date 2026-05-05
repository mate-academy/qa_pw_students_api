import { expect } from '../../tests/_fixtures/fixtures';
import { BaseAPI } from './BaseAPI';

export class TodosAPI extends BaseAPI{
  constructor(request) {
    super(request);
  }

  async getAllTodos() {
    return await this.step(`GET all todos`, async () => {
      return await this.request.get('/students-api/todos', {});
    });
  }

  async getCompletedTodosById(userId) {
    return await this.step(`GET completed todos by id`, async () => {
      return await this.request.get(
        `/students-api/todos`, 
        { params: { 'userId': userId, 'completed': true} });
    });
  }

  async getNotCompletedTodosById(userId) {
    return await this.step(`GET not completed todos by id`, async () => {
      return await this.request.get(
        `/students-api/todos`, 
        { params: { 'userId': userId, 'completed': false} });
    });
  }

  async assertStatusIsCorrect(response, status) {
    await this.step(`Assert the todos status is correct`, async () => {
      const body = await this.parseBody(response);

      expect(body[0].completed).toEqual(status);
    });
  }

  async assertUserIdIsCorrect(response, id) {
    await this.step(`Assert the todos userId is correct`, async () => {
      const body = await this.parseBody(response);

      expect(body[0].userId).toEqual(id);
    });
  }
}
