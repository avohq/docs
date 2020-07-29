import childProcess from 'child_process';

type PagerLanguage = 'xml' | 'js';

export default (input: string, language: PagerLanguage): void => {
  const command = `(\ncat << "EOF"\n${input}\nEOF\n) | ./sh/pager.sh ${language}`;
  childProcess.spawnSync(command, {
    shell: true,
    stdio: 'inherit',
  });
};
