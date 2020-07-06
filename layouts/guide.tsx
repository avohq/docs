import { FunctionComponent } from 'react';
import createLayout, { layoutProps } from './layout';
import readingTime from 'reading-time';
import innerText from 'react-innertext';

import styles from './guide.module.scss';
import generateToc from '../util/generateToc';
import Toc from '../components/Toc';
import Head from 'next/head';

const Guide: FunctionComponent<layoutProps> = ({ frontMatter, children }) => {
  const headings = generateToc(children);
  const time = readingTime(innerText(children));

  return (
    <div className={styles.root}>
      <Head>
        <title>{frontMatter.title} - Avo Docs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.content}>
        <h1 className={styles.title}>{frontMatter.title}</h1>
        <p className={styles.abstract}>{frontMatter.abstract}</p>
        <div>{Math.ceil(time.minutes)} minute read</div>
        {children}
      </div>
      <div className={styles.sidebar}>
        <Toc headings={headings} />
      </div>
    </div>
  );
};

export default createLayout(Guide);
