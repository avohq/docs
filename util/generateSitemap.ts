import fs from 'fs';
import { globby } from 'globby';

import XMLBuilder from 'xmlbuilder';
import pager from './pager';

const getRoutes = async (): Promise<string[]> => {
  const files = await globby([
    './pages/**/*{.ts,.mdx,.tsx}',
    '!./pages/api',
    '!./pages/_*{.ts,.js,.tsx}',
  ]);
  const routes = files.map((file) => {
    const withoutExtension = file.replace(/(\.tsx|\.ts|\.mdx|\.js|\.md)$/, '');
    const path = withoutExtension.replace(/\/index$/, '');
    const route = path.replace(/^\.\/pages/, 'https://avo.app/docs');
    return route;
  });
  return routes;
};

const generateSitemap = (routes: string[]) => {
  const root = XMLBuilder.create('urlset');
  root.attribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

  routes.forEach((route) => {
    const element = root.ele('url');
    const loc = element.ele('loc');
    loc.text(route);
  });

  return root.end({ pretty: true });
};

(async () => {
  const dryRun = process.argv.includes('--dry-run');

  const routes = await getRoutes();
  const sitemap = generateSitemap(routes);

  if (dryRun) {
    pager(sitemap, 'xml');
    return;
  }

  fs.writeFileSync('./public/sitemap.xml', sitemap);
})();
