import fs from 'fs';
import glob from 'glob';
const repl = require('repl');

import FlexSearch from 'flexsearch';

import remark from 'remark';
import mdx from 'remark-mdx';
import strip from 'remark-mdx-to-plain-text';
import matter from 'gray-matter';

const readPage = (url: string) => {
  const page = fs.readFileSync(url);
  const { content, data } = matter(page);

  const body = remark().use(mdx).use(strip).processSync(content);

  return { url, content: body.contents, frontMatter: data };
};

const generateIndex = async () => {
  const index = FlexSearch.create();

  const pages = await glob.sync('pages/**/*.mdx');
  const processed = pages.map(readPage);

  processed.forEach((page, idx) => {
    index.add(
      idx,
      `${page.frontMatter['title'] || ''} \n ${
        page.frontMatter['abstract']
      } \n ${page.content}`,
    );
  });

  repl.start('> ').context.index = index;

  console.log(processed);
};

generateIndex();
