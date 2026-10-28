import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as goodsAPITest } from './fixturesGoodsAPI';
import { test as todosApiTest } from './fixturesTodosApi';

export const test = mergeTests(genericTest, goodsAPITest, todosApiTest);

export { expect } from '@playwright/test';
