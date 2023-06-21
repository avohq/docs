import React from 'react'
import Footer from '/components/Footer'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>Avo Docs</span>,
  project: {
    link: 'https://github.com/avohq/docs',
  },
  docsRepositoryBase: "https://github.com/avohq/docs/tree/main",
  footer: {
    text: <Footer />,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  }
}

export default config
