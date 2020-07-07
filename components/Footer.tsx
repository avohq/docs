import styles from './Footer.module.scss';
import { FunctionComponent } from 'react';
import Link from 'next/link';

const Footer: FunctionComponent = () => {
  return (
    <div className={styles.root}>
      <div className={styles.col}>
        <Link href="/help/faq" passHref>
          <a>FAQ and support</a>
        </Link>
        <a href={`https://github.com/avohq/docs`}>
          <div>Edit this page on GitHub</div>
        </a>
      </div>
      <div className={styles.col}>Was this page helpful</div>
    </div>
  );
};

export default Footer;
