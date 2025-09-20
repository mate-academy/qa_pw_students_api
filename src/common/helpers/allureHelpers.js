import { camelCaseToPhrase, capitalize } from './stringHelpers.js';

export function parseTestTreeHierarchy(fileName) {
  if (!fileName) return [];
  const normalized = String(fileName).replace(/\\/g, '/');
  const testsMatch = /\/tests(?:\/|$)/i.exec(normalized);
  const afterTests = testsMatch
    ? normalized.slice(testsMatch.index + testsMatch[0].length)
    : normalized;
  let parts = afterTests.split('/').filter(Boolean);
  const last = parts[parts.length - 1] || '';
  if (/\.(spec|test)\.(t|j)sx?$/i.test(last)) {
    parts = parts.slice(0, -1);
  }
  const attributes = parts.map((p) => capitalize(camelCaseToPhrase(p)));
  return attributes;
}
