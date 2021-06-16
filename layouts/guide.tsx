import { FunctionComponent } from 'react';
import createLayout, { layoutProps } from './layout';
import readingTime from 'reading-time';
import innerText from 'react-innertext';
import StickyBox from 'react-sticky-box';

import styles from './guide.module.scss';
import generateToc from '../util/generateToc';
import Toc from '../components/Toc';
import Head from 'next/head';
import classNames from 'classnames';
import { GitHubLinkStore } from '../util/gitHubLinkStore';

const Guide: FunctionComponent<layoutProps> = ({ frontMatter, children }) => {
  const headings = generateToc(children);
  const time = readingTime(innerText(children));
  const showSidebar =
    frontMatter.showSidebar === undefined || frontMatter.showSidebar;

  const ogImageTitle = encodeURIComponent(
    frontMatter.mdTitle ? frontMatter.mdTitle : frontMatter.title,
  );

  GitHubLinkStore.update(s => {
    s.path = frontMatter.__resourcePath;
  });

  return (
    <div className={styles.root}>
      <Head>
        <title>{frontMatter.title} - Avo Docs</title>
        <meta
          property="og:image"
          content={`https://docs.teamavo.now.sh/api/og-image/${ogImageTitle}`}
        />
      </Head>
      <div className={classNames(styles.content, 'docSearch-content')}>
        <h1 className={styles.title}>{frontMatter.title}</h1>
        {frontMatter.abstract && (
          <p className={styles.abstract}>{frontMatter.abstract}</p>
        )}
        <div className={styles.minutes}>
          {Math.ceil(time.minutes)} minute read
        </div>

        {headings != null && headings.length !== 0 && (
          <div className={styles.inlineToc}>
            <Toc headings={headings} />
          </div>
        )}

        {children}
      </div>
      {showSidebar ? (
        <div className={styles.sidebar}>
          <StickyBox offsetTop={40} offsetBottom={20}>
            <Toc headings={headings} />
          </StickyBox>
        </div>
      ) : null}
    </div>
  );
};

export default createLayout(Guide);
