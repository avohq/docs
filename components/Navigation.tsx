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
  { title: 'Getting Started', path: '/', iconName: 'rocket' },
  {
    title: 'Your Avo Workspace',
    path: '/workspace',
    iconName: 'home',
    subroutes: [
      {
        type: 'route',
        title: 'Tracking plan',
        path: '/workspace/tracking-plan',
      },
      { type: 'route', title: 'Connections', path: '/workspace/connections' },
      { type: 'route', title: 'Implement', path: '/workspace/implement' },
      {
        type: 'route',
        title: 'Integrations beta',
        path: '/workspace/integrations',
      },
      {
        type: 'route',
        title: 'Health being deprecated',
        path: '/workspace/health',
      },
    ],
  },
  {
    title: 'Developer Tools',
    path: '/commands',
    iconName: 'toolbox',
    subroutes: [
      {
        type: 'route',
        title: 'Command line tool',
        path: '/commands',
      },
      {
        type: 'route',
        title: 'Programming languages',
        path: '/languages',
      },
      {
        type: 'route',
        title: 'Analytics tools',
        path: '/analytics',
      },
      {
        type: 'route',
        title: 'Custom destinations',
        path: '/custom-destinations',
      },
      {
        type: 'route',
        title: 'Regression checking',
        path: '/regression',
      },
      {
        type: 'route',
        title: 'Data validation',
        path: '/data-validation',
      },
      {
        type: 'route',
        title: 'Mobile debuggers',
        path: '/mobile-debuggers',
      },
    ],
  },

  {
    title: 'Inspector',
    path: '/inspector',
    iconName: 'heartbeat',
    subroutes: [
      {
        type: 'route',
        title: 'Inspector SDK',
        path: '/inspector/sdk',
        subroutes: [
          { type: 'route', title: 'Android', path: '/inspector/sdk/android' },
          { type: 'route', title: 'iOS', path: '/inspector/sdk/ios' },
          { type: 'route', title: 'Web', path: '/inspector/sdk/js' },
          {
            type: 'route',
            title: 'React native',
            path: '/inspector/sdk/react-native',
          },
        ],
      },
      {
        type: 'route',
        title: 'Using inspector with Avo functions',
        path: '/inspector/using-inspector-with-avo-functions',
      },
      { type: 'route', title: 'Issues', path: '/inspector/issue-identifier' },
      { type: 'route', title: 'FAQ', path: '/inspector/faq' },
    ],
  },
  {
    title: 'Best Practices',
    path: '/best-practices',
    iconName: 'award',
    subroutes: [
      {
        type: 'group',
        group: 'Plan',
      },
      {
        type: 'route',
        title: 'Day to day workflow',
        path: '/best-practices/day-to-day-workflow',
      },
      {
        type: 'route',
        title: 'Documenting purpose meetings',
        path: '/best-practices/documenting-purpose-meetings-in-avo',
      },
      {
        type: 'route',
        title: 'Documenting downstream dependancies',
        path: '/best-practices/documenting-downstream-dependancies',
      },
      {
        type: 'route',
        title: 'Multiple sources on Avo branches',
        path: '/best-practices/multiple-sources-working-on-a-branch',
      },
      {
        type: 'route',
        title: 'Descriptive events and properties',
        path: '/best-practices/defining-descriptive-events-and-properties',
      },
      {
        type: 'route',
        title: 'Organizing metrics and events',
        path: '/best-practices/organizing-metrics-and-events',
      },
      {
        type: 'group',
        group: 'Implement',
      },
      {
        type: 'route',
        title: 'Avo and git',
        path: '/best-practices/avo-and-git',
      },
      {
        type: 'route',
        title: 'Avo in unit tests',
        path: '/best-practices/unit-tests',
      },
      {
        type: 'route',
        title: 'Avo functions alongside existing tracking',
        path: '/best-practices/avo-functions-alongside-existing-tracking',
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
      { type: 'route', title: 'Faq', path: '/help/faq' },
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
                <div className={styles.subSubroute} key={subroute.path + "-subroutes"}>
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
