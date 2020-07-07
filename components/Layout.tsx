import { FunctionComponent } from 'react';
import Navigation from './Navigation';

import styles from './Layout.module.scss';
import Logo from './Logo';
import Footer from './Footer';
import Header from './Header';

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div className={styles.grid}>
      <div className={styles.navHeader}>
        <Logo width={140} />
      </div>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.nav}>
        <Navigation />
      </div>
      <div className={styles.content}>{children}</div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
