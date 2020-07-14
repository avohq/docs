import styles from './Footer.module.scss';
import { FunctionComponent } from 'react';
import Link from '../components/Link';

import FeedbackButtons from './FeedbackButtons';

const Footer: FunctionComponent = () => {
  return (
    <div className={styles.root}>
      <div className={styles.col}>
        <Link href="/help/faq" passHref>
          <div className={styles.iconText}>
            <img src={require('../images/svg/faq.svg')}></img>
            <div>FAQ and support</div>
          </div>
        </Link>
        <a href="https://github.com/avohq/docs">
          <div className={styles.iconText}>
            <img src={require('../images/svg/github.svg')}></img>
            <div>Edit this page on GitHub</div>
          </div>
        </a>
      </div>
      <div className={styles.feedback}>
        <div className={styles.col}>Was this page helpful?</div>
        <FeedbackButtons />
      </div>
    </div>
  );
};

export default Footer;
