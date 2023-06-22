import { FunctionComponent } from 'react';

import styles from './PageLink.module.scss';
import Link from '../components/Link';
import Image from 'next/image';

interface Props {
  title: string;
  description?: string;
  image?: string;
  href: string;
}

const PageLink: FunctionComponent<Props> = ({
  title,
  description,
  image,
  href,
}) => {
  return (
    <Link scroll={true} href={href}>
      <div className={styles.root}>
        {image && (
          <div className={styles.image}>
            <Image src={image} alt="" width={80} height={80} />
          </div>
        )}
        <div className={styles.text}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
          <div className={styles.callToAction}>
            <span style={{ textDecoration: 'none', color: 'grey' }}>
              {'Read '}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PageLink;
