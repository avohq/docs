import React from 'react';
import Footer from './components/Footer';
import Image from 'next/image';
import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: (
    <Image alt="Avo logo" src={'/images/logo.svg'} height={21} width={60} />
  ),
  project: {
    link: 'https://github.com/avohq/docs',
  },
  docsRepositoryBase: 'https://github.com/avohq/docs/tree/main',
  footer: {
    text: <Footer />,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
};

export default config;
