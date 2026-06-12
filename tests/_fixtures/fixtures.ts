import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as goodsAPITest } from './fixturesGoodsAPI';
import { test as TodosAPITest } from './fixturesTodosAPI';

export const test = mergeTests(genericTest, goodsAPITest, TodosAPITest);

export { expect } from '@playwright/test';
