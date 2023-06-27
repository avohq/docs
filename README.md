<img align="right" src="https://github.com/avohq/docs/workflows/Lint%20and%20Typecheck/badge.svg">

<hr>

## Getting Started

Avo Docs runs on [Node.js](https://nodejs.org/) 16.8 or later. To get started developing clone the repository and run the following commands:

```bash
yarn # or "npm install"
yarn dev # or "npm run dev"
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Each page lives in a separate file in the `pages/` directory. Start editing and see the site update live in your browser. To add a new page, simply create a new .md or .mdx file inside the pages folder (or sub-folder depending on where in the navigation you want to have it).

> This project uses TypeScript, ESLint and Prettier. We recommend configuring your editor so that it automatically formats your files using our config and displays type and linting errors inline.

The Avo docs are built using Nextra and are deployed to Vercel. We recommend familiarizing yourself with the Next.js documentation before you get started developing.

- [Nextra](https://nextra.site/)
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Submitting pull requests

When you create a pull request it automatically gets linted, type checked and deployed to a Vercel preview URL. Before you submit a PR for review make sure your branch passes all checks and that the deployment looks good. You can do that by running `yarn lint && yarn spellcheck && yarn avo status`.

## Pages

Each page in the docs lives in a file in the `pages/` directory. This directory's folder structure dictates the application's routing. E.g. the file `pages/help/faq.mdx` will be accessible at [http://avo.app/docs/help/faq](http://avo.app/docs/help/faq) and it will be reflected in the navigation. To control the displaying and positioning in the navigation, edit the folders `_meta.json` file (see more in [the Nextra docs](https://nextra.site/docs/docs-theme/page-configuration))

### Body

The page's body is written in MDX, a markdown extension that allows you to embed React components.

### Links

To create links, simply use the standard markdown syntax. When linking to another docs page, you should skip the "/docs" part of the url. E.g. `[Link to FAQ](/help/faq)` will link to the FAQ page.

### Images

To add an image, add it to the `public/images` folder and then reference it using the standard markdown syntax. E.g. `![Alt text](/images/image.png)`. Just as with links, you should skip the "/docs" part of the url.

### Moving pages

Sometimes we like to put a page to a different place in the navigation hierarchy. You can do that by simply moving the file. As that changes the url, we need to make sure that old links end up in the new location by adding a re-direct to the next.config.js file.

## Linting

To manually typecheck and lint your code run the following command:

```
yarn lint # runs Next.js's linting
```

## Spelling

To catch spelling errors we rely on `mdspell` to set us straight. CI will use `yarn spellcheck` to check for any errors, as can any dev locally but sometimes `mdspell` will not recognize some of our fancy developer speak. This is where using `yarn fix-spelling` comes in handy to deal with those situations, handily creating ignores for us globally or on page level.

```
yarn run spellcheck     # Run spellcheck and gather errors
yarn run fix-spelling   # Run spellcheck and fix errors one by one
```
