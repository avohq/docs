import NextLink, { LinkProps } from 'next/link';
import { format } from 'url';
import getConfig from 'next/config';
import { PropsWithChildren } from 'react';

const { publicRuntimeConfig } = getConfig();

const Link: React.FunctionComponent<PropsWithChildren<LinkProps>> = ({ children, ...props }) => (
  <NextLink
    {...props}
    as={`${publicRuntimeConfig.basePath || ''}${format(props.href)}`}
  >
    {children}
  </NextLink>
);

export default Link;
