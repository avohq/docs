import lintMdx from './linter';
import resolveImports from './rules/resolveImport';
import lintYaml from './rules/frontMatter';

const errorSeen = lintMdx([lintYaml, resolveImports]);

if (errorSeen) process.exit(1);
