import { FunctionComponent } from 'react';

import PageLink, { CallToAction } from '../components/PageLink';

import AnalyticsManagerIcon from '../images/svg/analyticsmanager.svg';
import DevIcon from '../images/svg/dev.svg';

import StickyBox from 'react-sticky-box';

import styles from './index.module.scss';

import Head from 'next/head';

function emptyRowElement() {
  return <div style={{ display: 'flex', padding: '15px' }} />;
}

const LandingPage: FunctionComponent = () => {
  const tocContent = (
    <div>
      {' '}
      <ol>
        <p>
          <a href="#stage1" className={styles.tocItem}>
            Step 1. Tracking plan management – no engineering required
          </a>
        </p>
        <p>
          <a href="#stage2" className={styles.tocItem}>
            Step 2. Tracking plan validation – one time SDK install
          </a>
        </p>
        <p>
          <a href="#stage3" className={styles.tocItem}>
            Step 3. Tracking plan implementation workflow for your team
          </a>
        </p>
        <p>
          <a href="#workspace" className={styles.tocItem}>
            Explore your Avo workspace
          </a>
        </p>
        <p>
          <a href="#guides" className={styles.tocItem}>
            Comprehensive data design and implementation guides
          </a>
        </p>
      </ol>
    </div>
  );

  return (
    <div className={styles.grid}>
      <Head>
        <title>Getting started with Avo</title>
      </Head>
      <div>
        <h1 className={[styles.label, styles.heading1].join(' ')}>
          Getting started with Avo
        </h1>
        <p className={styles.text}>
          The Avo workflows are layered. The 3 steps to adopt Avo can be adopted
          as a whole or in part – depending on your use case. Each layer of the
          workflow provides value and each of them requires different amount of
          engineering contribution.
        </p>

        <p className={styles.text}>
          For example, if you already have a framework for analytics
          implementation and implementation data bugs are not a problem for you,
          you can stay at the second adoption step.
        </p>

        <div className={styles.tocInline}>{tocContent}</div>

        <h2 id="stage1" className={[styles.label, styles.heading2].join(' ')}>
          Step 1. Tracking plan management – no engineering required
        </h2>
        <p className={styles.text}>
          Use Avo instead of your spreadsheet to manage and discuss your
          tracking plan changes. Avo is designed for analytics, so it&apos;s way
          better than the spreadsheet for managing your tracking plan.
        </p>

        <p className={styles.text}>
          This adoption step does not require any developer input, so you can
          adopt it in the data design team without getting a developer buy-in.
        </p>
        <h3 className={[styles.label, styles.heading3].join(' ')}>
          Creating tracking plan in Avo
        </h3>
        <p className={styles.text}>
          If you already have a tracking plan you can import it to Avo, or you
          can create your plan in Avo from scratch. In any case you&apos;ll be
          able to fine tune it and add new events for every feature release in
          Avo.
        </p>
        <div className={styles.row}>
          <div style={{ display: 'flex' }}>
            <b className={styles.tableLabels}>Data managers</b>
          </div>
          <div style={{ display: 'flex' }}>
            <b className={styles.tableLabels}>Developers</b>
          </div>
        </div>
        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="Import existing csv spreadsheet, Amplitude or Mixpanel tracking plan"
            description="Move your existing tracking plan to Avo in a few easy steps"
            callToAction={
              new CallToAction('/workspace/tracking-plan/importing')
            }
          />
          <PageLink
            image={DevIcon}
            title="How to read the implementation markdown diff"
            description="Avo represents tracking changes in a way optimized for implementation, learn how to understand it"
            callToAction={
              new CallToAction('/implementation/read-implementation-diff')
            }
          />
        </div>
        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="Design data in Avo"
            description="Create and modify your events, properties and metrics"
            callToAction={new CallToAction('/data-design/start-data-design')}
          />
          {emptyRowElement()}
        </div>
        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="Define sources and destinations for documentation"
            description="Define what platforms send particular events and list the relevant analytics destinations"
            callToAction={
              new CallToAction('/data-design/define-sources-and-destinations')
            }
          />
          {emptyRowElement()}
        </div>
        <h3 className={[styles.label, styles.heading3].join(' ')}>
          Branched workflows
        </h3>
        <p className={styles.text}>
          One of the core features for effective data design in Avo is branched
          workflow. It allows you to see the changes for a single feature and
          provides implementation instructions that you can share with the
          developers working on the analytics implementation
        </p>
        <div className={styles.row}>
          <div style={{ display: 'flex' }}>
            <b className={styles.tableLabels}>Data managers</b>
          </div>
        </div>
        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="How to create a branch, view branch diff and share implementations instructions"
            description="Learn how to utilize the branched workflows to iterate on your analytics"
            callToAction={new CallToAction('/workspace/branches')}
          />
          <PageLink
            image={AnalyticsManagerIcon}
            title="Invite your coworkers to Avo"
            description="Grow your team on Avo"
            callToAction={new CallToAction('/workspace/members')}
          />
        </div>
        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="Discussions and collaboration on branches"
            description="Discuss the changes in your tracking plan"
            callToAction={new CallToAction('/data-design/start-collaborating')}
          />
          <PageLink
            image={AnalyticsManagerIcon}
            title="Review and approval workflows (steps 4 and 5 in the guide)"
            description="Protect your main branch from mergin non approved changes"
            callToAction={
              new CallToAction(
                '/data-design/day-to-day-workflow#a-namestep-4-ask-for-reviewa-step-4--ask-for-review',
              )
            }
          />
        </div>
        <h3 className={[styles.label, styles.heading3].join(' ')}>
          Publish tracking plan from Avo to other analytics tools
        </h3>
        <p className={styles.text}>
          You can set up your tracking plan to be automatically published to
          Segment Protocols, Amplitude and Mixpanel every time a branch is
          merged. We also provide a webhook for advanced automation.
        </p>
        <div className={styles.row}>
          <div style={{ display: 'flex' }}>
            <b className={styles.tableLabels}>Data managers</b>
          </div>
        </div>
        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="Setting up publishing and auto publishing to Segment, Amplitude and Mixpanel"
            description="Use Avo as a source of truth of your tracking plan, sync other tools automatically when changes are made"
            callToAction={
              new CallToAction('/workspace/tracking-plan/publishing')
            }
          />
        </div>
        <h2 id="stage2" className={[styles.label, styles.heading2].join(' ')}>
          Step 2. Tracking plan validation – one time SDK install
        </h2>
        <p className={styles.text}>
          Add a lightweight SDK to your code to learn how actual implementation
          compares with the defined tracking plan. Get instant feedback on what
          tracking is implemented when working on new features with the
          Implementation status in your Avo workspace soon. Observe your
          tracking calls on device in real time with the Avo Debuggers.
        </p>
        <p className={styles.text}>
          This stage requires one time setup in each of your applications. The
          setup is simple and shouldn&apos;t take more than 30 minutes. It is
          not necessary to set up all platforms at once, you can start with a
          single platform. Once it&apos;s done the data design team will get the
          full power of Avo.
        </p>
        <p className={styles.text}>
          Adoption step 1 is required, but steps 2 and 3 are interchangable,
          i.e. you can go directly to step 3 without going through step 2 if
          your platform does not yet have the Inspector SDK and start using the
          Inspector once it&apos;s available.
        </p>
        <div className={styles.row}>
          <div style={{ display: 'flex' }}>
            <b className={styles.tableLabels}>Data managers</b>
          </div>
          <div style={{ display: 'flex' }}>
            <b className={styles.tableLabels}>Developers</b>
          </div>
        </div>
        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="Set up webhook publishing"
            description="Send tracking plan changes to a custom endpoint"
            callToAction={
              new CallToAction(
                '/workspace/tracking-plan/publishing#a-namewebhooka-webhook',
              )
            }
          />
          <PageLink
            image={DevIcon}
            title="Listen to the tracking plan changes with a webhook"
            description="Listen to the tracking plan changes with custom code"
            callToAction={
              new CallToAction('/implementation/avo-tracking-plan-webhook')
            }
          />
        </div>
        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="Use Inspector to monitor analytics implementation"
            description="Find the difference between your tracking plan and the actual implementation in the code"
            callToAction={
              new CallToAction('/data-design/start-using-inspector')
            }
          />
          <PageLink
            image={DevIcon}
            title="How does Avo Inspector SDK work?"
            description="Learn the technical part of the Inspector SDK"
            callToAction={
              new CallToAction('/implementation/devs-101#avo-inspector-sdk')
            }
          />
        </div>
        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="Using Mobile Debuggers"
            description="Monitor events flow visually in your apps"
            callToAction={
              new CallToAction(
                '/explore-tracking-plan/start-using-visual-debuggers#accessing-mobile-debuggers',
              )
            }
          />
          <PageLink
            image={DevIcon}
            title="Avo Inspector SDK reference"
            description="Methods and parameters of the Inspector SDK on all platforms"
            callToAction={
              new CallToAction('/implementation/avo-inspector-sdk-reference')
            }
          />
        </div>
        <div className={styles.row}>
          {emptyRowElement()}
          <PageLink
            image={DevIcon}
            title="Set up the Mobile Debuggers"
            description="Enable a view to see the events flow in your debug and staging apps"
            callToAction={
              new CallToAction('/implementation/setup-mobile-debugger')
            }
          />
        </div>

        <h2 id="stage3" className={[styles.label, styles.heading2].join(' ')}>
          Step 3. Tracking plan implementation workflow for your team
        </h2>

        <p className={styles.text}>
          Avo generates human readable, type-safe, tracking code called Avo
          Functions, that sends the data exactly as planned. No more data bugs
          or cross-platform discrepancies in your analytics tracking!
        </p>

        <p className={styles.text}>
          This step requires developers to adopt Avo into their tracking
          implementation workflow.
        </p>
        <p className={styles.text}>
          It&apos;s not necessary to swap all your tracking with Avo functions,
          in fact we recommend starting by only using Avo functions for new
          events.
        </p>
        <p className={styles.text}>
          It&apos;s not necessary to adopt Avo functions on all platforms at
          It&apos;s not necessary to adopt Avo functions on all platforms at
          once, you can start with a single platform.
        </p>

        <div className={styles.row}>
          <div style={{ display: 'flex' }}>
            <b className={styles.tableLabels}>Data managers</b>
          </div>
          <div style={{ display: 'flex' }}>
            <b className={styles.tableLabels}>Developers</b>
          </div>
        </div>
        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="Set up the tracking plan for Avo functions"
            description="Enable Avo to generate type-safe code for your analytics implementation"
            callToAction={
              new CallToAction('/implementation/avo-tracking-plan-webhook')
            }
          />
          <PageLink
            image={DevIcon}
            title="How do Avo Functions work?"
            description="Learn what's inside the Avo functions"
            callToAction={
              new CallToAction(
                '/implementation/devs-101#a-nameavo-generated-filea-avo-generated-file-containing-avo-functions',
              )
            }
          />
        </div>
        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="Check the implementation status of an event in the Avo UI"
            description="Verify that particular event with correct parameters was sent from your code"
            callToAction={
              new CallToAction(
                '/workspace/implement#a-nameimplement-actionsa-implement-events',
              )
            }
          />
          <PageLink
            image={DevIcon}
            title="Avo Cli"
            description="Install and use the Avo CLI to conveniently fetch the generated code"
            callToAction={new CallToAction('/implementation/cli')}
          />
        </div>
        <div className={styles.row}>
          {emptyRowElement()}
          <PageLink
            image={DevIcon}
            title="Avo Inspector and Avo Functions"
            description="Setting up Avo Inspector and Avo Functions to work together"
            callToAction={
              new CallToAction(
                '/implementation/start-using-inspector-with-avo-functions',
              )
            }
          />
        </div>
        <div className={styles.row}>
          {emptyRowElement()}
          <PageLink
            image={DevIcon}
            title="Web Debugger"
            description="Monitor events flow visually on your website"
            callToAction={
              new CallToAction('/implementation/start-using-web-debugger')
            }
          />
        </div>

        <h3 className={[styles.label, styles.heading3].join(' ')}>
          Avo functions reference
        </h3>

        <div className={styles.row}>
          <PageLink
            image={DevIcon}
            title="Programming languages you can generate Avo Functions for"
            description="List of languages and platforms supported by Avo Functions"
            callToAction={
              new CallToAction(
                '/implementation/supported-programming-languages',
              )
            }
          />

          <PageLink
            image={DevIcon}
            title="How to define custom destinations"
            description="Learn how to write a custom destination in your language"
            callToAction={
              new CallToAction('/implementation/start-custom-destination')
            }
          />

          <PageLink
            image={DevIcon}
            title="Controlling the console logs"
            description="Disable or write your own logs"
            callToAction={new CallToAction('/implementation/custom-loggers')}
          />
        </div>

        <h2
          id="workspace"
          className={[styles.label, styles.heading2].join(' ')}
        >
          Explore your Avo workspace
        </h2>

        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="All the workspace screens explained"
            description="Learn your way around Avo"
            callToAction={new CallToAction('/workspace/')}
          />
        </div>

        <h2 id="guides" className={[styles.label, styles.heading2].join(' ')}>
          Comprehensive data design and implementation guides
        </h2>
        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="Global namespace"
            description="Learn why events and properties are global in Avo"
            callToAction={new CallToAction('/data-design/global-namespace')}
          />
          <PageLink
            image={AnalyticsManagerIcon}
            title="Naming conventions"
            description="One of the most important things in a tracking plan"
            callToAction={new CallToAction('/data-design/naming-conventions')}
          />
          <PageLink
            image={DevIcon}
            title="Controlling Logs"
            description="Change how Avo Inspector and Avo functions print logs"
            callToAction={new CallToAction('/implementation/logs')}
          />
        </div>
        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="Purpose meetings"
            description="This is how we recommend to plan analytics for a new release"
            callToAction={
              new CallToAction(
                '/data-design/documenting-purpose-meetings-in-avo',
              )
            }
          />
          <PageLink
            image={AnalyticsManagerIcon}
            title="Downstream deps"
            description="How to document dependencies of your analytics events in Avo"
            callToAction={
              new CallToAction(
                '/data-design/documenting-downstream-dependancies',
              )
            }
          />
          <PageLink
            image={DevIcon}
            title="Avo and tests"
            description="Use Avo in unit and integration tests"
            callToAction={
              new CallToAction('/implementation/avo-and-unit-tests')
            }
          />
        </div>
        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="Multiple sources on Avo branches"
            description="Best practices in working with multiple platforms"
            callToAction={
              new CallToAction('/data-design/multiple-sources-on-avo-branches')
            }
          />
          <PageLink
            image={AnalyticsManagerIcon}
            title="Defining descriptive events and properties"
            description="Our advice on how to name entities in your tracking plan"
            callToAction={
              new CallToAction(
                '/data-design/defining-descriptive-events-and-properties',
              )
            }
          />
          <PageLink
            image={DevIcon}
            title="Avo in the CI"
            description="Use Avo in your continuous integration pipeline"
            callToAction={new CallToAction('/implementation/avo-in-the-ci')}
          />
        </div>
        <div className={styles.row}>
          <PageLink
            image={AnalyticsManagerIcon}
            title="Organizing metrics and events"
            description="Categories, metrics and naming conventions for events and properties"
            callToAction={
              new CallToAction('/data-design/organizing-metrics-and-events')
            }
          />
          <PageLink
            image={DevIcon}
            title="Using Avo in large development teams"
            description="Learn how seamless it is"
            callToAction={new CallToAction('/implementation/avo-and-git')}
          />
          <PageLink
            image={DevIcon}
            title="Avo functions and linters"
            description="Set up your linter to work with Avo functions"
            callToAction={new CallToAction('/implementation/avo-and-linters')}
          />
        </div>
      </div>

      <StickyBox className={styles.tocSidebar}>{tocContent}</StickyBox>
    </div>
  );
};

export default LandingPage;
