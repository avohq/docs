import { FunctionComponent } from 'react';
import { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';

import '../styles/global.css';

import Layout from '../components/Layout';
import MDComponents from '../styles/MDComponents';

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <MDXProvider components={MDComponents}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </MDXProvider>
);

export default App;
