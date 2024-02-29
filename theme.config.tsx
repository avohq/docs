import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useConfig, DocsThemeConfig } from 'nextra-theme-docs';
import SignIn from './components/SignIn';

interface LogoProps {
  width: number;
}

const Logo: FunctionComponent<LogoProps> = ({ width }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 844 270"
      width={width}
      fill="none"
    >
      <path
        fill="currentColor"
        d="M97 264h99v-64H66V70H0v97c0 57 40 97 97 97Zm196 0h12v-64h-43v-97c0-57-40-97-97-97H66v64h130v97c0 57 40 97 97 97ZM383 264h90L570 6h-72l-68 194h-4L358 6h-72l97 258ZM707 206a71 71 0 0 1 0-142 71 71 0 0 1 0 142Zm0 64c75 0 137-61 137-135S782 0 707 0 570 61 570 135s62 135 137 135Z"
      />
    </svg>
  );
};

const config: DocsThemeConfig = {
  logo: <Logo width={80} />,
  logoLink: 'https://www.avo.app/',
  useNextSeoProps: () => ({
    titleTemplate: '%s - Avo Docs',
  }),
  project: {
    link: 'https://github.com/avohq',
  },
  docsRepositoryBase: 'https://github.com/avohq/docs/tree/main',
  head: function Head() {
    const { title } = useConfig();
    const router = useRouter();
    const baseUrl = 'https://www.avo.app/docs';
    const fullUrl =
      router.asPath === '/' ? baseUrl : `${baseUrl}${router.asPath}`;

    const ogUrl = title
      ? `${baseUrl}/api/og?title=${encodeURIComponent(title)}`
      : `${baseUrl}/api/og`;

    return (
      <>
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/docs/images/favicon.png?v=2"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@avohq" />
        <meta name="twitter:creator" content="@avohq" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={fullUrl} />
        <link rel="canonical" href={fullUrl} />
        <meta property="twitter:image" content={ogUrl} />
        <meta property="og:image" content={ogUrl} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Avo Docs" />
      </>
    );
  },
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
  primaryHue: 324,
  navbar: {
    extraContent: <SignIn />,
  },
};

export default config;
