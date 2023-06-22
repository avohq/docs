import { FunctionComponent } from 'react';
import { Image } from 'next/image';
import Link from '../components/Link';

import styles from './Logo.module.scss';

interface LogoProps {
  width?: number;
}

const Logo: FunctionComponent<LogoProps> = () => (
  <div className={styles.container}>
    <Link href="/">
      <Image
        alt="Avo logo"
        src="/images/logo.svg"
        width={60}
        height={21}
        style={{ cursor: 'pointer' }}
      />
      <span className={styles.text}>Documentation</span>
    </Link>
  </div>
);

export default Logo;
