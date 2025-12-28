import { expect } from '../../tests/_fixtures/fixtures';
import { SUCCESS_CODE } from './constants/responceCodes';
import { testStep } from '../common/helpers/pw';

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

  async assertSuccessResponseCode(response) {
    await this.step(`Assert the code ${SUCCESS_CODE} is returned`, async () => {
      expect(this.parseStatus(response)).toEqual(SUCCESS_CODE);
    });
  }

  async assertBodyIsNotEmpty(response) {
    await this.step(`Assert response body is not empty`, async () => {
      const body = await this.parseBody(response);

      expect(body).not.toEqual([]);
    });
  }

  async assertNameIsCorrect(response, name) {
    await this.step(`Assert the good' name is correct`, async () => {
      const body = await this.parseBody(response);

      expect(body.name).toEqual(name);
    });
  }

  async assertColorIsCorrect(response, color) {
    await this.step(`Assert the good' color is correct`, async () => {
      const body = await this.parseBody(response);

      expect(body.color).toEqual(color);
    });
  }
}
