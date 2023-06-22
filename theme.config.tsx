import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: (
    <Image alt="Avo logo" src={'/docs/images/logo.svg'} height={21} width={60} />
  ),
  project: {
    link: 'https://github.com/avohq/docs',
  },
  docsRepositoryBase: 'https://github.com/avohq/docs/tree/main',
  footer: {
    text: (
      <Link href="/help/troubleshooting">
        <Image
          alt="Rescue ring"
          src="/docs/images/svg/faq.svg"
          width={20}
          height={20}
        />{' '}
        Support
      </Link>
    ),
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
};

export default config;
