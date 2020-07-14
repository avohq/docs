/* eslint-disable @typescript-eslint/no-var-requires */
import { NextApiRequest, NextApiResponse } from 'next';
import Puppeteer from 'puppeteer';
import marked from 'marked';

const generateHtml = (title: string): string => `
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

    body,
    html {
      margin: 0;
      padding: 0;
      text-align: center;
      align-items: center;
      justify-content: center;
      font-family: 'Inter', sans-serif;
      background-size: 100px 100px;
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      height: 100vh;
      width: 100vw;
    }

    .title {
      font-family: 'Inter', sans-serif;
      font-size: 100px;
      font-style: normal;
      line-height: 1.8;
      max-width: 75vw;
      
    }
  </style>
</head>
<body>
  <div class="content">
    <img width=300 src="${require('../../../images/logo.svg')}" />
    <div class="title">${marked(title)}</div>
  </div>
</body>
</html>
`;

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const title = req.query.title as string;
  if (req.query.title == null || title === undefined) {
    res.status(400).end();
    return;
  }

  const browser = await Puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(generateHtml(title));
  await page.setViewport({ width: 2048, height: 1170 });
  const file = await page.screenshot({ type: 'png' });

  await browser.close();

  res.setHeader('Content-Type', 'image/png');
  res.status(200).end(file);
};
