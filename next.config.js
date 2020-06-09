/* eslint-disable @typescript-eslint/no-var-requires */
const withMdxEnhanced = require('next-mdx-enhanced');

const toc = require('./plugins/toc');

const enhanceMdx = withMdxEnhanced({
  layoutPath: 'layouts',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [],
  rehypePlugins: [],
  extendFrontMatter: {
    process: (mdxContent, frontMatter) => ({
      ...frontMatter,
      toc: toc(mdxContent),
    }),
    phase: 'loader',
  },
});

const config = {};

module.exports = enhanceMdx(config);
