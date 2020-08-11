import styles from './DocSearch.module.scss';
import Icon from './Icon';
import { FunctionComponent } from 'react';

const DocSearch: FunctionComponent = () => {
  return (
    <div className={styles.root}>
      <Icon name="search" color="inherit" />
      <input
        id="algolia-avo-search"
        placeholder="Search"
        className={styles.searchInput}
      />
    </div>
  );
};

export default DocSearch;
