import { FunctionComponent } from 'react';
import SignIn from './SignIn';

import styles from './Header.module.scss';

const Header: FunctionComponent = () => {
  return (
    <div className={styles.root}>
      <div className={styles.fill}></div>
      <SignIn />
    </div>
  );
};

export default Header;
