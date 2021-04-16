import { FunctionComponent } from 'react';

import { H3 } from '../styles/MDComponents';
import PageLink, { CallToAction } from '../components/PageLink';

import AnalyticsManagerIcon from '../images/svg/analyticsmanager.svg';
import DevIcon from '../images/svg/dev.svg';

import styles from './index.module.scss';

const LandingPage: FunctionComponent = () => {
  return (
    <div>
      <H3>Quick start</H3>
      <div className={styles.row}>
        <PageLink
          image={AnalyticsManagerIcon}
          title="Avo for data designers"
          description="Learn how to use Avo to create a tracking plan and generate high quality, actionable data."
          callToAction={new CallToAction("Get started", "\\about")}
        />
        <PageLink
          image={DevIcon}
          title="Avo for developers"
          description="Learn how to add analytics to your test pipeline, inspect your tracking events and enforce standards."
          callToAction={new CallToAction("Get started", "\\about")}
        />
      </div>

      <H3>Comprehensive guides</H3>
      <div className={styles.row}>
        <PageLink
          title="The Avo workflow"
          description="Learn how Avo’s tools fit in with your Git-based development flow."
          callToAction={new CallToAction("Get started", "\\about")}
        />
        <PageLink
          title="Using the Inspector"
          description="Find out how to use the inspector to gain valuable insights into your tracking taxonomy"
          callToAction={new CallToAction("Get started", "\\about")}
        />
      </div>
      <div className={styles.row}>
        <PageLink
          title="The Avo workflow"
          description="Learn how Avo’s tools fit in with your Git-based development flow."
          callToAction={new CallToAction("Get started", "\\about")}
        />
        <PageLink
          title="Using the Inspector"
          description="Find out how to use the inspector to gain valuable insights into your tracking taxonomy"
          callToAction={new CallToAction("Get started", "\\about")}
        />
      </div>

      <H3>Reference</H3>
    </div>
  );
};

export default LandingPage;
