/* eslint-disable @typescript-eslint/no-var-requires */
const withMdxEnhanced = require('next-mdx-enhanced');
const withImages = require('next-images');
const withVideos = require('next-videos');
const childProcess = require('child_process');

const headingIds = require('remark-heading-id');
const slug = require('remark-slug');

const enhanceMdx = withMdxEnhanced({
  layoutPath: 'layouts',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [slug, headingIds],
  rehypePlugins: [],
});

const compose = (...fns) => (x) => fns.reduceRight((y, f) => f(y), x);

const basePath = process.env.BASE_PATH;

const config = {
  assetPrefix: basePath || '',
  publicRuntimeConfig: {
    basePath: basePath || '',
  },
  webpack5: false,

  webpack: (config, { isServer }) => {
    config.output.hashFunction = 'sha256';
    if (isServer) childProcess.execSync('yarn run generate-sitemap');
    return config;
  },
};

module.exports = compose(enhanceMdx, withImages, withVideos)(config);
