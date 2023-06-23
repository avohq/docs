import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DocsThemeConfig, useTheme } from 'nextra-theme-docs';
import SignIn from './components/SignIn';

interface LogoProps {
  width: number;
  height: number;
}

const Logo: FunctionComponent<LogoProps> = ({ width, height }) => {
  let { resolvedTheme } = useTheme();
  let fill = resolvedTheme === 'dark' ? '#ffffff' : '#232628';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 160 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="104"
        y="0"
        width="56"
        height="56"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M104.478 0.0522461H160V55.7265H104.478V0.0522461Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M132.239 5.78042C120.082 5.78042 110.19 15.6991 110.19 27.8892C110.19 40.08 120.082 49.9988 132.239 49.9988C144.397 49.9988 154.288 40.08 154.288 27.8892C154.288 15.6991 144.397 5.78042 132.239 5.78042M132.239 55.7269C116.932 55.7269 104.478 43.2388 104.478 27.8892C104.478 12.5404 116.932 0.0522461 132.239 0.0522461C147.547 0.0522461 160 12.5404 160 27.8892C160 43.2388 147.547 55.7269 132.239 55.7269"
          fill={fill}
        />
      </g>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M107.199 0.0371094H101.102L83.343 46.6318L65.5451 0.0371094H59.4097L80.675 55.674H83.343H86.011L107.199 0.0371094Z"
        fill={fill}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M27.7604 5.72833C15.6035 5.72833 5.71172 15.6463 5.71172 27.8371C5.71172 40.028 15.6035 49.9467 27.7604 49.9467C39.9188 49.9467 49.8098 40.028 49.8098 27.8371C49.8098 15.6463 39.9188 5.72833 27.7604 5.72833M27.7605 55.674C12.4534 55.674 0 43.1866 0 27.8371C0 12.4875 12.4534 0.00012207 27.7605 0.00012207C43.0691 0.00012207 55.5225 12.4875 55.5225 27.8371C55.5225 43.1866 43.0691 55.674 27.7605 55.674"
        fill={fill}
      />
      <mask
        id="mask1"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="160"
        height="56"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 55.7265H160V0H0V55.7265Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask1)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M48.1753 55.7265H56.7438V0H48.1753V55.7265Z"
          fill="#EC008C"
        />
      </g>
    </svg>
  );
};

const config: DocsThemeConfig = {
  logo: <Logo width={60} height={21} />,
  logoLink: 'https://www.avo.app/',
  useNextSeoProps: () => ({
    titleTemplate: '%s - Avo Docs',
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
  primaryHue: 324,
  navbar: {
    extraContent: <SignIn />,
  },
};

export default config;
