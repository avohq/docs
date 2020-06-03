// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMdxEnhanced = require('next-mdx-enhanced');

const enhanceMdx = withMdxEnhanced({
  layoutPath: 'layouts',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [],
  rehypePlugins: [],
  extendFrontMatter: {
    // process: (mdxContent, frontMatter) => {},
    phase: 'prebuild|loader|both',
  },
});

const config = {};

module.exports = enhanceMdx(config);
