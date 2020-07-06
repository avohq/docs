import { Octokit } from '@octokit/rest';
import childProcess from 'child_process';
import { MDXError } from './linter';
import path from 'path';

export const getSHA = (): string =>
  childProcess.execSync('git rev-parse HEAD').toString().trim();

export const getRootPath = (): string =>
  childProcess.execSync('git rev-parse --show-toplevel').toString().trim();

export const shouldCreateCheck = (): boolean => {
  const { GITHUB_SECRET, OWNER, REPO } = process.env;
  return GITHUB_SECRET != null && OWNER != null && REPO != null;
};

export const createCheck = async (errors: MDXError[]): Promise<void> => {
  const { GITHUB_SECRET, OWNER, REPO } = process.env;
  if (GITHUB_SECRET == null || OWNER == null || REPO == null) {
    throw new Error(
      'Environment variables GITHUB_SECRET, OWNER, REPO are required.',
    );
  }

  const octokit = new Octokit({
    auth: GITHUB_SECRET,
  });

  const rootPath = getRootPath();

  const annotations = errors.flatMap((error) => {
    if (!error.position) return [];

    return [
      {
        start_line: error.position.start.line,
        end_line: error.position.end.line,
        annotation_level: 'failure' as 'failure' | 'notice' | 'warning',
        message: error.message,
        path: path.relative(rootPath, error.filePath),
      },
    ];
  });

  await octokit.checks.create({
    owner: OWNER,
    repo: REPO,
    name: 'MDXLint',
    head_sha: getSHA(),
    status: 'completed',
    conclusion: errors.length === 0 ? 'success' : 'failure',
    output: {
      title: 'MDXLint',
      summary: "Here's a summary",
      text: '',
      annotations,
    },
    started_at: new Date().toISOString(),
    completed_at: new Date().toISOString(),
  });
};
