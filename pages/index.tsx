import Head from 'next/head';

import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Avo Docs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Home;
