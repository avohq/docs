import { FunctionComponent } from 'react';

import styles from './PageLink.module.scss';
import Icon from './Icon';
import Link from '../components/Link';
import Image from 'next/image'

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
          <Image src={image} alt="" width={80} height={80} />
        </div>
      )}
      <div className={styles.text}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        {callToAction && (
          <div className={styles.callToAction}>
            <span style={{ textDecoration: 'none', color: 'grey' }}>
              {'Read '}
            </span>
            {/* FIXME: Fix Fontawesome icons here, causing hydration error
            <Icon name="chevron-right" relativeSize="sm" color="inherit" /> */}
          </div>
        )}
      </div>
    </div>
  );

  if (callToAction) {
    // Link content wrapped in an anchor to make cmd+click to open in a new tab work
    return (
      <Link scroll={true} href={callToAction ? callToAction.path : ''} passHref>
          {returnDiv}
      </Link>
    );
  } else {
    return returnDiv;
  }
};

export default PageLink;
