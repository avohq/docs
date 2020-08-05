import { RuleFunction, MDXError } from '../linter';

import visit from 'unist-util-visit';
import chalk from 'chalk';

const blacklist = ['amplitude', 'mixpanel'];

const headingIDs: RuleFunction = (node, metadata) => {
  const errors: MDXError[] = [];

  visit(node, 'heading', (node) => {
    const id = node.data && node.data.id;

    if (blacklist.find((entry) => entry === id)) {
      errors.push({
        filePath: metadata.filePath,
        message: `Heading ID '${id}' is not allowed. Change the heading or provide an explicit ID (see https://www.markdownguide.org/extended-syntax/#heading-ids).`,
        formattedMessage: `Heading ID '${id}' is not allowed. Change the heading or provide an explicit ID. ${chalk.dim(
          '(see https://www.markdownguide.org/extended-syntax/#heading-ids)',
        )}`,
        position: node.position,
      });
    }
  });

  return errors;
};

export default headingIDs;
