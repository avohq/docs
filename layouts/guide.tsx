import { FunctionComponent } from 'react';
import createLayout, { layoutProps } from './layout';

import styles from './guide.module.scss';

const Guide: FunctionComponent<layoutProps> = ({ frontMatter, children }) => {
  console.log(frontMatter);
  
  return (
    <div>
      <h1 className={styles.title}>{frontMatter.title}</h1>
      <p className={styles.abstract}>{frontMatter.abstract}</p>
      {children}
    </div>
  );
};

export default createLayout(Guide);
