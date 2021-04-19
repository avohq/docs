import { FunctionComponent } from 'react';

import { H1, H2, H3 } from '../styles/MDComponents';
import PageLink, { CallToAction } from '../components/PageLink';

import AnalyticsManagerIcon from '../images/svg/analyticsmanager.svg';
import DevIcon from '../images/svg/dev.svg';

import styles from './index.module.scss';

function emptyRowElement() {
  return <div style={{ display: 'flex', padding: '15px' }} />;
}

const LandingPage: FunctionComponent = () => {
  return (
    <div style={{ width: '85%' }}>
      <H1>Getting started with Avo</H1>
      <p className={styles.text}>
        We distinguish 3 levels of Avo adoption, you don't need to go all the
        way, because every stage has value in itself.
      </p>
      <p className={styles.text}>
        For example, if you already have a framework for analytics
        implementation and implementation data bugs are not a problem for you,
        you can stay at the second adoption stage.
      </p>
      <H2>1. Better tracking plan management today</H2>
      <p className={styles.text}>
        Use Avo instead of your spreadsheet to manage and discuss your tracking
        plan. Avo is designed for analytics, so it's way better than the
        spreadsheet for that use case.
      </p>

      <p className={styles.text}>
        This stage does not require any developer input, so you can adopt it in
        the data design team without getting developer buyin.
      </p>
      <H3>Creating tracking plan in Avo</H3>
      <p className={styles.text}>
        If you already have a tracking plan you can import it to Avo, or you can
        create your plan in Avo from scratch. In any case you'll be able to fine
        tune it and add new events for new features in Avo.
      </p>
      <div className={styles.row}>
        <div style={{ display: 'flex' }}>
          <b>Data managers</b>
        </div>
        <div style={{ display: 'flex' }}>
          <b>Developers</b>
        </div>
      </div>
      <div className={styles.row}>
        <PageLink
          image={AnalyticsManagerIcon}
          title="Import existing csv spreadsheet, Amplitude or Mixpanel tracking plan"
          description=""
          callToAction={
            new CallToAction('Learn', '/workspace/tracking-plan/importing')
          }
        />
        <PageLink
          image={DevIcon}
          title="How to read the implementation markdown diff"
          description=""
          callToAction={
            new CallToAction(
              'Learn',
              '/implementation/read-implementation-diff',
            )
          }
        />
      </div>
      <div className={styles.row}>
        <PageLink
          image={AnalyticsManagerIcon}
          title="Design data in Avo"
          description=""
          callToAction={
            new CallToAction('Start', '/data-design/start-data-design')
          }
        />
        {emptyRowElement()}
      </div>
      <div className={styles.row}>
        <PageLink
          image={AnalyticsManagerIcon}
          title="Define sources and destinations for documentation"
          description=""
          callToAction={
            new CallToAction(
              'Start',
              '/data-design/define-sources-and-destinations',
            )
          }
        />
        {emptyRowElement()}
      </div>
      <H3>Branched workflows</H3>
      <p className={styles.text}>
        One of the core features for effective data design in Avo is branched
        workflow. It allows you to see the changes for a single feature and
        provides implementation instructions that you can share with the
        developers working on the analytics implementation
      </p>
      <div className={styles.row}>
        <div style={{ display: 'flex' }}>
          <b>Data managers</b>
        </div>
      </div>
      <div className={styles.row}>
        <PageLink
          image={AnalyticsManagerIcon}
          title="How to create a branch, view branch diff and share implementations instructions"
          description=""
          callToAction={new CallToAction('Learn', '/workspace/branches')}
        />
        <PageLink
          image={AnalyticsManagerIcon}
          title="Invite your coworkers to Avo"
          description=""
          callToAction={new CallToAction('Learn', '/workspace/members')}
        />
      </div>
      <div className={styles.row}>
        <PageLink
          image={AnalyticsManagerIcon}
          title="Discussions and collaboration on branches"
          description=""
          callToAction={
            new CallToAction('Learn', '/data-design/start-collaborating')
          }
        />
        <PageLink
          image={AnalyticsManagerIcon}
          title="Review and approval workflows (steps 4 and 5 in the guide)"
          description=""
          callToAction={
            new CallToAction(
              'Learn',
              '/data-design/day-to-day-workflow#a-namestep-4-ask-for-reviewa-step-4--ask-for-review',
            )
          }
        />
      </div>
      <H3>Publish tracking plan from Avo to other analytics tools</H3>
      <p className={styles.text}>
        You can set up your tracking plan to be automatically published to
        Segment Protocols, Amplitude and Mixpanel every time a branch is merged.
        We also provide a webhook for advanced automation.
      </p>
      <div className={styles.row}>
        <div style={{ display: 'flex' }}>
          <b>Data managers</b>
        </div>
      </div>
      <div className={styles.row}>
        <PageLink
          image={AnalyticsManagerIcon}
          title="Setting up publishing and auto publishing to Segment, Amplitude and Mixpanel"
          description=""
          callToAction={
            new CallToAction(
              'Get started',
              '/workspace/tracking-plan/publishing',
            )
          }
        />
      </div>
      <H2>2. Better tracking validation</H2>
      <p className={styles.text}>
        Add a lightweight SDK to your code to learn how actual implementation
        compares with the defined tracking plan. Get instant feedback on what
        tracking is implemented when working on new features with the
        Implementation status in your Avo workspace. Observe your tracking calls
        on device in real time with the Avo Debuggers.
      </p>
      <p className={styles.text}>
        This stage requires one time setup in each of your applications. The
        setup is simple and shouldn't take more than 30 minutes. It is not
        necessary to set up all platforms at once, you can start with a single
        platform. Once it's done the data design team will get the full power of
        Avo.
      </p>
      <p className={styles.text}>
        {'> '}Level 1 is required, but levels 2 and 3 are interchangable, i.e.
        you can go directly to level 3 without going through level 2 if your
        platform does not yet have the Inspector SDK and start using the
        Inspector once it's available.
      </p>
      <div className={styles.row}>
        <div style={{ display: 'flex' }}>
          <b>Data managers</b>
        </div>
        <div style={{ display: 'flex' }}>
          <b>Developers</b>
        </div>
      </div>
      <div className={styles.row}>
        <PageLink
          image={AnalyticsManagerIcon}
          title="Set up webhook publishing"
          callToAction={
            new CallToAction(
              'Get started',
              '/workspace/tracking-plan/publishing#a-namewebhooka-webhook',
            )
          }
        />
        <PageLink
          image={DevIcon}
          title="Listen to the tracking plan changes with a webhook"
          callToAction={
            new CallToAction(
              'Get started',
              '/implementation/avo-tracking-plan-webhook',
            )
          }
        />
      </div>
      <div className={styles.row}>
        <PageLink
          image={AnalyticsManagerIcon}
          title="Use Inspector to monitor analytics implementation"
          callToAction={
            new CallToAction(
              'Get started',
              '/data-design/start-using-inspector',
            )
          }
        />
        <PageLink
          image={DevIcon}
          title="How does Avo Inspector SDK work?"
          callToAction={
            new CallToAction(
              'Get started',
              '/implementation/devs-101#avo-inspector-sdk',
            )
          }
        />
      </div>
      <div className={styles.row}>
        <PageLink
          image={AnalyticsManagerIcon}
          title="Using Mobile Debuggers"
          callToAction={
            new CallToAction(
              'Get started',
              '/explore-tracking-plan/start-using-visual-debuggers#accessing-mobile-debuggers',
            )
          }
        />
        <PageLink
          image={DevIcon}
          title="Avo Inspector SDK reference"
          callToAction={
            new CallToAction('Read', '/implementation/inspector/sdk/')
          }
        />
      </div>
      <div className={styles.row}>
        {emptyRowElement()}
        <PageLink
          image={DevIcon}
          title="Set up the Mobile Debuggers"
          callToAction={
            new CallToAction('Read', '/implementation/setup-mobile-debugger')
          }
        />
      </div>

      <H2>3. Better tracking implementation</H2>

      <p className={styles.text}>
        Avo generates human readable code, called Avo functions, that sends the
        data exactly as planned. No more data bugs in your code, even between
        platforms!
      </p>

      <p className={styles.text}>
        This stage requires constant interaction with Avo from developers.
      </p>
      <p className={styles.text}>
        It's not necessary to swap all your tracking with Avo functions, you can
        start with a single tracking call.
      </p>
      <p className={styles.text}>
        It's not necessary to adopt Avo functions on all platforms at once, you
        can start with a single platform.
      </p>

      <div className={styles.row}>
        <div style={{ display: 'flex' }}>
          <b>Data managers</b>
        </div>
        <div style={{ display: 'flex' }}>
          <b>Developers</b>
        </div>
      </div>
      <div className={styles.row}>
        <PageLink
          image={AnalyticsManagerIcon}
          title="Set up the tracking plan for Avo functions"
          callToAction={
            new CallToAction(
              'Learn',
              '/implementation/avo-tracking-plan-webhook',
            )
          }
        />
        <PageLink
          image={DevIcon}
          title="How do Avo Functions work?"
          callToAction={
            new CallToAction(
              'Get started',
              '/implementation/devs-101#a-nameavo-generated-filea-avo-generated-file-containing-avo-functions',
            )
          }
        />
      </div>
      <div className={styles.row}>
        <PageLink
          image={AnalyticsManagerIcon}
          title="Check the implementation status of an event in the Avo UI"
          callToAction={
            new CallToAction(
              'Get started',
              '/workspace/implement#a-nameimplement-actionsa-implement-events',
            )
          }
        />
        <PageLink
          image={DevIcon}
          title="Avo Cli"
          callToAction={new CallToAction('Get started', '/implementation/cli')}
        />
      </div>
      <div className={styles.row}>
        {emptyRowElement()}
        <PageLink
          image={DevIcon}
          title="Web Debugger"
          callToAction={
            new CallToAction(
              'Get started',
              '/implementation/start-using-web-debugger',
            )
          }
        />
      </div>

      <H3>Avo functions reference</H3>

      <div className={styles.row}>
        <PageLink
          image={DevIcon}
          title="Programming languages you can generate Avo Functions for"
          callToAction={
            new CallToAction(
              'Learn',
              '/implementation/supported-programming-languages',
            )
          }
        />

        <PageLink
          image={DevIcon}
          title="How to define custom destinations"
          callToAction={
            new CallToAction(
              'Get started',
              '/implementation/start-custom-destination',
            )
          }
        />

        <PageLink
          image={DevIcon}
          title="Controling the console logs"
          callToAction={
            new CallToAction('Get started', '/implementation/custom-loggers')
          }
        />
      </div>

      <H2>Explore the Avo workspace</H2>

      <a href="/workspace">Get started {'>'}</a>

      <H2>Comprehensive guides</H2>
      <div className={styles.row}>
        <PageLink
          image={AnalyticsManagerIcon}
          title="Global namespace"
          description=""
          callToAction={
            new CallToAction('Learn', '/data-design/global-namespace')
          }
        />
        <PageLink
          image={AnalyticsManagerIcon}
          title="Naming conventions"
          description=""
          callToAction={
            new CallToAction('Learn', '/data-design/naming-conventions')
          }
        />
        <PageLink
          image={DevIcon}
          title="Controlling Logs"
          description=""
          callToAction={new CallToAction('Learn', '/implementation/logs')}
        />
      </div>
      <div className={styles.row}>
        <PageLink
          image={AnalyticsManagerIcon}
          title="Purpose meetings"
          description=""
          callToAction={
            new CallToAction(
              'Learn',
              '/data-design/documenting-purpose-meetings-in-avo',
            )
          }
        />
        <PageLink
          image={AnalyticsManagerIcon}
          title="Downstream deps"
          description=""
          callToAction={
            new CallToAction(
              'Learn',
              '/data-design/documenting-downstream-dependancies',
            )
          }
        />
        <PageLink
          image={DevIcon}
          title="Avo and tests"
          description=""
          callToAction={
            new CallToAction('Learn', '/implementation/avo-and-unit-tests')
          }
        />
      </div>
      <div className={styles.row}>
        <PageLink
          image={AnalyticsManagerIcon}
          title="Multiple sources on Avo branches"
          description=""
          callToAction={
            new CallToAction(
              'Learn',
              '/data-design/multiple-sources-on-avo-branches',
            )
          }
        />
        <PageLink
          image={AnalyticsManagerIcon}
          title="Defining descriptive events and properties"
          description=""
          callToAction={
            new CallToAction(
              'Learn',
              '/data-design/defining-descriptive-events-and-properties',
            )
          }
        />
        <PageLink
          image={DevIcon}
          title="Avo in the CI"
          description=""
          callToAction={
            new CallToAction('Learn', '/implementation/avo-in-the-ci')
          }
        />
      </div>
      <div className={styles.row}>
        <PageLink
          image={AnalyticsManagerIcon}
          title="Organizing metrics and events"
          description=""
          callToAction={
            new CallToAction(
              'Learn',
              '/data-design/organizing-metrics-and-events',
            )
          }
        />
        <PageLink
          image={DevIcon}
          title="Using Avo in large development teams"
          description=""
          callToAction={
            new CallToAction('Learn', '/implementation/avo-and-git')
          }
        />
        <PageLink
          image={DevIcon}
          title="Avo and linters"
          description=""
          callToAction={
            new CallToAction('Learn', '/implementation/avo-and-linters')
          }
        />
      </div>

      <H3>Reference</H3>
    </div>
  );
};

export default LandingPage;
