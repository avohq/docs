import { FunctionComponent, useEffect } from 'react';
import { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';

import Avo from '../Avo';

import '../styles/global.css';

import Layout from '../components/Layout';
import MDComponents from '../styles/MDComponents';
import useAvoPath from '../util/useAvoPath';

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  Avo.initAvo({ env: Avo.AvoEnv.Dev }, { client: 'Docs', version: '2.0' }, {});

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
