import { expect } from '../../tests/_fixtures/fixtures';
import { BaseAPI } from './BaseAPI';

export class GoodsAPI extends BaseAPI{
  constructor(request) {
    super(request);
  }

  async getAllGoods() {
    return await this.step(`GET all goods`, async () => {
      return await this.request.get('/students-api/goods', {});
    });
  }

  async getGoodById(id) {
    return await this.step(`GET good by id`, async () => {
      return await this.request.get(`/students-api/goods/${id}`, {});
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
