import styles from './Navigation.module.scss';
import { FunctionComponent } from 'react';

import classNames from 'classnames';

import { useRouter } from 'next/router';
import Link from '../components/Link';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import Icon from './Icon';

type subroutes = ({
  title: string;
  path: string;
  subroutes?: subroutes
} | {
  group: string;
})[];

interface navigationItem {
  title: string;
  path: string;
  iconName?: IconName;
  subroutes?:
    | subroutes
    | null;
}

const navigation: navigationItem[] = [
  { title: 'Getting started', path: '/', iconName: 'rocket' },
  {
    title: 'Your Avo Workspace',
    path: '/workspace',
    iconName: 'home',
    subroutes: [
      { title: 'Tracking plan', path: '/workspace/tracking-plan' },
      { title: 'Connections', path: '/workspace/connections' },
      { title: 'Implement', path: '/workspace/implement' },
      { title: 'Integrations beta', path: '/workspace/integrations' },
      { title: 'Health being deprecated', path: '/workspace/health' },
    ],
  },
  {
    title: 'Developer Tools',
    path: '/commands',
    iconName: 'toolbox',
    subroutes: [
      {
        title: 'Command line tool',
        path: '/commands',
      },
      {
        title: 'Programming languages',
        path: '/languages',
      },
      {
        title: 'Analytics tools',
        path: '/analytics',
      },
      {
        title: 'Custom destinations',
        path: '/custom-destinations',
      },
      {
        title: 'Regression checking',
        path: '/regression',
      },
      {
        title: 'Data validation',
        path: '/data-validation',
      },
      {
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
      { title: 'Inspector SDK', path: '/inspector/sdk', subroutes: [
        { title: 'Android', path: '/inspector/sdk/android' },
        { title: 'iOS', path: '/inspector/sdk/ios' },
        { title: 'Web', path: '/inspector/sdk/js' },
        { title: 'React native', path: '/inspector/sdk/react-native' },
      ]},
      {
        title: 'Using inspector with Avo functions',
        path: '/inspector/using-inspector-with-avo-functions',
      },
      { title: 'Issues', path: '/inspector/issue-identifier' },
      { title: 'FAQ', path: '/inspector/faq' },
    ],
  },
  {
    title: 'Best Practices',
    path: '/best-practices',
    iconName: 'award',
    subroutes: [
      {
        group: "Plan"
      },
      {
        title: 'Day to day workflow',
        path: '/best-practices/day-to-day-workflow',
      },
      {
        title: 'Documenting purpose meetings',
        path: '/best-practices/documenting-purpose-meetings-in-avo',
      },
      {
        title: 'Documenting downstream dependancies',
        path: '/best-practices/documenting-downstream-dependancies',
      },
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
      {
        group: "Implement"
      },
      { title: 'Avo and git', path: '/best-practices/avo-and-git' },
      { title: 'Avo in unit tests', path: '/best-practices/unit-tests' },
      { title: 'Avo functions alongside existing tracking', path: '/best-practices/avo-functions-alongside-existing-tracking' },
    ],
  },
  {
    title: 'Help',
    path: '/help/troubleshooting',
    iconName: 'life-ring',
    subroutes: [
      { title: 'Troubleshooting support', path: '/help/troubleshooting' },
      { title: 'Faq', path: '/help/faq' },
    ],
  },
];

interface GroupProps {
  item: navigationItem;
}

const Group: FunctionComponent<GroupProps> = ({ item }) => {
  const router = useRouter();

  const rootActive = router.pathname === item.path;

  const renderSubroutes = subroutes => {
    return subroutes.map((subroute) => {
      if (subroute.group) {
        return (
          <div
              className={classNames(styles.subrouteGroup)}
            >
              {subroute.group}
            </div>
        );
      } else {
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
          {
              subroute.subroutes ? <div className={styles.subSubroute}> {renderSubroutes(subroute.subroutes)} </div> : null 
            }
          </>
        );
      }
      
    })
  }

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
        renderSubroutes(item.subroutes)}
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
