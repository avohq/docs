import { layoutProps } from '../layouts/layout';
import React from 'react';
import innerText from 'react-innertext';

export interface heading {
  id: string;
  level: number;
  text: string;
}

const generateToc = (children: layoutProps['children']): heading[] => {
  // Converted to for each loop b/c there's no React.Children.Filter >:(
  const toc: heading[] = [];

  React.Children.forEach(children, (child) => {
    if (
      !child ||
      !child.props ||
      !child.props.originalType ||
      !['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(child.props.originalType)
    )
      return;

    toc.push({
      id: child.props.id || '',
      level: Number(
        child.props.originalType && child.props.originalType.substring(1),
      ),
      text: innerText(child),
    });
  });

  return toc;
};

export default generateToc;
