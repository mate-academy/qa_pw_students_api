import { expect, testStep } from "../common/helpers/pw";
import { SUCCESS_CODE } from "./constants/responceCodes";

export class BaseAPI {
  _url;
  
  constructor(request) {
    this.request = request;
  }

  _getUrl() {
    if (this._url) {
      return this._url;
    }
    throw new Error('URL is not defined');
  }

  parseStatus(response) {
    return response.status();
  }

  async parseBody(response) {
    return await response.json();
  }

  assertTodoFieldEquals(todo, field, expectedValue) {
    return this.step(`Assert that the ${field} field in the todo entry is equal to ${expectedValue}`, async () => {
      expect(todo[field]).toEqual(expectedValue);
    });
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

  async step(title, stepToRun) {
    return await testStep(title, stepToRun);
  }
}