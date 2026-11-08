import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as goodsAPITests } from './fixturesGoodsAPI';
import { test as todosAPITests } from './fixturesTodosAPI';


export const test = mergeTests(genericTest, goodsAPITests, todosAPITests);

export { expect } from '@playwright/test';
