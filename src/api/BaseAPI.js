import { expect } from '@playwright/test';
import { testStep } from '../common/helpers/pw';
import { SUCCESS_CODE } from './constants/responseCodes';

export class BaseAPI {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
  }

  /**
   * @template T
   * @param {string} title
   * @param {() => T | Promise<T>} stepToRun
   * @returns {Promise<T>}
   */
  async step(title, stepToRun) {
    return await testStep(title, stepToRun);
  }

  /**
   * @param {import('@playwright/test').APIResponse} response
   */
  parseStatus(response) {
    return response.status();
  }

  /**
   * @param {import('@playwright/test').APIResponse} response
   */
  async parseBody(response) {
    return await response.json();
  }

  /**
   * @param {import('@playwright/test').APIResponse} response
   */
  async assertSuccessResponseCode(response) {
    await this.step(`Assert the code ${SUCCESS_CODE} is returned`, async () => {
      expect(this.parseStatus(response)).toEqual(SUCCESS_CODE);
    });
  }

  /**
   * @param {import('@playwright/test').APIResponse} response
   */
  async assertBodyIsNotEmpty(response) {
    await this.step(`Assert response body is not empty`, async () => {
      const body = await this.parseBody(response);

      expect(body.length).toBeGreaterThan(0);
    });
  }

  /**
   * @param {import('@playwright/test').APIResponse} response
   * @param {string} name
   */
  async assertNameIsCorrect(response, name) {
    await this.step(`Assert the name is correct`, async () => {
      const body = await this.parseBody(response);

      expect(body.name).toEqual(name);
    });
  }

  /**
   * @param {import('@playwright/test').APIResponse} response
   * @param {string} color
   */
  async assertColorIsCorrect(response, color) {
    await this.step(`Assert the color is correct`, async () => {
      const body = await this.parseBody(response);

      expect(body.color).toEqual(color);
    });
  }

  async assertUserIdIsCorrect(response, userId) {
    await this.step(`Assert the userId is correct`, async () => {
      const body = await this.parseBody(response);

      expect(body.every(todo => todo.userId === userId)).toBe(true);
    });
  }

  async assertCompletedFieldIsCorrect(response) {
    await this.step(`Assert the completed field has true value`, async () => {
      const body = await this.parseBody(response);

      expect(body.every(todo => todo.completed === true)).toBe(true);
    });
  }

  async assertIncompletedFieldIsCorrect(response) {
    await this.step(
      `Assert the incompleted field has false value`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.every(todo => todo.completed === false)).toBe(true);
      },
    );
  }
}
