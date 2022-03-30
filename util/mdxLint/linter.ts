/* eslint-disable no-console */
import glob from 'glob';
import fs from 'fs';
import path from 'path';

import { remark } from 'remark';
import mdx from 'remark-mdx';
import slug from 'remark-slug';
import headingIds from 'remark-heading-id';
import frontmatter from 'remark-frontmatter';
import { Node, Position } from 'unist';

import chalk from 'chalk';
import { shouldCreateCheck, createCheck } from './github';

export interface MDXError {
  message: string;
  formattedMessage?: string;
  position?: Position;
  filePath: string;
}

export interface RuleFunctionMetadata {
  filePath: string;
}

export type RuleFunction = (
  node: Node,
  metadata: RuleFunctionMetadata,
) => MDXError[];

export const logError = (error: MDXError): void => {
  if (error.position == null) {
    console.error(chalk.gray(`  ---`) + chalk.red('  error  ') + error.message);
  } else {
    const positionString = `${error.position.start.line}:${error.position.start.column}`;
    const paddedPositionString = `${positionString}${' '.repeat(
      Math.max(8 - positionString.length, 0),
    )}`;

    console.error(
      `  ${paddedPositionString}` +
        chalk.red('  error  ') +
        (error.formattedMessage || error.message),
    );
  }
};

const lintMdx = (rules: RuleFunction[]): number => {
  console.log('\n🦺 Linting MDX files in pages directory');

  const files = glob.sync('./pages/**/*.mdx');

  const results = files.map((filePath) => {
    const raw = fs.readFileSync(filePath);
    const processor = remark()
      .use(frontmatter, ['yaml'])
      .use(mdx)
      .use(headingIds)
      .use(slug);
    const tree = processor.parse(raw);
    const transformed = processor.runSync(tree);

    const errors = rules.flatMap((rule) => rule(transformed, { filePath }));

    return { filePath, errors };
  });

  let errorCount = 0;
  results.forEach(({ filePath, errors }) => {
    if (errors.length !== 0) {
      const absoluteFilename = path.resolve(filePath);
      console.log('\n' + chalk.underline(absoluteFilename));
    }

    errors.forEach(logError);
    errorCount += errors.length;
  });

  if (errorCount)
    console.log(`\n🚨 ${errorCount} error${errorCount > 1 ? 's' : ''} found\n`);
  else console.log('\n😁 No errors found\n');

  if (shouldCreateCheck()) {
    try {
      createCheck(results.flatMap((file) => file.errors));
    } catch (e) {
      console.log(
        chalk.gray(
          'Encountered an error while trying to create a new check run.',
        ),
      );
      console.error(e);
    }
  }

  return errorCount;
};

export default lintMdx;
