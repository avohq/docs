import styles from './Navigation.module.scss';
import { FunctionComponent } from 'react';

import classNames from 'classnames';

import { useRouter } from 'next/router';
import Link from 'next/link';
import Note from './Note';

interface navigationItem {
  title: string;
  path: string;

  subroutes?:
    | {
        title: string;
        path: string;
      }[]
    | null;
}

const navigation: navigationItem[] = [
  { title: 'Test', path: '/test' },
  { title: 'Overview', path: '/' },
  {
    title: 'Quick start',
    path: '/quickstart',
    subroutes: [
      { title: 'Avo for analytics managers', path: '/quickstart/pms' },
      { title: 'Avo for developers', path: '/quickstart/developers' },
    ],
  },
  {
    title: 'Guides',
    path: '/guides',
    subroutes: [
      { title: 'The workflow', path: '/guides/workflow' },
      { title: 'The inspector', path: '/guides/inspector' },
      { title: 'Creating a tracking plan', path: '/guides/trackingplan' },
    ],
  },
  {
    title: 'Reference',
    path: '/reference',
    subroutes: [
      { title: 'Avo CLI', path: '/reference/cli' },
      { title: 'Avo workspace', path: '/reference/workspace' },
      { title: 'Mobile debuggers', path: '/reference/debuggers' },
      { title: 'Best practices', path: '/reference/bestpractices' },
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

      <div className={styles.group}>
        <div className={styles.parentLink}>Your SDK</div>
        <Note>
          <b>Log in</b> to access your SDK docs
        </Note>
      </div>
    </div>
  );
};

export default Navigation;
