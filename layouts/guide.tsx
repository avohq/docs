import { FunctionComponent } from 'react';
import createLayout, { layoutProps } from './layout';

const Guide: FunctionComponent<layoutProps> = ({ frontMatter, children }) => {
  return (
    <div>
      <h1>{frontMatter.title}</h1>
      {children}
    </div>
  );
};

export default createLayout(Guide);
