
const nextConfig = {
  reactStrictMode: true,
  basePath: '/docs',
}

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx'
})
 
module.exports = withNextra(nextConfig)
