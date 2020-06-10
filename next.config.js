/* eslint-disable @typescript-eslint/no-var-requires */
const withMdxEnhanced = require('next-mdx-enhanced');

const headings = require('remark-autolink-headings');
const slug = require('remark-slug');

const enhanceMdx = withMdxEnhanced({
  layoutPath: 'layouts',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [slug, headings],
  rehypePlugins: [],
  // extendFrontMatter: {
  //   process: (mdxContent, frontMatter) => ({
  //     ...frontMatter,
  //     toc: toc(mdxContent),
  //   }),
  //   phase: 'loader',
  // },
});

const config = {};

module.exports = enhanceMdx(config);
