import Head from 'next/head';

import { NextPage } from 'next';

import Link from 'next/link';

function formatPath(p: string) {
  return p.replace(/\.mdx$/, '');
}

import { frontMatter as docsPages } from './**/*.mdx';

const Home: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Avo Docs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ul>
        {docsPages.map((page) => (
          <li key={page.__resourcePath}>
            <Link href={formatPath(page.__resourcePath)}>
              <a>{page.title || formatPath(page.__resourcePath)}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
