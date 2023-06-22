import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: (
    <Image alt="Avo logo" src="/docs/images/logo.svg" height={21} width={60} />
  ),
  logoLink: "https://www.avo.app/",
  useNextSeoProps: () => ({
    titleTemplate: '%s - Avo Docs'
  }),
  project: {
    link: 'https://github.com/avohq/docs',
  },
  docsRepositoryBase: 'https://github.com/avohq/docs/tree/main',
  footer: {
    text: (
      <Link href="/help/troubleshooting">
        <div style={{ display: 'flex', gap: '8px' }}>
          <Image
            alt="Rescue ring"
            src="/docs/images/svg/faq.svg"
            width={20}
            height={20}
          />
          Support
        </div>
      </Link>
    ),
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
};

export default config;
