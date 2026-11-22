import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as goodsAPITest } from './fixturesGoodsAPI';
import { test as todosAPITest } from './fixturesTodosApi';

export const test = mergeTests(genericTest, goodsAPITest, todosAPITest);

export { expect } from '@playwright/test';
