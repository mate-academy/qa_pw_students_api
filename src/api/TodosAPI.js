import { expect } from '../../tests/_fixtures/fixtures';
import { BaseAPI } from './BaseAPI';

export class TodosAPI extends BaseAPI {
  async getAllTodos() {
    return await this.step(`GET all todos`, async () => {
      return await this.request.get('/students-api/todos', {});
    });
  }

  async getNotCompletedTodosForUser(userId) {
    return await this.step(`GET not completed todos for user ${userId}`, async () => {
      return await this.request.get('/students-api/todos', { params: { userId, completed: false } });
    });
  }

  async getCompletedTodosForUser(userId) {
    return await this.step(`GET completed todos for user ${userId}`, async () => {
      return await this.request.get('/students-api/todos', { params: { userId, completed: true } });
    });
  }

  async assertUserIdIsCorrect(response, expectedUserId) {
    await this.step(`Assert the userId is ${expectedUserId}`, async () => {
      const body = await this.parseBody(response);
      const actualUserId = Array.isArray(body) ? body[0].userId : body.userId;
      expect(actualUserId).toEqual(expectedUserId);
    });
  }

  async assertCompletedIsCorrect(response, expectedStatus) {
    await this.step(`Assert the completed status is ${expectedStatus}`, async () => {
      const body = await this.parseBody(response);
      const actualStatus = Array.isArray(body) ? body[0].completed : body.completed;
      expect(actualStatus).toEqual(expectedStatus);
    });
  }

  async getFirstTodoUserIdByStatus(isCompleted) {
    return await this.step(`Extract userId where completed is ${isCompleted}`, async () => {
        const response = await this.getAllTodos();
        const body = await this.parseBody(response);
        
        const foundTodo = body.find(todo => todo.completed === isCompleted);
        
        if (!foundTodo) {
            throw new Error(`Could not find any todo with completed status: ${isCompleted}`);
        }
        
        return foundTodo.userId;
    });
  }
}