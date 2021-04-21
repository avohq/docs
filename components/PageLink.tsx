import { FunctionComponent } from 'react';

import styles from './PageLink.module.scss';
import Icon from './Icon';
import Link from 'next/link';

export class CallToAction {
  constructor(readonly text: string, readonly path: string) {}
}

interface Props {
  title: string;
  description?: string;
  image?: string;
  callToAction?: CallToAction;
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
          <Link href={callToAction.path}>
            <a style={{ textDecoration: 'none', color: 'grey' }}>
              {callToAction.text}{' '}
            </a>
          </Link>
          <Icon name="chevron-right" relativeSize="sm" color="inherit" />
        </div>
      )}
    </div>
  </div>
);

export default PageLink;
