import styles from './Navigation.module.scss';
import { FunctionComponent } from 'react';

import classNames from 'classnames';

import { useRouter } from 'next/router';
import Link from '../components/Link';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import Icon from './Icon';

type route = {
  type: 'route';
  title: string;
  path: string;
  subroutes?: subroute[];
};

type group = {
  type: 'group';
  group: string;
};

type subroute = route | group;

type subroutes = subroute[];

interface navigationItem {
  title: string;
  path: string;
  iconName?: IconName;
  subroutes?: subroutes | null;
}

const navigation: navigationItem[] = [
  {
    title: 'What is Avo',
    path: '/',
    iconName: 'rocket',
    subroutes: [
      { type: 'route', title: 'What is Avo?', path: '/' },
      {
        type: 'route',
        title: 'FAQs',
        path: '/faqs/yes-you-can-faq',
        subroutes: [
          {
            type: 'route',
            title: 'What can I do with Avo',
            path: '/faqs/yes-you-can-faq',
          },
          {
            type: 'route',
            title: 'Inspector FAQ',
            path: '/faqs/faq-inspector',
          },
        ],
      },
      //{ type: 'route', title: 'Glossary', path: '/glossary' },
    ],
  },
  {
    title: 'Your Avo Workspace',
    path: '/workspace',
    iconName: 'home',
    subroutes: [
      {
        type: 'route',
        title: 'Tracking plan',
        path: '/workspace/tracking-plan',
        subroutes: [
          {
            type: 'route',
            title: 'Events',
            path: '/workspace/tracking-plan/events',
          },
          {
            type: 'route',
            title: 'Properties',
            path: '/workspace/tracking-plan/properties',
          },
          {
            type: 'route',
            title: 'Metrics',
            path: '/workspace/tracking-plan/metrics',
          },
          {
            type: 'route',
            title: 'Publishing',
            path: '/workspace/tracking-plan/publishing',
          },
          {
            type: 'route',
            title: 'Issue Reporter',
            path: '/workspace/tracking-plan/issue-reporter',
          },
        ],
      },
      { type: 'route', title: 'Connections', path: '/workspace/connections' },
      { type: 'route', title: 'Implement', path: '/workspace/implement' },
      { type: 'route', title: 'Inspector', path: '/workspace/inspector' },
    ],
  },
  {
    title: 'Implementation',
    path: '/implementation/devs-101',
    iconName: 'toolbox',
    subroutes: [
      {
        type: 'route',
        title: 'Avo 101 for developers',
        path: '/implementation/devs-101',
      },
      {
        type: 'group',
        group: 'Getting started guides',
      },
      {
        type: 'route',
        title: 'Getting started with Avo Functions',
        path: '/implementation/start-using-avo-functions',
      },
      {
        type: 'route',
        title: 'Getting started to receive data with a Custom Destination',
        path: '/implementation/start-custom-destination',
      },
      {
        type: 'route',
        title: 'Getting started with the Avo Visual Debuggers',
        path: '/implementation/start-using-visual-debugger',
      },
      {
        type: 'route',
        title: 'Getting started to use standalone Inspector',
        path: '/implementation/start-using-inspector',
      },
      {
        type: 'route',
        title: 'Getting started to use Inspector alongside Avo Functions',
        path: '/implementation/start-using-inspector-with-avo-functions',
      },
      {
        type: 'route',
        title:
          'Getting started to implement tracking plan changes in code with Avo',
        path: '/implementation/start-implementing-tracking-changes',
      },
      {
        type: 'group',
        group: 'Tools',
      },
      {
        type: 'route',
        title: 'Supported programming languages',
        path: '/implementation/supported-programming-languages',
      },
      {
        type: 'route',
        title: 'Command line tool',
        path: '/implementation/cli',
      },
      {
        type: 'route',
        title: 'Logs',
        path: '/implementation/logs',
      },
      {
        type: 'group',
        group: 'Advanced guides and best practices',
      },
      {
        type: 'route',
        title: 'Avo and git',
        path: '/implementation/avo-and-git',
      },
      {
        type: 'route',
        title: 'Avo and unit tests',
        path: '/implementation/avo-and-unit-tests',
      },
      {
        type: 'route',
        title: 'Avo in the CI',
        path: '/implementation/avo-in-the-ci',
      },
      {
        type: 'route',
        title: 'Subscribe to tracking plan changes webhook',
        path: '/implementation/avo-tracking-plan-webhook',
      },
      {
        type: 'group',
        group: 'Reference',
      },
      {
        type: 'route',
        title: 'Avo Inspector SDK reference',
        path: '/implementation/avo-inspector-sdk-reference',
        subroutes: [
          {
            type: 'route',
            title: 'Android',
            path: '/implementation/inspector/sdk/android',
          },
          {
            type: 'route',
            title: 'iOS',
            path: '/implementation/inspector/sdk/ios',
          },
          {
            type: 'route',
            title: 'Web',
            path: '/implementation/inspector/sdk/web',
          },
          {
            type: 'route',
            title: 'React native',
            path: '/implementation/inspector/sdk/react-native',
          },
        ],
      },
    ],
  },
  {
    title: 'Data Design',
    path: '/data-design/start-data-design',
    iconName: 'award',
    subroutes: [
      {
        type: 'group',
        group: 'Getting started guides',
      },
      {
        type: 'route',
        title: 'Getting started to design data in Avo',
        path: '/data-design/start-data-design',
      },
      {
        type: 'route',
        title: 'Getting started to collaborate in Avo',
        path: '/data-design/start-collaborating',
      },
      {
        type: 'route',
        title:
          'Getting started to use Inspector to help identify issues to fix in your legacy events',
        path: '/data-design/start-using-inspector',
      },
      {
        type: 'route',
        title:
          'Getting started publishing your tracking plan to Amplitude Govern, Mixpanel Lexicon and Segment Protocols',
        path: '/data-design/start-publishing',
      },
      {
        type: 'group',
        group: 'Tools',
      },
      {
        type: 'route',
        title: 'Analytics tools',
        path: '/data-design/analytics',
      },
      {
        type: 'group',
        group: 'Advanced guides and best practices',
      },
      {
        type: 'route',
        title: 'Day to day workflow',
        path: '/data-design/day-to-day-workflow',
      },
      {
        type: 'route',
        title: 'Documenting purpose meetings',
        path: '/data-design/documenting-purpose-meetings-in-avo',
      },
      {
        type: 'route',
        title: 'Documenting downstream dependancies',
        path: '/data-design/documenting-downstream-dependancies',
      },
      {
        type: 'route',
        title: 'Multiple sources on Avo branches',
        path: '/data-design/multiple-sources-on-avo-branches',
      },
      {
        type: 'route',
        title: 'Defining descriptive events and properties',
        path: '/data-design/defining-descriptive-events-and-properties',
      },
      {
        type: 'route',
        title: 'Organizing metrics and events',
        path: '/data-design/organizing-metrics-and-events',
      },
    ],
  },
  {
    title: 'Explore the Tracking Plan',
    path: '/explore-tracking-plan/start-understandings-what-your-data-means',
    iconName: 'award',
    subroutes: [
      {
        type: 'route',
        title: 'Getting started to understand what your data means with Avo',
        path:
          '/explore-tracking-plan/start-understandings-what-your-data-means',
      },
      {
        type: 'route',
        title: 'Getting started using visual debuggers',
        path: '/explore-tracking-plan/start-using-visual-debuggers',
      },
    ],
  },
  {
    title: 'Help',
    path: '/help/troubleshooting',
    iconName: 'life-ring',
    subroutes: [
      {
        type: 'route',
        title: 'Troubleshooting support',
        path: '/help/troubleshooting',
      },
    ],
  },
];

