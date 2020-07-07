import visit from 'unist-util-visit';
import { RuleFunction, MDXError } from '../linter';
import YAML from 'yaml';

const position = {
  start: { line: 1, column: 1 },
  end: { line: 1, column: 1 },
};

const lintYaml: RuleFunction = (node, { filePath }) => {
  let frontMatter: Record<string, unknown> = {};

  visit(node, 'yaml', (yamlNode) => {
    const data = YAML.parse(yamlNode.value as string);
    frontMatter = { ...frontMatter, ...data };
  });

  const errors: MDXError[] = [];

  if (frontMatter.layout == null)
    errors.push({
      message: 'Layout attribute missing from front matter',
      position,
      filePath,
    });

  if (frontMatter.title == null)
    errors.push({
      message: 'Title attribute missing from front matter',
      position,
      filePath,
    });

  return errors;
};

export default lintYaml;
