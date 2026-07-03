import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as goodsAPITest } from './fixturesGoodsAPI';
import { test as toDoAPITest } from './fixturesTodosApi';

export const test = mergeTests(genericTest, goodsAPITest, toDoAPITest);

export { expect } from '@playwright/test';
