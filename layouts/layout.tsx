import { FunctionComponent, ReactElement } from 'react';

export interface frontMatter {
  title: string;
  abstract?: string | null;
  mdTitle?: string | null;
  __resourcePath: string;
}

export type contentItem = ReactElement<{
  originalType?: string | null;
  id?: string | null;
}>;

export interface layoutProps {
  frontMatter: frontMatter;
  children?: contentItem | contentItem[];
}

type LayoutComponent = FunctionComponent<layoutProps>;

const createLayout = (Component: LayoutComponent) => (
  frontMatter: frontMatter,
): FunctionComponent<layoutProps> => {
  const Layout: FunctionComponent<layoutProps> = (props) => (
    <Component {...props} frontMatter={frontMatter} />
  );
  return Layout;
};

export default createLayout;
