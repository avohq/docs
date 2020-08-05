import lintMdx from './linter';
import resolveImports from './rules/resolveImport';
import lintYaml from './rules/frontMatter';
import checkHeadingIDs from './rules/checkHeadingIDs';

const errorSeen = lintMdx([lintYaml, resolveImports, checkHeadingIDs]);

if (errorSeen) process.exitCode = 1;
