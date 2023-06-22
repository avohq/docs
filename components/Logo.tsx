import { FunctionComponent } from 'react';
import Link from '../components/Link';

import styles from './Logo.module.scss';

interface LogoProps {
  width?: number;
}

const Logo: FunctionComponent<LogoProps> = () => (
  <Link href="/">
    <a className={styles.container}>
      <img
        alt="Avo logo"
        src={'/images/logo.svg'}
        width={60}
        style={{ cursor: 'pointer' }}
      />
      <span className={styles.text}>Documentation</span>
    </a>
  </Link>
);

export default Logo;
