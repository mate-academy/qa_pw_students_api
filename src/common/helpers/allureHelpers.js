import { camelCaseToPhrase, capitalize } from './stringHelpers';

export function parseTestTreeHierarchy(fileName, logger) {
  const normalizedFileName = fileName.replace(/\\/g, '/');

  const testFolder = 'tests/';

  const testFolderIndex = normalizedFileName.indexOf(testFolder);

  if (testFolderIndex === -1) {
    throw new Error(`Cannot find "${testFolder}" in file path: ${fileName}`);
  }

  const attributesCamelCase = normalizedFileName
    .substring(testFolderIndex + testFolder.length)
    .split('/');

  let attributes = attributesCamelCase.map(attribute =>
    capitalize(camelCaseToPhrase(attribute)),
  );

  const specFileIndex = attributes.findIndex(attribute =>
    attribute.includes('.spec.js'),
  );

  if (specFileIndex !== -1) {
    attributes = attributes.slice(0, specFileIndex);
  }

  logger.debug(`Parsed test hierarchy: ${JSON.stringify(attributes)}`);

  return attributes;
}
