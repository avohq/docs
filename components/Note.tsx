import { FunctionComponent } from 'react';

import styles from './Note.module.scss';

const Note: FunctionComponent = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default Note;
