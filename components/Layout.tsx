import { FunctionComponent, useEffect } from 'react';
import Navigation from './Navigation';

import Avo from '../Avo';

import styles from './Layout.module.scss';
import Logo from './Logo';
import Footer from './Footer';
import Header from './Header';
import useAvoPath from '../util/useAvoPath';

const Layout: FunctionComponent = ({ children }) => {
  const path = useAvoPath();

  useEffect(() => {
    Avo.landingPageViewed({
      path: path,
      referrer: document.referrer,
    });
  }, [children]);

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
