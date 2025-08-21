import { BaseAPI } from './BaseAPI';
import {
  COMPLETED_STATUS,
  NOT_COMPLETED_STATUS,
} from './constants/responceCodes';
import { expect } from '../../tests/_fixtures/fixtures';


export class TodosAPI extends BaseAPI {
  constructor(request) {
    super(request);
  }

  async getAllTodos() {
    return  this.step('GET all todos', async () => {
      return await this.request.get('/students-api/todos', {});
    });
  }

  async getTodosByUserId(userId, completed) {
    return this.step('Get todos by user id', async () => {
      const reqParams = {
        params: {
          userId,
          completed,
        },
      };
      return await this.request.get('/students-api/todos', reqParams);
    })
  }

  async getUserIdByCompletedTodo(response) {
    let searchedUserId;

    await this.step('Get user with completed status', async () => {
      for (const todo of await this.parseBody(response)) {

        if (todo.completed === COMPLETED_STATUS) {
          searchedUserId = todo.userId;
          break;
        }
      }
    });

    return await searchedUserId;
  }

  async getUserIdByNotCompletedTodo(response) {
    let searchedUserId;

    await this.step('Get user with NOT completed status', async () => {
      for (const todo of await this.parseBody(response)) {

        if (todo.completed === NOT_COMPLETED_STATUS) {
          searchedUserId = todo.userId;
          break;
        }
      }
    });

    return await searchedUserId;
  }

  async assertFieldIsCorrect(response, field, compareValue) {
    await this.step(
      `Assert that the ${field} field has correct ${compareValue}`,
      async () =>
      {
        const todos = await this.parseBody(response);
        expect(todos.at(0)[field]).toBe(compareValue);
      });
  }

}
