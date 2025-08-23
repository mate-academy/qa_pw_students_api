import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as allAPITest } from './fixturesAPIs';

export const test = mergeTests(genericTest, allAPITest);

export { expect } from '@playwright/test';
