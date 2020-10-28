import { RuleFunction, MDXError } from '../linter';

import path from 'path';
import fs from 'fs';

import { Node } from 'unist';
import visit from 'unist-util-visit';
import parseImports, { ImportStatement } from 'parse-es6-imports';

const flexibleExists = (filename: string) => {
  return (
    fs.existsSync(filename) ||
    fs.existsSync(filename + '.js') ||
    fs.existsSync(filename + '.jsx') ||
    fs.existsSync(filename + '.ts') ||
    fs.existsSync(filename + '.tsx')
  );
};

const resolveImport = (
  item: ImportStatement,
  filename: string,
  node: Node,
): MDXError | undefined => {
  if (item.defaultImport && item.fromModule === 'next/link') {
    const relativeImport = path.relative(
      path.dirname(path.resolve(filename)),
      path.resolve('./components/Link'),
    );
    return {
      message: `Vanilla next/link import not allowed. Please use ${relativeImport}`,
      position: node.position,
      filePath: filename,
    };
  }

  let module;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    module = require(item.fromModule);
  } catch (error) {
    const relativeResolved = path.resolve(filename, '../', item.fromModule);
    if (flexibleExists(relativeResolved)) {
      return;
    }

    return {
      message: `Module \'${item.fromModule}\' not found`,
      position: node.position,
      filePath: filename,
    };
  }
};

const resolveImports: RuleFunction = (node, metadata) => {
  let errors: MDXError[] = [];
  visit(node, 'import', (node) => {
    const parsed = parseImports(node.value as string);
    errors = [
      ...errors,
      ...parsed.flatMap((importStatement) => {
        const resolved = resolveImport(
          importStatement,
          metadata.filePath,
          node,
        );
        if (resolved !== undefined) return [resolved];
        return [];
      }),
    ];
  });

  return errors;
};

export default resolveImports;

// const absoluteFilename = path.resolve(filename);
// console.log('\n' + chalk.underline(absoluteFilename));
