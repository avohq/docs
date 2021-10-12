import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import Link from '../components/Link';
import styles from './Navigation.module.scss';

type route = {
  type: 'route';
  title: string;
  path: string;
};

type section = {
  type: 'section';
  group: string;
};

type group = {
  type: 'group';
  title: string;
  subroutes: subroute[];
};

type subroute = route | section | group;

type subroutes = subroute[];

interface navigationItem {
  title: string;
  iconName: string;
  subroutes: subroutes;
}

const navigation: navigationItem[] = [
  {
    title: 'Home',
    iconName: 'home',
    subroutes: [
      {
        type: 'route',
        title: 'Getting Started',
        path: '/',
      },
      {
        type: 'group',
        title: 'FAQs',
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
    title: 'Tracking Plan Audit',
    iconName: 'health',
    subroutes: [
      {
        type: 'route',
        title: 'What is tracking plan audit?',
        path: '/audit/index',
      },
      {
        type: 'route',
        title: 'Quickstart: Get your first audit',
        path: '/audit/quickstart',
      },
      {
        type: 'route',
        title: 'Audit rules',
        path: '/audit/rules',
      },
    ],
  },
  {
    title: 'Tracking Plan Management',
    iconName: 'tracking-plan',
    subroutes: [
      {
        type: 'route',
        title: 'What is a tracking plan?',
        path: '/workspace/tracking-plan',
      },
      {
        type: 'route',
        title: 'Quickstart: Tracking plan in Avo',
        path: '/data-design/quick-start',
      },
      {
        type: 'route',
        title: 'Deep dive: Data design in Avo',
        path: '/data-design/start-data-design',
      },
      {
        type: 'group',
        title: 'The Avo Tracking Plan',
        subroutes: [
          {
            type: 'route',
            title: 'Overview',
            path: '/workspace',
          },
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
            title: 'Sources and destinations',
            path: '/data-design/define-sources-and-destinations',
          },
          {
            type: 'route',
            title: 'Implementation status',
            path: '/workspace/tracking-plan/implementation-status',
          },
        ],
      },

      {
        type: 'group',
        title: 'Branched workflows',
        subroutes: [
          {
            type: 'route',
            title: 'Quickstart: Branches',
            path: '/workspace/branches',
          },
          {
            type: 'route',
            title: 'Approval workflows',
            path: '/workspace/approval-workflows',
          },
          {
            type: 'route',
            title: 'Share implementation instructions',
            path: '/workspace/implementation-instructions',
          },
        ],
      },

      {
        type: 'group',
        title: 'Collaboration',
        subroutes: [
          {
            type: 'route',
            title: 'How to collaborate in Avo',
            path: '/data-design/start-collaborating',
          },
          // {
          //   type: 'route',
          //   title: '[TODO] Commenting',
          //   path: '/workspace/branches',
          // },
          {
            type: 'route',
            title: 'Managing members and roles',
            path: '/workspace/members',
          },
        ],
      },

      {
        type: 'group',
        title: 'Import, Export and Publishing',
        subroutes: [
          {
            type: 'route',
            title: 'Publishing',
            path: '/workspace/tracking-plan/publishing',
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
        ],
      },

      {
        type: 'route',
        title: 'Integrations',
        path: '/workspace/integrations',
      },

      {
        type: 'group',
        title: 'Best Practices and Guides',
        subroutes: [
          {
            type: 'section',
            group: 'Best Practices',
          },
          {
            type: 'route',
            title: 'Naming conventions',
            path: '/data-design/naming-conventions',
          },
          {
            type: 'route',
            title: 'Defining descriptive events and properties',
            path: '/data-design/defining-descriptive-events-and-properties',
          },
          {
            type: 'route',
            title: 'Global Namespace for events and properties',
            path: '/data-design/global-namespace',
          },
          {
            type: 'route',
            title: 'Intro to Group analytics',
            path: '/data-design/groups',
          },
          {
            type: 'section',
            group: 'Guides',
          },
          {
            type: 'route',
            title: 'Event Triggers and Use Cases',
            path: '/data-design/event-triggers',
          },
          {
            type: 'route',
            title: 'Name Mapping and Use Cases',
            path: '/data-design/name-mapping',
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
            title: 'Organizing metrics and events',
            path: '/data-design/organizing-metrics-and-events',
          },
          {
            type: 'route',
            title: 'Organizing multi-product workspaces',
            path: '/data-design/organizing-multi-product-workspaces',
          },
          {
            type: 'route',
            title: 'Analytics tools',
            path: '/data-design/analytics',
          },
          {
            type: 'route',
            title: 'Multiple sources on Avo branches',
            path: '/data-design/multiple-sources-on-avo-branches',
          },
        ],
      },
    ],
  },
  {
    title: 'Tracking Observability',
    iconName: 'inspector',
    subroutes: [
      // {
      //   type: 'route',
      //   title: '[TODO] What is Avo Inspector?',
      //   path: '/',
      // },
      {
        type: 'route',
        title: 'Quickstart: Get started with Inspector',
        path: '/data-design/start-using-inspector',
      },
      {
        type: 'section',
        group: 'Using Inspector',
      },
      {
        type: 'route',
        title: 'The Inspector dashboard',
        path: '/workspace/inspector',
      },
      {
        type: 'route',
        title: 'Inspector issue types',
        path: '/explore-tracking-plan/issue-types-in-inspector',
      },
      {
        type: 'section',
        group: 'Connecting Inspector',
      },
      {
        type: 'route',
        title: 'Inspector Segment integration',
        path: '/workspace/connect-inspector-to-segment',
      },
      {
        type: 'route',
        title: 'Inspector SDKs',
        path: '/implementation/avo-inspector-overview',
      },
    ],
  },
  {
    title: 'Analytics Release Workflow',
    iconName: 'rocket',
    subroutes: [
      {
        type: 'route',
        title: 'The Avo workflow',
        path: '/data-design/day-to-day-workflow',
      },
      {
        type: 'section',
        group: 'Guides',
      },
      {
        type: 'route',
        title: 'Sharing implementation instructions',
        path: '/implementation/read-implementation-diff',
      },
      {
        type: 'route',
        title: 'Subscribe to changes with webhooks',
        path: '/implementation/avo-tracking-plan-webhook',
      },
    ],
  },
  {
    title: 'Type safe code, unit tests and CI',
    iconName: 'implementation',
    subroutes: [
      {
        type: 'route',
        title: 'Avo 101 for developers',
        path: '/implementation/devs-101',
      },
      {
        type: 'section',
        group: 'Avo Functions',
      },
      {
        type: 'route',
        title: 'What are Avo Functions',
        path: '/implementation/avo-functions-overview',
      },
      {
        type: 'route',
        title: 'Quickstart: Avo Functions',
        path: '/implementation/start-using-avo-functions',
      },
      {
        type: 'route',
        title: 'Quickstart: Avo CLI',
        path: '/implementation/cli',
      },
      {
        type: 'section',
        group: 'Guides',
      },
      {
        type: 'route',
        title: 'Implementing tracking with Avo Functions',
        path: '/implementation/start-implementing-tracking-changes',
      },
      {
        type: 'route',
        title: 'Avo visual debuggers to verify tracking',
        path: '/explore-tracking-plan/start-using-visual-debuggers',
      },
      {
        type: 'route',
        title: 'Avo Functions in unit tests',
        path: '/implementation/avo-and-unit-tests',
      },
      {
        type: 'route',
        title: 'Avo Functions status in CI/CD',
        path: '/implementation/avo-in-the-ci',
      },
      {
        type: 'route',
        title: 'Avo Functions and linters',
        path: '/implementation/avo-and-linters',
      },
      {
        type: 'route',
        title: 'Avo Functions with Inspector SDK ',
        path: '/implementation/start-using-inspector-with-avo-functions',
      },
      {
        type: 'route',
        title: 'Get Avo Functions without using Avo CLI',
        path: '/explore-tracking-plan/download-or-copy-avo-file-manually',
      },
      {
        type: 'route',
        title: 'Avo Functions and parallel tracking changes',
        path: '/implementation/avo-and-git',
      },
      {
        type: 'route',
        title: 'Avo Functions in monorepos',
        path: '/implementation/avo-in-monorepo',
      },
    ],
  },
  {
    title: 'Reference',
    iconName: 'book',
    subroutes: [
      {
        type: 'group',
        title: 'Avo Functions',
        subroutes: [
          {
            type: 'group',
            title: 'Programming languages',
            subroutes: [
              {
                type: 'route',
                title: 'Overview',
                path: '/implementation/supported-programming-languages',
              },
              {
                type: 'route',
                title: 'JavaScript (Browser, Node.js, React Native)',
                path: '/implementation/reference/javascript',
              },
              {
                type: 'route',
                title: 'TypeScript (Browser, Node.js, React Native)',
                path: '/implementation/reference/typescript',
              },
              {
                type: 'route',
                title: 'ReasonML (Browser, Node.js, React Native)',
                path: '/implementation/reference/reasonml',
              },
              {
                type: 'route',
                title: 'Rescript (Browser, Node.js, React Native)',
                path: '/implementation/reference/rescript',
              },
              {
                type: 'route',
                title: 'Kotlin (Android)',
                path: '/implementation/reference/kotlin',
              },
              {
                type: 'route',
                title: 'Java (Android, Server)',
                path: '/implementation/reference/java',
              },
              {
                type: 'route',
                title: 'Swift (iOS, macOS)',
                path: '/implementation/reference/swift',
              },
              {
                type: 'route',
                title: 'Objective-C (iOS)',
                path: '/implementation/reference/objc',
              },
              {
                type: 'route',
                title: 'Python',
                path: '/implementation/reference/python',
              },
              {
                type: 'route',
                title: 'Ruby',
                path: '/implementation/reference/ruby',
              },
              {
                type: 'route',
                title: 'C# (Unity, .NET)',
                path: '/implementation/reference/csharp',
              },
              {
                type: 'route',
                title: 'PHP',
                path: '/implementation/reference/php',
              },
            ],
          },
          {
            type: 'group',
            title: 'Destinations',
            subroutes: [
              {
                type: 'route',
                title: 'Destination Interface',
                path: '/implementation/start-custom-destination',
              },
              {
                type: 'route',
                title: 'Snowplow',
                path: '/implementation/snowplow-destination',
              },
              {
                type: 'route',
                title: 'Managed Destinations',
                path: '/implementation/destinations/managed-destinations',
              },
            ],
          },
          {
            type: 'route',
            title: 'Configuring logging',
            path: '/implementation/custom-loggers',
          },
        ],
      },
      {
        type: 'group',
        title: 'Avo Inspector SDKs',
        subroutes: [
          {
            type: 'route',
            title: 'Overview',
            path: '/implementation/avo-inspector-sdk-reference',
          },
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
        type: 'group',
        title: 'Avo Debuggers',
        subroutes: [
          {
            type: 'route',
            title: 'Overview',
            path: '/implementation/start-using-visual-debugger',
          },
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
    ],
  },
  {
    title: 'Help',
    iconName: 'help',
    subroutes: [
      {
        type: 'route',
        title: 'Troubleshooting and support',
        path: '/help/troubleshooting',
      },
    ],
  },
];

interface SubroutesProps {
  routes: Array<subroute>;
  root: boolean;
}

const Subroutes: FunctionComponent<SubroutesProps> = ({ root, routes }) => {
  return (
    <div
      className={classNames(styles.subroutesContainer, {
        [styles.subroutesContainerRoot]: root,
      })}
    >
      {routes.map((route: subroute) => {
        return (
          <Subroute
            key={
              route.type == 'route'
                ? route.path
                : route.type == 'group'
                ? route.title
                : route.group
            }
            route={route}
          />
        );
      })}
    </div>
  );
};

const isActiveRoute = (currentPath: string, route: route): boolean => {
  return route.path === currentPath;
};

const hasActiveRoute = (currentPath: string, routes: subroutes): boolean => {
  return routes.some((route) => {
    switch (route.type) {
      case 'route':
        return isActiveRoute(currentPath, route);
      case 'group':
        return hasActiveRoute(currentPath, route.subroutes);
      case 'section':
        return false;
    }
  });
};
interface SubrouteProps {
  route: subroute;
}

const Subroute: FunctionComponent<SubrouteProps> = ({ route }) => {
  const router = useRouter();
  const isActive = hasActiveRoute(router.pathname, [route]);
  const [isExpanded, setExpanded] = React.useState(isActive);
  switch (route.type) {
    case 'route':
      return (
        <React.Fragment key={route.path + ' ' + route.title}>
          <Link href={route.path} key={route.path}>
            <div
              onClick={() =>
                setExpanded((currentIsExpanded) => !currentIsExpanded)
              }
              className={classNames(styles.subroute, {
                [styles.activeLink]: isActive,
              })}
            >
              {route.title}
            </div>
          </Link>
        </React.Fragment>
      );
    case 'group':
      return (
        <React.Fragment key={route.title}>
          <div
            onClick={() =>
              setExpanded((currentIsExpanded) => !currentIsExpanded)
            }
            className={classNames(styles.subroute, {
              [styles.activeLink]: isActive,
              [styles.subrouteExpand]: true,
            })}
          >
            <div className={styles.subrouteExpandIcon}>
              {route.subroutes && (isExpanded ? '▲' : '▼')}
            </div>
            {route.title}
          </div>
          {isExpanded && route.subroutes ? (
            <div
              className={styles.subSubroute}
              key={route.title + '-subroutes'}
            >
              <Subroutes root={false} routes={route.subroutes} />
            </div>
          ) : null}
        </React.Fragment>
      );
    case 'section':
      return (
        <div
          key={'group-' + route.group}
          className={classNames(styles.subrouteGroup)}
        >
          {route.group}
        </div>
      );
  }
};

interface GroupProps {
  item: navigationItem;
}

const Group: FunctionComponent<GroupProps> = ({ item }) => {
  const router = useRouter();

  const isRootActive = hasActiveRoute(router.pathname, item.subroutes);
  const [isExpanded, setExpanded] = React.useState(isRootActive);

  const icon = locateIcon(item);

  return (
    <div>
      <div
        onClick={() => setExpanded((currentIsExpanded) => !currentIsExpanded)}
        className={classNames(styles.parentLink, {
          [styles.activeLink]: isRootActive,
        })}
      >
        {icon && (
          <span className={styles.iconWrapper}>
            <img src={icon} alt="" />
          </span>
        )}
        {item.title}
      </div>
      {isExpanded && item.subroutes && (
        <Subroutes root={true} routes={item.subroutes} />
      )}
    </div>
  );
};

const Navigation: FunctionComponent = () => {
  return (
    <div className={styles.root}>
      {navigation.map((item) => (
        <Group key={item.title} item={item}></Group>
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
    case 'health': {
      icon = require('../images/audit/health.svg');
      break;
    }
    case 'inspector': {
      icon = require('../images/inspector-icon.svg');
      break;
    }
    case 'rocket': {
      icon = require('../images/rocket-icon.svg');
      break;
    }
    case 'book': {
      icon = require('../images/book-icon.svg');
      break;
    }
    default: {
      break;
    }
  }
  return icon;
}

export default Navigation;
