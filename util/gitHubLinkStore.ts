import { Store } from 'pullstate';

interface StoreState {
  path: string | null;
}

export const GitHubLinkStore = new Store<StoreState>({
  path: null,
});