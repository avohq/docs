import styles from './Footer.module.scss';
import { FunctionComponent } from 'react';

const Footer: FunctionComponent = () => {
  return (
    <div className={styles.root}>
      <div className={styles.col}>
        <div>FAQ and support</div>
        <div>Edit this page on GitHub</div>
      </div>
      <div className={styles.col}>Was this page helpful</div>
    </div>
  );
};

export default Footer;
