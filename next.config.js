/* eslint-disable @typescript-eslint/no-var-requires */
const withMdxEnhanced = require('next-mdx-enhanced');
const withImages = require('next-images');

// const headings = require('remark-autolink-headings');
const slug = require('remark-slug');
const { env } = require('process');

const enhanceMdx = withMdxEnhanced({
  layoutPath: 'layouts',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [slug],
  rehypePlugins: [],
});

const compose = (...fns) => (x) => fns.reduceRight((y, f) => f(y), x);
const config = {
  assetPrefix: env.DEV ? undefined : '/docs2',
};

module.exports = compose(enhanceMdx, withImages)(config);
