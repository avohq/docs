import styles from './Navigation.module.scss';
import { FunctionComponent } from 'react';

import classNames from 'classnames';

import { useRouter } from 'next/router';
import Link from '../components/Link';
import React from 'react';

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
  iconName?: string | null;
  subroutes?: subroutes | null;
}

const navigation: navigationItem[] = [
  {
    title: 'Getting started with Avo',
    path: '/',
    iconName: 'home',
    subroutes: [
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
    ],
  },
  {
    title: 'Your Avo Workspace',
    path: '/workspace',
    iconName: 'toolbox',
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
            title: 'Importing',
            path: '/workspace/tracking-plan/importing',
          },
          {
            type: 'route',
            title: 'Exporting',
            path: '/workspace/tracking-plan/exporting',
          },
          {
            type: 'route',
            title: 'Publishing',
            path: '/workspace/tracking-plan/publishing',
          },
          {
            type: 'route',
            title: 'Tracking plan validation',
            path: '/workspace/tracking-plan/issue-reporter',
          },
          {
            type: 'route',
            title: 'Implementation status',
            path: '/workspace/tracking-plan/implementation-status',
          },
        ],
      },
      { type: 'route', title: 'Branches', path: '/workspace/branches' },
      { type: 'route', title: 'Connections', path: '/workspace/connections' },
      { type: 'route', title: 'Implement', path: '/workspace/implement' },
      {
        type: 'route',
        title: 'Inspector',
        path: '/workspace/inspector',
        subroutes: [
          {
            type: 'route',
            title: 'Send data from Segment (no code)',
            path: '/workspace/connect-inspector-to-segment',
          },
          {
            type: 'route',
            title: 'Issue types',
            path: '/explore-tracking-plan/issue-types-in-inspector',
          },
        ],
      },
      { type: 'route', title: 'Members', path: '/workspace/members' },
      {
        type: 'route',
        title: 'Integrate with other tools',
        path: '/workspace/integrations',
      },
    ],
  },
  {
    title: 'Data Design',
    path: '/data-design/start-data-design',
    iconName: 'data-design',
    subroutes: [
      {
        type: 'group',
        group: 'Getting started guides',
      },
      {
        type: 'route',
        title: 'Design data in Avo',
        path: '/data-design/start-data-design',
      },
      {
        type: 'route',
        title: 'Managing Sources and Destinations',
        path: '/data-design/define-sources-and-destinations',
      },
      {
        type: 'route',
        title: 'Collaborate in Avo',
        path: '/data-design/start-collaborating',
      },
      {
        type: 'route',
        title: 'Use Inspector',
        path: '/data-design/start-using-inspector',
      },
      {
        type: 'route',
        title: 'Publish your Tracking Plan to your schema management system',
        path: '/data-design/start-publishing',
      },
      {
        type: 'route',
        title: 'Import your tracking plan into Avo',
        path: '/workspace/tracking-plan/importing',
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
        group: 'Guides and best practices',
      },
      {
        type: 'route',
        title: 'Day to day workflow',
        path: '/data-design/day-to-day-workflow',
      },
      {
        type: 'route',
        title: 'Naming Conventions',
        path: '/data-design/naming-conventions',
      },
      {
        type: 'route',
        title: 'Global Namespace for events and properties',
        path: '/data-design/global-namespace',
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
      {
        type: 'route',
        title: 'Organizing multi-product workspaces',
        path: '/data-design/organizing-multi-product-workspaces',
      },
    ],
  },
  {
    title: 'Implementation',
    path: '/implementation/devs-101',
    iconName: 'implementation',
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
        title: 'Using the Inspector SDK',
        path: '/implementation/setup-inspector-sdk',
      },
      {
        type: 'route',
        title: 'Using Avo Functions',
        path: '/implementation/start-using-avo-functions',
      },
      {
        type: 'route',
        title: 'Using the Avo CLI',
        path: '/implementation/cli',
      },
      {
        type: 'route',
        title: 'Using the Avo Visual Debuggers',
        path: '/implementation/start-using-visual-debugger',
        subroutes: [
          {
            type: 'route',
            title: 'Web',
            path: '/implementation/start-using-web-debugger',
          },
          {
            type: 'route',
            title: 'Mobile',
            path: '/implementation/setup-mobile-debugger',
          },
        ],
      },
      {
        type: 'route',
        title: 'Implementing tracking plan changes',
        path: '/implementation/start-implementing-tracking-changes',
      },
      {
        type: 'route',
        title: 'Sharing implementation instructions',
        path: '/implementation/read-implementation-diff',
      },
      {
        type: 'route',
        title: 'Using the Inspector SDK with Avo Functions',
        path: '/implementation/start-using-inspector-with-avo-functions',
      },
      {
        type: 'group',
        group: 'Advanced guides and best practices',
      },
      {
        type: 'route',
        title: 'Avo and parallel tracking changes',
        path: '/implementation/avo-and-git',
      },
      {
        type: 'route',
        title: 'Avo and unit tests',
        path: '/implementation/avo-and-unit-tests',
      },
      {
        type: 'route',
        title: 'Avo and linters',
        path: '/implementation/avo-and-linters',
      },
      {
        type: 'route',
        title: 'Avo and CI/CD',
        path: '/implementation/avo-in-the-ci',
      },
      {
        type: 'route',
        title: 'Avo and monorepos',
        path: '/implementation/avo-in-monorepo',
      },
      {
        type: 'route',
        title: 'Subscribe to changes with webhooks',
        path: '/implementation/avo-tracking-plan-webhook',
      },
      {
        type: 'group',
        group: 'Reference',
      },
      {
        type: 'route',
        title: 'Avo Functions',
        path: '/implementation/supported-programming-languages',
        subroutes: [
          {
            type: 'route',
            title: 'Programming languages',
            path: '/implementation/supported-programming-languages',
          },
          {
            type: 'route',
            title: 'Custom Destinations',
            path: '/implementation/start-custom-destination',
          },
          {
            type: 'route',
            title: 'Configuring logging',
            path: '/implementation/custom-loggers',
          },
        ],
      },
      {
        type: 'route',
        title: 'Avo Inspector SDKs',
        path: '/implementation/avo-inspector-sdk-reference',
        subroutes: [
          {
            type: 'route',
            title: 'Android SDK',
            path: '/implementation/inspector/sdk/android',
          },
          {
            type: 'route',
            title: 'iOS SDK',
            path: '/implementation/inspector/sdk/ios',
          },
          {
            type: 'route',
            title: 'Web SDK',
            path: '/implementation/inspector/sdk/web',
          },
          {
            type: 'route',
            title: 'React Native SDK',
            path: '/implementation/inspector/sdk/react-native',
          },
          {
            type: 'route',
            title: 'Node.js SDK',
            path: '/implementation/inspector/sdk/node',
          },
        ],
      },
      {
        type: 'route',
        title: 'Mobile debuggers',
        path: '/implementation/mobile-debuggers-reference',
      },
    ],
  },
  {
    title: 'Explore the Tracking Plan',
    path: '/explore-tracking-plan/start-using-visual-debuggers',
    iconName: 'tracking-plan',
    subroutes: [
      {
        type: 'route',
        title: 'Using visual debuggers to understand tracking',
        path: '/explore-tracking-plan/start-using-visual-debuggers',
      },
    ],
  },
  {
    title: 'Help',
    path: '/help/troubleshooting',
    iconName: 'help',
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
            <React.Fragment key={subroute.path + ' ' + subroute.title}>
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
            </React.Fragment>
          );
        case 'group':
          return (
            <div
              key={'group-' + subroute.group}
              className={classNames(styles.subrouteGroup)}
            >
              {subroute.group}
            </div>
          );
      }
    });
  };

  const icon = locateIcon(item);

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
              <img src={icon} alt="" />
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

function locateIcon(item: navigationItem) {
  let icon = null;
  switch (item.iconName) {
    case 'home': {
      icon = require('../images/home-icon.svg');
      break;
    }
    case 'data-design': {
      icon = require('../images/data-design-icon.svg');
      break;
    }
    case 'help': {
      icon = require('../images/help-icon.svg');
      break;
    }
    case 'implementation': {
      icon = require('../images/implementation-icon.svg');
      break;
    }
    case 'toolbox': {
      icon = require('../images/toolbox-icon.svg');
      break;
    }
    case 'tracking-plan': {
      icon = require('../images/tracking-plan-icon.svg');
      break;
    }
    default: {
      break;
    }
  }
  return icon;
}

export default Navigation;
