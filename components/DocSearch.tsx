import styles from './DocSearch.module.scss';
import Icon from './Icon';
import { FunctionComponent, useEffect, useState } from 'react';
import Avo from '../Avo';

interface SearchHit {
  url: string;
}

interface SearchInput {
  getVal: () => string;
}

interface SearchSuggestion {
  url: string;
}

enum Status {
  NotFocused,
  Focused,
  ResultSelected,
}

const DocSearch: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [searchHits, setSearchHits] = useState<SearchHit[]>([]);
  const [searchStatus, setSearchStatus] = useState(Status.NotFocused);

  const [isLoading, setLoading] = useState(false);

  const initializeDocSearch = () => {
    let searchHits: SearchHit[] = [];
    window.docsearch({
      apiKey: 'db5ac03036725a2cd252824f49ab2b09',
      indexName: 'avo',
      inputSelector: '#algolia-avo-search', // the selector of my search input
      transformData: (hits: SearchHit[]) => {
        setSearchHits(hits);
        searchHits = hits;
      },
      handleSelected: (
        input: SearchInput,
        _: never,
        suggestion: SearchSuggestion,
      ) => {
        setSearchStatus(Status.ResultSelected);
        const searchString = input.getVal();
        const searchResultZeroBasedPosition = searchHits
          .map((hit: SearchHit) => {
            return hit.url;
          })
          .indexOf(suggestion.url);
        Avo.docsSearchResultSelected({
          searchResultPosition: searchResultZeroBasedPosition + 1,
          searchResultCount: searchHits.length,
          searchTerm: searchString,
          searchTermCharacterCount: searchString.length,
        });
        window.open(suggestion.url, '_self');
      },
    });
    setLoading(false);
  };

  useEffect(() => {
    if (window.docsearch) {
      initializeDocSearch();
    } else {
      // eslint-disable-next-line no-console
      console.info(
        'Still waiting for Docsearch to load, setting up onload listener...',
      );
      setLoading(true);
      const scriptTag = document.querySelector('#load-docsearch-script');
      if (scriptTag) {
        scriptTag.addEventListener('load', function () {
          // eslint-disable-next-line no-console
          console.info('Docsearch loaded, initializing...');
          initializeDocSearch();
        });
      } else {
        // eslint-disable-next-line no-console
        console.error(
          'Could not load Docsearch, script tag with the id #load-docsearch-script not found',
        );
      }
    }
  }, []);

  return (
    <div className={styles.root}>
      <Icon name="search" color="inherit" />
      <input
        id="algolia-avo-search"
        placeholder={
          isLoading ? 'Loading search...' : 'Search the documentation'
        }
        className={styles.searchInput}
        onFocus={() => {
          setSearchStatus(Status.Focused);
          Avo.docsSearchInitialized();
        }}
        onBlur={() => {
          if (searchStatus != Status.ResultSelected) {
            Avo.docsSearchAbandoned({
              searchTerm: searchTerm,
              searchTermCharacterCount: searchTerm.length,
              searchResultCount: searchHits.length,
            });
          }
          setSearchStatus(Status.NotFocused);
        }}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        disabled={isLoading}
      />
    </div>
  );
};

export default DocSearch;
