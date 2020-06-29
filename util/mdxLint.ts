import glob from 'glob';
import fs from 'fs';
import remark from 'remark';
import mdx from 'remark-mdx';
import { Node } from 'unist';
import visit from 'unist-util-visit';
import parseImports, { ImportStatement } from 'parse-es6-imports';
import chalk from 'chalk';
// import matter from 'gray-matter';

import frontmatter from 'remark-frontmatter';
import path from 'path';

// components/SmallSteps.tsx:49:46 - error TS2769: No overload matches this call.

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
  filenamePrinted = false,
): boolean => {
  let module;
  try {
    module = require(item.fromModule);
  } catch (error) {
    const relativeResolved = path.resolve(filename, '../', item.fromModule);
    if (flexibleExists(relativeResolved)) {
      return filenamePrinted;
    }

    if (!filenamePrinted) {
      const absoluteFilename = path.resolve(filename);
      console.log('\n' + chalk.underline(absoluteFilename));
      filenamePrinted = true;
    }

    // util/mdxLint.ts:18:5 - error TS2448: Block-scoped variable 'imports' used before its declaration.
    console.error(
      `  ${node.position?.start.line}:${node.position?.start.column}` +
        chalk.red('  error  ') +
        `module \'${item.fromModule}\' not found`,
    );
  }

  return filenamePrinted;
};

const processFile = (file: string) => {
  const page = fs.readFileSync(file);
  const tree = remark().use(frontmatter, ['yaml']).use(mdx).parse(page);
  let filenamePrinted = false;

  visit(tree, 'import', (node) => {
    const parsed = parseImports(node.value as string);

    parsed.map((item) => {
      filenamePrinted = resolveImport(item, file, node, filenamePrinted);
    });
  });
};

const lintMdx = () => {
  const results = glob.sync('./pages/**/*.mdx');

  results.forEach((path) => {
    processFile(path);
  });

  console.log('');
};

lintMdx();
