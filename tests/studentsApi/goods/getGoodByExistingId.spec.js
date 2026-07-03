import { test } from '../../_fixtures/fixtures';

let good;

test.beforeEach(async ({ goodsAPI }) => {
  const response = await goodsAPI.getAllGoods();

  await goodsAPI.assertSuccessResponseCodeReceived(response);

  const body = await goodsAPI.parseBody(response);

  good = body[0];
});

test('GET good by existing good Id', async ({ goodsAPI }) => {
  const goodId = good.id;
  const name = good.name;
  const color = good.color;
  const response = await goodsAPI.getGoodById(goodId);

  await goodsAPI.assertSuccessResponseCodeReceived(response);
  await goodsAPI.assertNameIsCorrect(response, name);
  await goodsAPI.assertColorIsCorrect(response, color);
});
