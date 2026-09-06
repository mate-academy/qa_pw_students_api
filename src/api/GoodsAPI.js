import { BaseAPI } from './BaseAPI';

export class GoodsAPI extends BaseAPI {
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
}
