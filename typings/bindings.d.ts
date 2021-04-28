declare module '*.mdx' {
  export const frontMatter: Array<{
    __resourcePath: string;
    title: string;
  }>;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

interface Window extends Window {
  docsearch: function;
}
