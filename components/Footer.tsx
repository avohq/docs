import styles from './Footer.module.scss';
import { FunctionComponent } from 'react';
import Link from '../components/Link';

import classNames from 'classnames';

const Footer: FunctionComponent = () => {
  return (
    <div className={styles.root}>
      <div className={styles.col}>
        <Link href="/help/troubleshooting" passHref>
          <div className={classNames(styles.iconText, styles.link)}>
            <img alt="Rescue ring" src={require('../images/svg/faq.svg')}></img>
            <div>Support</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
