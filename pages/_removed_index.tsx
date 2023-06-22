import { FunctionComponent } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import PageLink, { CallToAction } from '../components/PageLink';

import AnalyticsManagerIcon from '../images/svg/analyticsmanager.svg';
import DevIcon from '../images/svg/dev.svg';

import styles from './index.module.scss';

import Head from 'next/head';

const LandingPage: FunctionComponent = () => {

  const headings = [
    {
      id: 'intro',
      level: 2,
      text: '',
    },
    {
      id: 'workflow',
      level: 2,
      text: 'Try the Avo workflow for your next analytics release',
    },
    {
      id: 'import',
      level: 2,
      text: 'Import your tracking plan into Avo',
    },
    {
      id: 'inspector',
      level: 2,
      text: 'Get overview of your current state of tracking with Inspector',
    },
    {
      id: 'other',
      level: 2,
      text: '',
    },
  ];

  return (
    <div className={styles.root}>
      <Head>
        <title>Get Started With Avo</title>
      </Head>
      <div>
        <h1 className={[styles.label, styles.heading1].join(' ')}>
          Get Started With Avo
        </h1>

        <p className={styles.text}>
          Below are the key areas to consider when getting started with Avo. You
          can start them in any order or in parallel, and skip those you
          don&apos;t think apply to you.
        </p>

        <h2 id="workflow" className={[styles.label, styles.heading2].join(' ')}>
          Try the Avo workflow for your next analytics release
        </h2>
        <p className={styles.text}>
          If you have an analytics release coming up in the next few days, we
          highly recommend you try out the Avo Workflow for that release.
        </p>
        <p className={styles.text}>
          The Avo workflow covers all the steps required to plan, review,
          request implementation, implement, validate and publish your analytics
          release.
        </p>

        <Zoom>
          <img
            className={styles.image}
            width="100%"
            src={'/images/avo-workflow.png'}
            alt="The Avo Workflow: Plan, review, implement, validate and publish your tracking changes"
          />
        </Zoom>

        <p className={styles.text}>
          We recommend your first “full-circle” release in Avo be a small one,
          for example a product release that includes a handful of new or
          updated events. This will enable you to quickly go through your first
          analytics release in Avo, from start to finish.
        </p>

        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="The Avo Workflow"
            description="Plan, review, implement and validate every analytics release"
            callToAction={new CallToAction('/workflow/overview')}
          />
        </div>

        <h2 id="import" className={[styles.label, styles.heading2].join(' ')}>
          Import your tracking plan into Avo
        </h2>

        <p className={styles.text}>
          If you have an existing tracking plan we recommend importing it into
          Avo.
        </p>

        <p className={styles.text}>
          In the guide below you&apos;ll find information on what to consider
          before importing, how to import, and our suggested next steps after
          the import is completed.
        </p>

        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="Get Your Tracking Plan Into Avo"
            description="Our recommendations for getting your existing tracking plan into Avo"
            callToAction={
              new CallToAction('/workspace/tracking-plan/importing')
            }
          />
        </div>

        <h2
          id="inspector"
          className={[styles.label, styles.heading2].join(' ')}
        >
          Get overview of your current state of tracking with Inspector
        </h2>

        <p className={styles.text}>
          Avo Inspector gives you an overview of your current state of tracking
          and highlights issues and discrepancies in your tracking. Once you
          have your tracking plan in Avo, it flags discrepancies between your
          tracking plan and your actual tracking so you can see which events in
          your tracking plan are actually implemented and whether they’re being
          sent correctly.
        </p>

        <p className={styles.text}>
          Inspector also gives you an implementation status for every analytics
          release in your Avo Branch, available for dev, staging and production
          environments. This gives you confidence and visibility into the status
          and health of the event implementation.
        </p>

        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="Get Started With Inspector"
            description="Install Inspector to get overview of your current state of tracking"
            callToAction={
              new CallToAction('/data-design/start-using-inspector')
            }
          />
        </div>

        <div id="other" className={styles.separator} />

        <h3 className={[styles.label, styles.heading3].join(' ')}>
          Guides and best practices
        </h3>

        <div className={styles.row}>
          <PageLink
            image={DevIcon}
            title="Avo 101 For Developers"
            description="Codegen, Inspector and Debuggers—What’s the difference?"
            callToAction={new CallToAction('/implementation/devs-101')}
          />
          <PageLink
            image={AnalyticsManagerIcon}
            title="Designing Data In Avo"
            description="How to define metrics, events and properties step by step"
            callToAction={new CallToAction('/data-design/start-data-design')}
          />
        </div>
        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="Multi-Product Workspaces"
            description="How to organize a tracking plan for multiple products"
            callToAction={
              new CallToAction(
                '/data-design/organizing-multi-product-workspaces',
              )
            }
          />
          <span className={styles.rowFiller} />
        </div>

        <h3 className={[styles.label, styles.heading3].join(' ')}>
          Browse by product
        </h3>

        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="Tracking Plan Management"
            description="Collaborate with your team on tracking plan changes"
            callToAction={new CallToAction('/data-design/quick-start')}
          />
          <PageLink
            image={AnalyticsManagerIcon}
            title="Tracking Plan Audit"
            description="Verify that all tracking plan changes follow your tracking plan rules"
            callToAction={new CallToAction('/audit/overview')}
          />
        </div>
        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="Avo Inspector"
            description="Get overview of your current state of tracking"
            callToAction={
              new CallToAction('/data-design/start-using-inspector')
            }
          />
          <PageLink
            image={AnalyticsManagerIcon}
            title="Publishing"
            description="Keep your downstream schema registries in sync with the Avo"
            callToAction={
              new CallToAction('/workspace/tracking-plan/publishing')
            }
          />
        </div>
        <div className={styles.row}>
          <PageLink
            image={DevIcon}
            title="Avo Codegen"
            description="Faster, more reliable implementation with type-safe tracking functions"
            callToAction={
              new CallToAction('/implementation/avo-codegen-overview')
            }
          />
          <PageLink
            image={DevIcon}
            title="Avo Debuggers"
            description="Observe events and properties as you trigger them in your app"
            callToAction={
              new CallToAction('/implementation/start-using-visual-debugger')
            }
          />
        </div>

        <h3 className={[styles.label, styles.heading3].join(' ')}>
          Developer Reference
        </h3>
        <div className={styles.row}>
          <PageLink
            image={DevIcon}
            title="Avo Codegen"
            callToAction={new CallToAction('/implementation/destinations')}
          />
          <PageLink
            image={DevIcon}
            title="Avo Inspector"
            callToAction={
              new CallToAction('/implementation/avo-inspector-sdk-reference')
            }
          />
        </div>
        <div className={styles.row}>
          <PageLink
            image={DevIcon}
            title="Avo Debuggers"
            callToAction={
              new CallToAction('/implementation/start-using-visual-debugger')
            }
          />
          <span />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
