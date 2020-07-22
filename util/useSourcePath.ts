import { useEffect } from 'react';
import { Store, useStoreState } from 'pullstate';

interface StoreState {
  path: string | null;
}

const GitHubLinkStore = new Store<StoreState>({
  path: null,
});

export const setSourcePath = (path: string): void => {
  useEffect(() => {
    GitHubLinkStore.update((s) => {
      s.path = path;
    });

    return () =>
      GitHubLinkStore.update((s) => {
        s.path = null;
      });
  }, []);
};

export default (): StoreState['path'] => {
  const store = useStoreState(GitHubLinkStore);
  return store.path;
};
