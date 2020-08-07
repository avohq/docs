declare module '*.mdx' {
  export const frontMatter: Array<{
    __resourcePath: string;
    title: string;
  }>;
}

declare module '*.svg' {
  const content: any;
  export default content;
}