interface GroupProps {
  item: navigationItem;
}

const Group: FunctionComponent<GroupProps> = ({ item }) => {
  const router = useRouter();

  const rootActive = router.pathname === item.path;

  const renderSubroutes = (subroutes: subroutes) => {
    return subroutes.map((subroute: subroute) => {
      switch (subroute.type) {
        case 'route':
          const subrouteActive = router.pathname === subroute.path;
          return (
            <>
              <Link href={subroute.path} key={subroute.path}>
                <div
                  className={classNames(styles.subroute, {
                    [styles.activeLink]: subrouteActive,
                  })}
                >
                  {subroute.title}
                </div>
              </Link>
              {subroute.subroutes ? (
                <div
                  className={styles.subSubroute}
                  key={subroute.path + '-subroutes'}
                >
                  {' '}
                  {renderSubroutes(subroute.subroutes)}{' '}
                </div>
              ) : null}
            </>
          );
        case 'group':
          return (
            <div className={classNames(styles.subrouteGroup)}>
              {subroute.group}
            </div>
          );
      }
    });
  };

  return (
    <div className={styles.group}>
      <Link href={item.path}>
        <div
          className={classNames(styles.parentLink, {
            [styles.activeLink]: rootActive,
          })}
        >
          {item.iconName && (
            <span className={styles.iconWrapper}>
              <Icon name={item.iconName} />
            </span>
          )}
          {item.title}
        </div>
      </Link>

      {item.subroutes && renderSubroutes(item.subroutes)}
    </div>
  );
};

const Navigation: FunctionComponent = () => {
  return (
    <div className={styles.root}>
      {navigation.map((item) => (
        <Group key={item.path} item={item}></Group>
      ))}
    </div>
  );
};

export default Navigation;
