import { camelCaseToPhrase, capitalize } from './stringHelpers';

export function parseTestTreeHierarchy(fileName, logger) {
  const testFolder = 'tests/';

  const attributesCamelCase = fileName
    .substring(fileName.indexOf(testFolder) + testFolder.length)
    .split('/');

  let attributes = attributesCamelCase.map(attribute =>
    capitalize(camelCaseToPhrase(attribute)),
  );

  // Safety check: only access attributes[i] when it exists
  const has1 = typeof attributes[1] === 'string';
  const has2 = typeof attributes[2] === 'string';

  if (has1 && attributes[1].includes('.spec.js')) {
    attributes = attributes.slice(0, 1);
  } else if (has2 && attributes[2].includes('.spec.js')) {
    attributes = attributes.slice(0, 2);
  }

  logger.debug(`Parsed test hierarchy: ${JSON.stringify(attributes)}`);

  return attributes;
}
