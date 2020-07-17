import { FunctionComponent, useEffect } from 'react';
import { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';

import Avo, { AvoEnv } from '../Avo';

import '../styles/global.css';

import Layout from '../components/Layout';
import MDComponents from '../styles/MDComponents';
import useAvoPath from '../util/useAvoPath';
import Head from 'next/head';

const getAvoEnv = () => {
  switch (process.env.NEXT_PUBLIC_AVO_ENV) {
    case 'production':
      return AvoEnv.Prod;
    case 'staging':
      return AvoEnv.Staging;
    case 'development':
    default:
      return AvoEnv.Dev;
  }
};

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  Avo.initAvo({ env: getAvoEnv() }, { client: 'Docs', version: '2.0' }, {});

  const path = useAvoPath();

  useEffect(() => {
    const onCopy = () => {
      const content = window.getSelection()?.toString();
      Avo.contentCopied({ path, content });
    };

    window.addEventListener('copy', onCopy);
    return () => {
      window.removeEventListener('copy', onCopy);
    };
  }, []);

  return (
    <MDXProvider components={MDComponents}>
      <Layout>
        <Head>
          <meta name="theme-color" content="#000000" />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href={require('../images/favicon.png')}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html:
                "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-T2GMTSM');",
            }}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html:
                'var _iub = _iub || []; _iub.csConfiguration = {"lang":"en","siteId":1197126,"countryDetection":true,"enableCcpa":true,"cookiePolicyId":91875699, "banner":{ "slideDown":false,"position":"float-bottom-right","textColor":"#333","backgroundColor":"#ffffff", "height": "150px !important", "overflow": "auto !important", "width": "200px !important" }};',
            }}
          />
          <script
            type="text/javascript"
            src="//cdn.iubenda.com/cs/iubenda_cs.js"
            charSet="UTF-8"
            async
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </MDXProvider>
  );
};

export default App;
