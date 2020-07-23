import { FunctionComponent } from 'react';
import Icon from './Icon';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

import styles from './CodeHeader.module.scss';

interface CodeHeaderProps {
  language: string;
  onCopy: () => void;
}

interface NameAndIcon {
  name: string;
  icon: IconName;
  iconPack?: IconPrefix;
}

// typescript;
// objectivec;
// swift;
// java;
// kotlin;
// typescript;
// java;
// php;
// python;
// ruby;
// csharp;

const parseLanguage = (language: string): NameAndIcon => {
  switch (language) {
    case 'javascript':
      return {
        name: 'JavaScript',
        icon: 'js',
        iconPack: 'fab',
      };
    case 'typescript':
      return {
        name: 'TypeScript',
        icon: 'code',
      };
    case 'swift':
      return {
        name: 'Swift',
        icon: 'swift',
        iconPack: 'fab',
      };
    case 'java':
      return {
        name: 'Java',
        icon: 'java',
        iconPack: 'fab',
      };
    case 'kotlin':
      return {
        name: 'Kotlin',
        icon: 'code',
      };
    case 'php':
      return {
        name: 'PHP',
        icon: 'php',
        iconPack: 'fab',
      };
    case 'python':
      return {
        name: 'Python',
        icon: 'python',
        iconPack: 'fab',
      };
    case 'ruby':
      return {
        name: 'Ruby',
        icon: 'code',
      };
    case 'csharp':
      return {
        name: 'C#',
        icon: 'code',
      };
    case 'objectivec':
      return {
        name: 'Objective C',
        icon: 'code',
      };
    case 'sh':
    case 'bash':
      return {
        name: 'Terminal',
        icon: 'terminal',
      };
    default:
      // eslint-disable-next-line no-console
      console.warn(`Missing icon and name for language "${language}"`);
      return {
        name: language,
        icon: 'code',
      };
  }
};

const CodeHeader: FunctionComponent<CodeHeaderProps> = ({
  language,
  onCopy,
}) => {
  const { name, icon, iconPack } = parseLanguage(language);

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <Icon color="rgb(163, 172, 185)" name={icon} pack={iconPack} />
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.spacer} />
      <div className={styles.copy} onClick={onCopy}>
        Copy
      </div>
    </div>
  );
};

export default CodeHeader;
