import { FunctionComponent } from 'react';

import styles from './PageLink.module.scss';
import Icon from './Icon';

interface Props {
  title: string;
  description?: string;
  image?: any;
  callToAction?: boolean;
}

const PageLink: FunctionComponent<Props> = ({
  title,
  description,
  image,
  callToAction,
}) => (
  <div className={styles.root}>
    {image && (
      <div className={styles.image}>
        <img src={image} />
      </div>
    )}
    <div className={styles.text}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      {callToAction && (
        <div className={styles.callToAction}>
          Get started{' '}
          <Icon name="chevron-right" relativeSize="sm" color="inherit" />
        </div>
      )}
    </div>
  </div>
);

export default PageLink;
