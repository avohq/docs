import { FunctionComponent } from 'react';
import createLayout, { layoutProps } from './layout';

import styles from './guide.module.scss';
import generateToc from '../util/generateToc';
import Toc from '../components/Toc';

const Guide: FunctionComponent<layoutProps> = ({ frontMatter, children }) => {
  const headings = generateToc(children);
  console.log(headings);

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>{frontMatter.title}</h1>
        <p className={styles.abstract}>{frontMatter.abstract}</p>
        {children}
      </div>
      <div className={styles.sidebar}>
        <Toc headings={headings} />
      </div>
    </div>
  );
};

export default createLayout(Guide);
