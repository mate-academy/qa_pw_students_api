import { test } from '../../_fixtures/fixtures';

let good;

test.beforeEach(async ({ goodsAPI, baseAPI }) => {
  const response = await goodsAPI.getAllGoods();

  await baseAPI.assertSuccessResponseCode(response);

  const body = await baseAPI.parseBody(response);

  good = body[0];
});

test('GET good by existing good Id', async ({ goodsAPI, baseAPI }) => {
  const goodId = good.id;
  const name = good.name;
  const color = good.color;
  const response = await goodsAPI.getGoodById(goodId);

  await baseAPI.assertSuccessResponseCode(response);
  await baseAPI.assertNameIsCorrect(response, name);
  await baseAPI.assertColorIsCorrect(response, color);
});
