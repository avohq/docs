import React from 'react';

import styles from './PageLink.module.scss';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  title: string;
  description?: string;
  image?: string;
  href: string;
}

const PageLink: React.FC<Props> = ({ title, description, image, href }) => {
  return (
    <Link scroll={true} href={href} className={styles.root}>
      {image && (
        <div className={styles.image}>
          <Image src={image} alt="" width={80} height={80} />
        </div>
      )}
      <div className={styles.text}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.callToAction}>Read</div>
      </div>
    </Link>
  );
};

export const TwoCol: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className={styles.twoCol}>{children}</div>;
};

export default PageLink;
