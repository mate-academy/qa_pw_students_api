import { expect } from '../../tests/_fixtures/fixtures';
import { testStep } from '../common/helpers/pw';
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

  async assertSuccessResponseCode(response) {
    await this.step(`Assert the code ${SUCCESS_CODE} is returned`, async () => {
      expect(this.parseStatus(response)).toEqual(SUCCESS_CODE);
    });
  }

  async assertBodyIsNotEmpty(response) {
    await this.step(`Assert response body is not empty`, async () => {
      const body = await this.parseBody(response);

      if (Array.isArray(body)) {
        expect(body.length).toBeGreaterThan(0);
      } else if (typeof body === 'object' && body !== null) {
        expect(Object.keys(body).length).toBeGreaterThan(0);
      } else {
        throw new Error(`Unexpected response body type: ${typeof body}`);
      }
    });
  }
}
