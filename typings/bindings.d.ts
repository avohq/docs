declare module '*.mdx' {
  export const frontMatter: Array<{
    __resourcePath: string;
    title: string;
  }>;
}

interface Window extends Window {
  docsearch: function;
}
