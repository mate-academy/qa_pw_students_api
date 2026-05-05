import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as goodsAPITest } from './fixturesGoodsAPI';
import { test as TodosAPI } from './fixturesTodosAPI';

export const test = mergeTests(genericTest, goodsAPITest, TodosAPI);

export { expect } from '@playwright/test';
