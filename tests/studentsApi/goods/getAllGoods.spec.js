import { test } from '../../_fixtures/fixtures';

test('GET all goods', async ({ goodsAPI }) => {
  const response = await goodsAPI.getAllGoods();

  await goodsAPI.assertSuccessResponseCode(response);
  await goodsAPI.assertBodyIsNotEmpty(response);
  await goodsAPI.assertSuccessResponseCode(response);
});
