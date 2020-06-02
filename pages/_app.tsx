import { FunctionComponent } from 'react';
import { AppProps } from 'next/app';

import '../styles/global.css';

import Layout from '../components/Layout';

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default App;
