import { camelCaseToPhrase, capitalize } from './stringHelpers';

export function parseTestTreeHierarchy(fileName, logger) {
  const fileNameNormalized = fileName.replaceAll('\\', '/');
  const testFolder = 'tests/';

  const attributesCamelCase = fileNameNormalized
    .substring(fileNameNormalized.indexOf(testFolder) + testFolder.length)
    .split('/');

  let attributes = attributesCamelCase.map(attribute =>
    capitalize(camelCaseToPhrase(attribute)),
  );

  if (attributes[1].includes('.spec.js')) {
    attributes = attributes.slice(0, 1);
  } else if (attributes[2].includes('.spec.js')) {
    attributes = attributes.slice(0, 2);
  }

  logger.debug(`Parsed test hierarchy: ${JSON.stringify(attributes)}`);

  return attributes;
}
