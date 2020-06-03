import { FunctionComponent } from 'react';

export interface frontMatter {
  title: string;
  abstract?: string | null;
}

export interface layoutProps {
  frontMatter: frontMatter;
}

type LayoutComponent = FunctionComponent<layoutProps>;

const createLayout = (Component: LayoutComponent) => (frontMatter: frontMatter) => {
  const Layout: FunctionComponent<layoutProps> = (props) => <Component frontMatter={frontMatter} {...props} />;
  return Layout;
};

export default createLayout;
