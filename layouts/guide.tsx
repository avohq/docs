import { FunctionComponent } from 'react';
import createLayout, { layoutProps } from './layout';

import styles from './guide.module.scss';

const Guide: FunctionComponent<layoutProps> = ({ frontMatter, children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>{frontMatter.title}</h1>
        <p className={styles.abstract}>{frontMatter.abstract}</p>
        {children}
      </div>
      <div className={styles.sidebar}></div>
    </div>
  );
};

export default createLayout(Guide);
