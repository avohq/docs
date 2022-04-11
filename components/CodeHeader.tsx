import { FunctionComponent } from 'react';
import Icon from './Icon';
import { IconPrefix } from '@fortawesome/fontawesome-svg-core';

import styles from './CodeHeader.module.scss';

interface CodeHeaderProps {
  language: string;
  onCopy: () => void;
}

interface NameAndIcon {
  name: string;
  icon: string;
  iconPack?: IconPrefix;
}

const parseLanguage = (language: string): NameAndIcon => {
  switch (language) {
    case 'javascript':
    case 'js':
      return {
        name: 'JavaScript',
        icon: 'js',
        iconPack: 'fab',
      };
    case 'typescript':
    case 'ts':
      return {
        name: 'TypeScript',
        icon: 'typescript',
        iconPack: 'fab',
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
        icon: 'kotlin',
        iconPack: 'fab',
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
        icon: 'ruby',
        iconPack: 'fab',
      };
    case 'csharp':
      return {
        name: 'C#',
        icon: 'csharp',
        iconPack: 'fab',
      };
    case 'objectivec':
      return {
        name: 'Objective C',
        icon: 'c',
        iconPack: 'fab',
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
