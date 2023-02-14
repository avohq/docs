import React, { FunctionComponent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navigation from './Navigation';
import { HamburgerButton } from 'react-hamburger-button';
import StickyBox from 'react-sticky-box';

import Avo from '../Avo';

import styles from './Layout.module.scss';
import Logo from './Logo';
import Footer from './Footer';
import Header from './Header';
import useAvoPath from '../util/useAvoPath';
import Icon from './Icon';

const Layout: FunctionComponent = ({ children }) => {
  const [navigationOpened, setNavigationOpened] = useState(false);
  const router = useRouter();
  const path = useAvoPath();

  useEffect(() => setNavigationOpened(false), [path]);

  useEffect(() => {
    Avo.docsPageViewed({
      userId_: 'not-used',
      path: path,
      referrer: document.referrer,
      utmCampaign: router.query.utm_campaign as string | undefined,
      utmContent: router.query.utm_content as string | undefined,
      utmMedium: router.query.utm_medium as string | undefined,
      utmSource: router.query.utm_source as string | undefined,
      utmTerm: router.query.utm_term as string | undefined,
    });
  }, [path]);

  return (
    <div className={styles.grid}>
      <div className={styles.navHeader}>
        <div className={styles.topBar}>
          <a className={styles.backToAvo} href="https://avo.app">
            <span className={styles.backToAvoIcon}>
              <Icon name="chevron-left" relativeSize="sm" color="inherit" />
            </span>
            Back to Avo.app
          </a>
        </div>
        <div className={styles.logoWrapper}>
          <Logo />
          <div className={styles.hamburgerButton}>
            <HamburgerButton
              open={navigationOpened}
              onClick={() => setNavigationOpened(!navigationOpened)}
              width={30}
              height={20}
              strokeWidth={2}
              color="black"
              animationDuration={0.5}
            />
          </div>
        </div>
      </div>
      <div className={styles.header}>
        <Header />
      </div>
      <StickyBox className={styles.nav}>
        <Navigation />
      </StickyBox>
      <div className={styles.content}>
        {children}
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
      <div className={styles.mobileNav}>
        {navigationOpened && <Navigation />}
      </div>
    </div>
  );
};

export default Layout;
