import styles from './Footer.module.scss';
import { FunctionComponent } from 'react';
import Link from '../components/Link';

import FeedbackButtons from './FeedbackButtons';
import { GitHubLinkStore } from '../util/gitHubLinkStore';
import classNames from 'classnames';

const Footer: FunctionComponent = () => {
  const sourcePath = GitHubLinkStore.useState((s) => s.path);

  const gitHubPath = sourcePath
    ? `https://github.com/avohq/docs/tree/master/pages/${sourcePath}`
    : 'https://github.com/avohq/docs';

  return (
    <div className={styles.root}>
      <div className={styles.col}>
        <Link href="/help/troubleshooting" passHref>
          <div className={classNames(styles.iconText, styles.link)}>
            <img alt="Rescue ring" src={require('../images/svg/faq.svg')}></img>
            <div>Support</div>
          </div>
        </Link>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={gitHubPath}
          className={styles.link}
        >
          <div className={styles.iconText}>
            <img
              alt="GitHub logo"
              src={require('../images/svg/github.svg')}
            ></img>
            <div>
              {sourcePath ? 'Edit this page on GitHub' : 'View on GitHub'}
            </div>
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
