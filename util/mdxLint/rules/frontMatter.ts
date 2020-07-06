import visit from 'unist-util-visit';
import { RuleFunction, MDXError } from '../linter';
import YAML from 'yaml';

const lintYaml: RuleFunction = (node) => {
  let frontMatter: Record<string, unknown> = {};

  visit(node, 'yaml', (yamlNode) => {
    const data = YAML.parse(yamlNode.value as string);
    frontMatter = { ...frontMatter, ...data };
  });

  const errors: MDXError[] = [];

  if (frontMatter.layout == null)
    errors.push({
      message: 'Layout attribute missing from FrontMatter',
    });

  if (frontMatter.title == null)
    errors.push({
      message: 'Title attribute missing from FrontMatter',
    });

  return errors;
};

export default lintYaml;
