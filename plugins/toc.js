// eslint-disable-next-line @typescript-eslint/no-var-requires
const visit = require('unist-util-visit');

module.exports = () => (tree, file) => {
  console.log(file);

  const headings = [];

  visit(tree, 'heading', (node) => {
    console.log(node);
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

  console.log(tree);

  tree.children = [
    ...tree.children,
    {
      type: 'jsx',
      value: `<TOC headings={${JSON.stringify(headings)}} />`,
      position: null,
    },
    {
      type: 'jsx',
      value: `<TOC headings={${JSON.stringify(headings)}} />`,
      position: null,
    },
  ];

  console.log(headings);
  //console.log(tree);
};
