import { testStep } from "../common/helpers/pw";
import { SUCCESS_CODE } from "./constants/responceCodes";
import { expect } from "../common/helpers/pw";
import { BaseAPI } from "./BaseAPI";

export class TodosAPI extends BaseAPI{
  _url = '/students-api/todos';

  async getAllTodos(options = {
    params: {
      userId: undefined,
      completed: undefined,
    }
  }) {
    return await this.step('GET all todos', async () => {
      return await this.request.get(this._getUrl(), options);
    });
  }
}