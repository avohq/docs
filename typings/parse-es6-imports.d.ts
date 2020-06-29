declare module 'parse-es6-imports' {
  export interface ImportStatement {
    defaultImport?: string | null;
    namedImports: { name: string; value: string }[];
    starImports: string | null;
    fromModule: string;
  }

  export default function (file: string): ImportStatement[];
}
