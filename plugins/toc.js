/* eslint-disable @typescript-eslint/no-var-requires */
var unified = require('unified');
var markdown = require('remark-parse');
const visit = require('unist-util-visit');

const toc = (tree) => {
  const headings = [];

  visit(tree, 'heading', (node) => {
    headings.push({
      depth: node.depth,
      text: node.children
        .reduce((prev, cur) => {
          if (cur.type !== 'text') return prev;
          return prev + cur.value.trim() + ' ';
        }, '')
        .trim(),
    });
  });

  return headings;
};

function toToc() {
  this.Compiler = compiler;

  function compiler(tree) {
    return toc(tree);
  }
}

const process = (md) => {
  const file = unified()
    .use(markdown, { commonmark: true })
    .use(toToc)
    .processSync(md);

  return file.result;
};

module.exports = process;
