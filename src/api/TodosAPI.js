import { expect } from '../../tests/_fixtures/fixtures';
import { BaseAPI } from './BaseAPI';

export class TodosAPI extends BaseAPI {
  async getAllTodos() {
    return await this.step(`Get All TODOs`, async () => {
      return await this.request.get('/students-api/todos', {});
    });
  }

  async getTodosByUserIdAndCompleteStatus(userId, isComplete) {
    return await this.step(
      `Get TODOs from userId=${userId} with complete status=${isComplete}`,
      async () => {
        return await this.request.get('/students-api/todos', {
          params: { userId, completed: isComplete },
        });
      },
    );
  }

  async assertUserIdIsCorrect(response, userId) {
    await this.step(
      `Assert response body has TODOs from userId=${userId}`,
      async () => {
        const body = await this.parseBody(response);

        body.forEach(todo => {
          expect(todo.userId).toBe(userId);
        });
      },
    );
  }

  async assertAllTodosCompleteStatus(response, isCompleted) {
    await this.step(
      `Assert all todos in response body have complete status '${isCompleted}'`,
      async () => {
        const body = await this.parseBody(response);

        body.forEach(todo => {
          expect(todo.completed).toBe(isCompleted);
        });
      },
    );
  }
}
