import { FunctionComponent } from 'react';

export interface frontMatter {
  title: string;
  abstract?: string | null;
}

export interface layoutProps {
  frontMatter: frontMatter;
}

type LayoutComponent = FunctionComponent<layoutProps>;

const createLayout = (Component: LayoutComponent) => (
  frontMatter: frontMatter,
): FunctionComponent<layoutProps> => {
  const Layout: FunctionComponent = (props) => (
    <Component {...props} frontMatter={frontMatter} />
  );
  return Layout;
};

export default createLayout;
