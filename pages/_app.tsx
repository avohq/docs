import { FunctionComponent, useEffect } from 'react';
import { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';

import Avo, { AvoEnv } from '../Avo';

import '../styles/global.css';

import Layout from '../components/Layout';
import MDComponents from '../styles/MDComponents';
import useAvoPath from '../util/useAvoPath';

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
        <Component {...pageProps} />
      </Layout>
    </MDXProvider>
  );
};

export default App;
