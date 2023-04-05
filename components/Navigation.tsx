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
    title: 'Avo Workflow',
    iconName: 'rocket',
    subroutes: [
      {
        type: 'route',
        title: 'Overview',
        path: '/workflow/overview',
      },
      {
        type: 'route',
        title: '1. Plan',
        path: '/workflow/plan',
      },
      {
        type: 'route',
        title: '2. Review',
        path: '/workflow/review',
      },
      {
        type: 'route',
        title: '3. Request implementation',
        path: '/workflow/request-implementation',
      },
      {
        type: 'route',
        title: '4. Implement',
        path: '/workflow/implement',
      },
      {
        type: 'route',
        title: '5. Validate',
        path: '/workflow/validate',
      },
      {
        type: 'route',
        title: '6. Merge branch & Publish',
        path: '/workflow/merge-publish',
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
        path: '/audit/overview',
      },
      {
        type: 'route',
        title: 'Quickstart: Get your first audit',
        path: '/audit/quickstart',
      },
      {
        type: 'route',
        title: 'Branch audits',
        path: '/audit/branch-audit',
      },
      {
        type: 'route',
        title: 'Audit rules and configuration',
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
            title: 'Implementation status',
            path: '/workspace/tracking-plan/implementation-status',
          },
          {
            type: 'route',
            title: 'Workbench',
            path: '/workspace/tracking-plan/workbench',
          },
        ],
      },

      {
        type: 'route',
        title: 'Sources',
        path: '/data-design/define-sources-and-destinations',
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
            title: 'Review code changes',
            path: '/workspace/code-changes',
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
          {
            type: 'route',
            title: 'Authentication methods',
            path: '/workspace/authentication',
          },
        ],
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
            title: 'Pinned Properties and Use Cases',
            path: '/data-design/pinned-properties',
          },
          {
            type: 'route',
            title: 'Defining object properties',
            path: '/data-design/object-properties',
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
          // { Deleting for now
          //   type: 'route',
          //   title: 'Analytics tools',
          //   path: '/data-design/analytics',
          // },
          {
            type: 'route',
            title: 'Multiple sources on Avo branches',
            path: '/data-design/multiple-sources-on-avo-branches',
          },
          {
            type: 'route',
            title: 'Archive and restore from archive',
            path: '/workspace/archive-and-restore',
          },
          {
            type: 'route',
            title: 'Reset the Tracking Plan',
            path: '/workspace/reset-tracking-plan',
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
        title: 'Overview',
        path: '/workspace/inspector',
      },
      {
        type: 'route',
        title: 'Configuring sources',
        path: '/workspace/inspector/configuring-inspector-sources',
      },
      {
        type: 'route',
        title: 'Events view',
        path: '/workspace/inspector/inspector-events-view',
      },
      {
        type: 'route',
        title: 'Issues view',
        path: '/workspace/inspector/inspector-issues-view',
      },
      {
        type: 'route',
        title: 'Issue types',
        path: '/explore-tracking-plan/issue-types-in-inspector',
      },
      {
        type: 'route',
        title: 'Slack alerts',
        path: '/workspace/inspector/inspector-slack-alerts',
      },
      {
        type: 'route',
        title: 'Add Events from Inspector',
        path: '/workspace/add-events-from-inspector',
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
        title: 'Inspector RudderStack integration',
        path: '/workspace/connect-inspector-to-rudderstack',
      },
      {
        type: 'route',
        title: 'Inspector PostHog integration',
        path: '/workspace/connect-inspector-to-posthog',
      },
      {
        type: 'route',
        title: 'Inspector SDKs',
        path: '/implementation/avo-inspector-overview',
      },
    ],
  },
  {
    title: 'Import, Export and Publishing',
    iconName: 'publishing',
    subroutes: [
      {
        type: 'route',
        title: 'Importing',
        path: '/workspace/tracking-plan/importing',
      },
      {
        type: 'group',
        title: 'Publishing',
        subroutes: [
          {
            type: 'route',
            title: 'Overview',
            path: '/workspace/tracking-plan/publishing',
          },
          {
            type: 'route',
            title: 'Use Cases',
            path: '/publishing/publishing-use-cases',
          },
          {
            type: 'group',
            title: 'Integrations',
            subroutes: [
              {
                type: 'route',
                title: 'Segment Protocols',
                path: '/publishing/segment-protocols',
              },
              {
                type: 'route',
                title: 'Mixpanel Lexicon',
                path: '/publishing/mixpanel-lexicon',
              },
              {
                type: 'route',
                title: 'Rudderstack Tracking Plans',
                path: '/publishing/rudderstack',
              },
              {
                type: 'route',
                title: 'Snowplow Data Structures',
                path: '/publishing/snowplow-data-structures',
              },
              {
                type: 'route',
                title: 'mParticle Data Master',
                path: '/publishing/mparticle-data-master',
              },
              {
                type: 'route',
                title: 'Amplitude Govern',
                path: '/publishing/amplitude-govern',
              },
              {
                type: 'route',
                title: 'Webhook',
                path: '/publishing/webhook-publishing',
              },
            ],
          },
        ],
      },
      {
        type: 'route',
        title: 'Exporting',
        path: '/workspace/tracking-plan/exporting',
      },
      {
        type: 'route',
        title: 'Signing and Verifying Webhooks',
        path: '/workspace/tracking-plan/webhook-signing',
      },
    ],
  },

  {
    title: 'Type safe code, unit tests and CI',
    iconName: 'implementation',
    subroutes: [
      {
        type: 'section',
        group: 'Avo Codegen',
      },
      {
        type: 'route',
        title: 'Avo Codegen overview',
        path: '/implementation/avo-codegen-overview',
      },
      {
        type: 'route',
        title: 'Avo Codegen setup',
        path: '/implementation/start-using-avo-codegen',
      },
      {
        type: 'route',
        title: 'Avo Codegen technical deep dive',
        path: '/implementation/avo-codegen-tech-deep-dive',
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
        title: 'Implementing tracking with Avo Codegen',
        path: '/implementation/start-implementing-tracking-changes',
      },
      {
        type: 'route',
        title: 'Avo Codegen alongside existing tracking',
        path: '/implementation/avo-and-existing-tracking',
      },
      {
        type: 'route',
        title: 'Avo visual debuggers to verify tracking',
        path: '/explore-tracking-plan/start-using-visual-debuggers',
      },
      {
        type: 'route',
        title: 'Avo Codegen in unit tests',
        path: '/implementation/avo-and-unit-tests',
      },
      {
        type: 'route',
        title: 'Avo Codegen status in CI/CD',
        path: '/implementation/avo-in-the-ci',
      },
      {
        type: 'route',
        title: 'Avo Codegen and linters',
        path: '/implementation/avo-and-linters',
      },
      {
        type: 'route',
        title: 'Avo Codegen with Inspector SDK ',
        path: '/implementation/start-using-inspector-with-avo-codegen',
      },
      {
        type: 'route',
        title: 'Get Avo Codegen without using Avo CLI',
        path: '/explore-tracking-plan/download-or-copy-avo-file-manually',
      },
      {
        type: 'route',
        title: 'Avo Codegen and parallel tracking changes',
        path: '/implementation/avo-and-git',
      },
      {
        type: 'route',
        title: 'Avo Codegen in monorepos',
        path: '/implementation/avo-in-monorepo',
      },
      {
        type: 'route',
        title: 'Property groups in Codegen',
        path: '/implementation/property-groups-unfolding',
      },
      {
        type: 'route',
        title: 'Explicit null in the Codegen',
        path: '/implementation/explicit-null-in-codegen',
      },
    ],
  },
  {
    title: 'Reference',
    iconName: 'book',
    subroutes: [
      {
        type: 'group',
        title: 'Avo Codegen',
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
            type: 'route',
            title: 'Destinations',
            path: '/implementation/destinations',
          },
          {
            type: 'route',
            title: 'Configuring logging',
            path: '/implementation/custom-loggers',
          },
          {
            type: 'route',
            title: 'User identification',
            path: '/implementation/anonymous-user-id',
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
          {
            type: 'route',
            title: 'Dart and Flutter SDK',
            path: '/implementation/inspector/sdk/dart',
          },
          {
            type: 'route',
            title: 'Java SDK',
            path: '/implementation/inspector/sdk/java',
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
      {
        type: 'group',
        title: 'Avo Public API',
        subroutes: [
          {
            type: 'route',
            title: 'Overview',
            path: '/public-api/overview',
          },
          {
            type: 'route',
            title: 'Authentication',
            path: '/public-api/authentication',
          },
          {
            type: 'route',
            title: 'Export Tracking Plan',
            path: '/public-api/export-tracking-plan',
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
            <a
              style={{ textDecoration: 'none' }}
              className={classNames(styles.subroute, {
                [styles.activeLink]: isActive,
              })}
            >
              {route.title}
            </a>
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
    case 'publishing': {
      icon = require('../images/publishing_icon.svg');
      break;
    }
    default: {
      break;
    }
  }
  return icon;
}

export default Navigation;
