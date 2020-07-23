import styles from './Navigation.module.scss';
import { FunctionComponent } from 'react';

import classNames from 'classnames';

import { useRouter } from 'next/router';
import Link from '../components/Link';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import Icon from './Icon';

interface navigationItem {
  title: string;
  path: string;
  iconName?: IconName;

  subroutes?:
    | {
        title: string;
        path: string;
      }[]
    | null;
}

const navigation: navigationItem[] = [
  { title: 'Getting started', path: '/', iconName: 'rocket' },
  {
    title: 'Your Avo Workspace',
    path: '/workspace',
    iconName: 'home',
    subroutes: [
      { title: 'Tracking Plan', path: '/workspace/tracking-plan' },
      { title: 'Connections', path: '/workspace/connections' },
      { title: 'Implement', path: '/workspace/implement' },
      { title: 'Integrations (beta)', path: '/workspace/integrations' },
      { title: 'Health (being deprecated)', path: '/workspace/health' },
    ],
  },
  {
    title: 'Developer Tools',
    path: '/commands',
    iconName: 'toolbox',
    subroutes: [
      {
        title: 'Command Line Tool',
        path: '/commands',
      },
      {
        title: 'Programming Languages',
        path: '/languages',
      },
      {
        title: 'Analytics Tools',
        path: '/analytics',
      },
      {
        title: 'Custom Destinations',
        path: '/custom-destinations',
      },
      {
        title: 'Regression Checking',
        path: '/regression',
      },
      {
        title: 'Data Validation',
        path: '/data-validation',
      },
      {
        title: 'Mobile Debuggers',
        path: '/mobile-debuggers',
      },
    ],
  },

  {
    title: 'Inspector',
    path: '/inspector',
    iconName: 'heartbeat',
    subroutes: [
      { title: 'Inspector SDK', path: '/inspector/sdk' },
      { title: 'Android', path: '/inspector/sdk/android' },
      { title: 'iOS', path: '/inspector/sdk/ios' },
      { title: 'Web', path: '/inspector/sdk/js' },
      { title: 'Issues', path: '/inspector/issue-identifier' },
      { title: 'FAQ', path: '/inspector/faq' },
    ],
  },
  {
    title: 'Best Practices',
    path: '/best-practices',
    iconName: 'award',
    subroutes: [
      { title: 'Avo and git', path: '/best-practices/avo-and-git' },
      { title: 'Avo in unit tests', path: '/best-practices/unit-tests' },
      {
        title: 'Multiple sources on Avo branches',
        path: '/best-practices/multiple-sources-working-on-a-branch',
      },
      {
        title: 'Descriptive events and properties',
        path: '/best-practices/defining-descriptive-events-and-properties',
      },
      {
        title: 'Organizing metrics and events',
        path: '/best-practices/organizing-metrics-and-events',
      },
    ],
  },
  {
    title: 'Help',
    path: '/help/troubleshooting',
    iconName: 'life-ring',
    subroutes: [
      { title: 'Troubleshooting & support', path: '/help/troubleshooting' },
      { title: 'FAQ', path: '/help/faq' },
    ],
  },
];

interface GroupProps {
  item: navigationItem;
}

const Group: FunctionComponent<GroupProps> = ({ item }) => {
  const router = useRouter();

  const rootActive = router.pathname === item.path;

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

      {item.subroutes &&
        item.subroutes.map((subroute) => {
          const subrouteActive = router.pathname === subroute.path;

          return (
            <Link href={subroute.path} key={subroute.path}>
              <div
                className={classNames(styles.subroute, {
                  [styles.activeLink]: subrouteActive,
                })}
              >
                {subroute.title}
              </div>
            </Link>
          );
        })}
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
