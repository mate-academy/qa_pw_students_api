import { testStep } from '../common/helpers/pw';
import { expect } from '../../tests/_fixtures/fixtures';
import { SUCCESS_CODE } from './constants/responceCodes';


export class BaseAPI {
  constructor(request) {
    this.request = request;
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun);
  }

  parseStatus(response) {
    return response.status();
  }

  async parseBody(response) {
    return await response.json();
  }

  async assertBodyIsNotEmpty(response) {
    await this.step('Assert response body is not empty', async () => {
      expect(this.parseBody(response)).not.toBe([]);
    });
  }

  async assertSuccessResponseCode(response) {
    await this.step(`Assert the code ${SUCCESS_CODE} is returned`, async () => {
      const statusCode = this.parseStatus(response)
      expect(statusCode).toEqual(SUCCESS_CODE);
    });
  }

}
