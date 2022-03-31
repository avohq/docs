import { FunctionComponent, ReactElement } from 'react';

export interface frontMatter {
  title: string;
  showSidebar?: boolean | null;
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

const createLayout = (
  Component: LayoutComponent,
): FunctionComponent<layoutProps> => {
  const Layout: FunctionComponent<layoutProps> = ({
    children,
    frontMatter: frontMatter,
  }) => <Component frontMatter={frontMatter}>{children}</Component>;
  return Layout;
};

export default createLayout;
