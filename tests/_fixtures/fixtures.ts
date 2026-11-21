import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as goodsAPITest } from './fixturesGoodsAPI';
import { test as toDosAPITest } from './fixturesToDosAPI';

export const test = mergeTests(genericTest, goodsAPITest, toDosAPITest);

export { expect } from '@playwright/test';
