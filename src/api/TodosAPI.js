import { expect } from '../../tests/_fixtures/fixtures';
import { BaseAPI } from './BaseAPI';

export class TodosAPI extends BaseAPI {
  constructor(request) {
    super(request);
  }
 

async getAllToDos() {
    return await this.step(`Get all todos`, async () => {
    return await this.request.get('/students-api/todos', {});
    })
}
 


async assertUserIdCorrect(todo, userId) {
     await this.step(`Assert the user id is correct`, async () => {
          expect(todo.userId).toEqual(userId);
        });
  }



async assertCompletedFieldCorrect(body, completed) {
    await this.step(`Assert the completed field is correct`, async () => {
        expect(body.completed).toEqual(completed);
    });
}

async getCompletedTodosByUserId(userId) {
    return await this.step(`Get completed todos by userId`, async () => {
        return await this.request.get('/students-api/todos', { params: { userId, completed: true } });
    });

}
async getNotCompletedTodosByUserId(userId) {
    return await this.step(`Get not completed todos by userId`, async () => {
        return await this.request.get('/students-api/todos', { params: { userId, completed: false } });
    });

}
}