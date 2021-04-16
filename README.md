<img src="images/docs_logo.svg">
<img align="right" src="https://github.com/avohq/docs/workflows/Lint%20and%20Typecheck/badge.svg">

<hr>

## Getting Started

To get started developing clone the repository and run the following commands:

```bash
yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Each page lives in a separate file in the `pages/` directory. Start editing and see the site update live in your browser.

> This project uses TypeScript, ESLint and Prettier. We recommend configuring your editor so that it automatically formats your files using our config and displays type and linting errors inline.

The Avo docs are built using Next.js and are deployed to Vercel. We recommend familiarizing yourself with the Next.js documentation before you get started developing.

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Submitting pull requests

When you create a pull request it automatically gets linted, type checked and deployed to a Vercel preview URL. Before you submit a PR for review make sure your branch passes all checks and that the deployment looks good.

## Pages

Each page in the docs lives in a file in the `pages/` directory. This directory's folder structure dictates the application's routing. E.g. the file `pages/help/faq.mdx` will be accessible at [http://avo.app/docs/help/faq](http://avo.app/docs/help/faq).

### Frontmatter

The page's contents are preceded by YAML frontmatter. Here's an example from the getting started page:

```yaml
---
layout: 'guide'
title: 'Getting started'
---

```

The layout and title properties are required. Layout specifies which layout the page should use and should match the filename of a `.tsx` file in the `layouts/` directory. The title is displayed at the top of each page. Different layouts can support different frontmatter properties, so it can be helpful to take a look at the layout's source to see what's available.

### Body

The page's body is written in MDX, a markdown extension that allows you to embed React components. In most cases the only JSX you'll be embedding is `<Link />` components. We support [GitHub flavored markdown](https://guides.github.com/features/mastering-markdown/) with a few extensions. When creating a new page we recommend looking at existing ones to get an idea of how we format our docs.

> **Take note:**
>
> The highest level heading we use in our pages is `##`. This is to maintain proper hierarchy as the page title is rendered as an `<h1 />` element.

## Linting

To manually typecheck and lint your code run the following command:

```
yarn run lint       # Run ESLint and TSC
yarn run lint-mdx   # Run MDXLint
```

### MDXLint

To catch common errors and enforce consistency we've created an MDX linter. Under the hood it uses Remark and Remark MDX to parse your markdown. This is the same library that Next.js uses under the hood.

Each rule is a function with the following signature:

```typescript
export type RuleFunction = (
  node: Node,
  metadata: {
    filePath: string;
  },
) => MDXError[];
```

Where `node` is the root node of the parsed abstract syntax tree. The function should then run some checks on the tree, and return a list of `MDXError` objects. The rule is then registered in `util/mdxLint/index.ts`.

Take a look at some of the rules in the `util/mdxLint/rules/` directory for inspiration.

## Search

We're using Algolia's free DocSearch. To update our scraping config send a pull request changing [avo.json](https://github.com/algolia/docsearch-configs/blob/master/configs/avo.json) in the DocSearch config repo. The documentation search index is updated every 24 hours.
