import { FunctionComponent } from 'react';

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

const PageLink: FunctionComponent<Props> = ({
  title,
  description,
  image,
  href,
}) => {
  let { resolvedTheme } = useTheme();

  return (
    <Link scroll={true} href={href}>
      <div className={styles.root}>
        {image && (
          <div className={styles.image}>
            <Image src={image} alt="" width={80} height={80} />
          </div>
        )}
        <div className={styles.text}>
          <div
            className={styles.title}
            style={resolvedTheme === 'dark' ? { color: 'white' } : {}}
          >
            {title}
          </div>
          <div
            className={styles.description}
            style={
              resolvedTheme === 'dark' ? { color: 'rgb(229, 231, 235)' } : {}
            }
          >
            {description}
          </div>
          <div className={styles.callToAction}>
            <span
              style={{
                textDecoration: 'none',
                color: resolvedTheme === 'dark' ? 'lightGrey' : 'grey',
              }}
            >
              {'Read '}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PageLink;
