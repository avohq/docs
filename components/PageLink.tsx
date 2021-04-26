import { FunctionComponent } from 'react';

import styles from './PageLink.module.scss';
import Icon from './Icon';
import Link from 'next/link';

export class CallToAction {
  constructor(readonly path: string) {}
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
}) => {
  const returnDiv = (
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
            <a style={{ textDecoration: 'none', color: 'grey' }}>{'Read '}</a>
            <Icon name="chevron-right" relativeSize="sm" color="inherit" />
          </div>
        )}
      </div>
    </div>
  );

  if (callToAction) {
    return (
      <Link passHref scroll={true} href={callToAction ? callToAction.path : ''}>
        {returnDiv}
      </Link>
    );
  } else {
    return returnDiv;
  }
};

export default PageLink;
