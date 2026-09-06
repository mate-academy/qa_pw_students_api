import { test } from '../../_fixtures/fixtures';

test('GET all goods', async ({ goodsAPI, baseAPI }) => {
  const response = await goodsAPI.getAllGoods();

  await baseAPI.assertSuccessResponseCode(response);
  await baseAPI.assertBodyIsNotEmpty(response);
});
