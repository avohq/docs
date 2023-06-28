import React from 'react';

import styles from './PageLink.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'nextra-theme-docs';

interface Props {
  title: string;
  description?: string;
  image?: string;
  href: string;
}

const PageLink: React.FC<Props> = ({ title, description, image, href }) => {
  let { resolvedTheme } = useTheme();

  let isDark = resolvedTheme === 'dark';

  return (
    <Link
      scroll={true}
      href={href}
      className={styles.root}
      style={{ borderColor: isDark ? '#434A54' : '#E9E9E9' }}
    >
      {image && (
        <div className={styles.image}>
          <Image src={image} alt="" width={80} height={80} />
        </div>
      )}
      <div className={styles.text}>
        <div className={styles.title} style={isDark ? { color: 'white' } : {}}>
          {title}
        </div>
        <div
          className={styles.description}
          style={isDark ? { color: '#AAB2BD' } : {}}
        >
          {description}
        </div>
        <div className={styles.callToAction}>
          <span
            style={{
              textDecoration: 'none',
              color: isDark ? 'lightGrey' : 'grey',
            }}
          >
            {'Read '}
          </span>
        </div>
      </div>
    </Link>
  );
};

export const TwoCol: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return <div className={styles.twoCol}>{children}</div>;
};

export default PageLink;
