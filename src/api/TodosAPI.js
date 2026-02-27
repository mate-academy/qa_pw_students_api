// import { expect } from '../../tests/_fixtures/fixtures';
import { expect } from '../../tests/_fixtures/fixtures';
import { BaseAPI } from './BaseAPI';

export class TodosAPI extends BaseAPI {
  constructor(request) {
    super(request)
  }

  async getAllTodos(options = {}) {
    return await this.step(`GET all todos`, async () => {
      return await this.request.get('/students-api/todos', options);
    });
  }

  async findTodo(response, status) {
    return await this.step(
      `Find todo with parameter - completed: ${status}`,
      async () => {
        const body = await this.parseBody(response);
        const todo = body.find(item => item.completed === status);

        expect(
          todo,
          `Todo with completed=${status} was not found`
        )
          .toBeDefined();

        return todo;
      }
    );
  }

  async assertUserIdFieldIsCorrect(response, value) {
    await this.step(
      `Assert that the 'userId' field has correct value`,
      async () => {
        const body = await this.parseBody(response);

        for (const todo of body) {
          expect(todo.userId).toEqual(value);
        }
    });
  }

  async assertCompletedFieldIsCorrect(response, value) {
    await this.step(
      `Assert that the 'completed' field field has correct value`,
      async () => {
        const body = await this.parseBody(response);

        for (const todo of body) {
          expect(todo.completed).toEqual(value);
        }
    });
  }
}