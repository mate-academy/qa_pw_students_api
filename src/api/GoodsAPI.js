import { expect } from '../../tests/_fixtures/fixtures';
import { testStep } from '../common/helpers/pw';
import { BaseAPI } from './BaseAPI';
import { SUCCESS_CODE } from './constants/responceCodes';

export class GoodsAPI extends BaseAPI{
  #url = '/students-api/goods';

  async getAllGoods() {
    return await this.step(`GET all goods`, async () => {
      return await this.request.get(this._getUrl(), {});
    });
  }

  async getGoodById(id) {
    return await this.step(`GET good by id`, async () => {
      return await this.request.get(`${this._getUrl()}/${id}`, {});
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
