import React, { useCallback } from 'react';
import { FunctionComponent, useState, useRef } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';

import theme from 'prism-react-renderer/themes/nightOwl';
import styles from './MDComponents.module.scss';
import classNames from 'classnames';
import throttle from 'lodash.throttle';
import CodeHeader from '../components/CodeHeader';
import Avo from '../Avo';
import useAvoPath from '../util/useAvoPath';

export const P: FunctionComponent = (props) => (
  <p className={styles.p} {...props} />
);
export const H1: FunctionComponent = (props) => (
  <h1 className={styles.h1} {...props} />
);
export const H2: FunctionComponent = (props) => (
  <h2 className={styles.h2} {...props} />
);
export const H3: FunctionComponent = (props) => (
  <h3 className={styles.h3} {...props} />
);
export const H4: FunctionComponent = (props) => (
  <h4 className={styles.h4} {...props} />
);
export const H5: FunctionComponent = (props) => (
  <h5 className={styles.h5} {...props} />
);
export const H6: FunctionComponent = (props) => (
  <h6 className={styles.h6} {...props} />
);

// const ThematicBreak: FunctionComponent = props => { return <thematicBreak {...props} />; }
export const Blockquote: FunctionComponent = (props) => {
  return <blockquote className={styles.blockquote} {...props} />;
};
export const Ul: FunctionComponent = (props) => {
  return <ul className={styles.ul} {...props} />;
};
export const Ol: FunctionComponent = (props) => {
  return <ol className={styles.ol} {...props} />;
};
export const Li: FunctionComponent = (props) => {
  return <li className={styles.li} {...props} />;
};
export const Table: FunctionComponent = (props) => {
  return <table className={styles.table} {...props} />;
};
export const Thead: FunctionComponent = (props) => {
  return <thead className={styles.thead} {...props} />;
};
export const Tbody: FunctionComponent = (props) => {
  return <tbody className={styles.tbody} {...props} />;
};
export const Tr: FunctionComponent = (props) => {
  return <tr className={styles.tr} {...props} />;
};
export const Td: FunctionComponent = (props) => {
  return <td className={styles.td} {...props} />;
};
export const Th: FunctionComponent = (props) => {
  return <th className={styles.th} {...props} />;
};
export const Pre: FunctionComponent = (props) => {
  return <pre className={styles.pre} {...props} />;
};
export const Em: FunctionComponent = (props) => {
  return <em className={styles.em} {...props} />;
};
export const Strong: FunctionComponent = (props) => {
  return <strong className={styles.strong} {...props} />;
};
export const Del: FunctionComponent = (props) => {
  return <del className={styles.del} {...props} />;
};
export const InlineCode: FunctionComponent = (props) => {
  return <code className={styles.inlineCode} {...props} />;
};
export const Hr: FunctionComponent = (props) => {
  return <hr className={styles.hr} {...props} />;
};
export const A: FunctionComponent = (props) => {
  return <a className={styles.a} {...props} />;
};
export const Img: FunctionComponent = (props) => {
  return <img className={styles.img} {...props} />;
};

export const processLines = (lines: string[], isTerminal: boolean): string =>
  lines
    .slice(0, lines.length - 1)
    .map((line) => {
      if (isTerminal && line.startsWith('$ ')) {
        return line.substring(2);
      }
      return line;
    })
    .join('\n');

// Code highlighting
export const Code: FunctionComponent<{
  className?: string | null;
}> = ({ children, className }) => {
  if (className == null || !className.startsWith('language-')) {
    return <code className={className || undefined}>{children}</code>;
  }
  const [shadowOpacity, setShadowOpacity] = useState(0);
  const avoPath = useAvoPath();

  const scrollContainer = useRef<HTMLDivElement>(null);
  const onScrollThrottled = useRef(
    throttle(() => {
      if (!scrollContainer.current) return;
      const progress =
        scrollContainer.current.scrollLeft > 20
          ? 1
          : scrollContainer.current.scrollLeft / 20;
      setShadowOpacity(progress);
    }, 150),
  );

  const language = className.replace(/language-/, '');
  const isTerminal = language === 'sh' || language === 'bash';

  const rawCode = children as string;
  const lines = rawCode.split('\n');
  const code = processLines(lines, isTerminal);

  const onCopy = useCallback(() => {
    const inputLines = lines
      .flatMap((line) => (line.startsWith('$ ') ? [line.substr(2)] : []))
      .join('\n');

    navigator.clipboard.writeText(isTerminal ? inputLines : rawCode);
    Avo.contentCopied({
      path: avoPath,
      content: isTerminal ? inputLines : rawCode,
    });
  }, [rawCode]);

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={code}
      language={language as Language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        const lineNumbers = isTerminal
          ? lines.map((line) => (line.startsWith('$ ') ? '$' : ''))
          : lines.map((_, i) => i + 1);

        return (
          <div className={styles.highlightWrapper}>
            <CodeHeader language={language} onCopy={onCopy} />
            <pre
              className={classNames(className, styles.highlight)}
              style={{ ...style }}
            >
              <div
                className={styles.highlightLineNumbers}
                style={{
                  boxShadow: `5px 0 10px -5px rgba(0, 0, 0, ${shadowOpacity})`,
                }}
              >
                {tokens.map((line, i) => (
                  <div
                    key={i}
                    {...getLineProps({ line, key: i })}
                    className={styles.codeLine}
                  >
                    <div className={styles.codeLineNumber}>
                      {lineNumbers[i]}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className={styles.highlightCode}
                onScroll={onScrollThrottled.current}
                ref={scrollContainer}
              >
                {tokens.map((line, i) => (
                  <div
                    key={i}
                    {...getLineProps({ line, key: i })}
                    className={styles.codeLine}
                    style={{
                      opacity:
                        isTerminal && !lines[i].startsWith('$ ') ? 0.8 : 1,
                    }}
                  >
                    <div className={styles.codeLineContent}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </pre>
          </div>
        );
      }}
    </Highlight>
  );
};

const MDComponents = {
  // Paragraph
  p: P,

  // Headings
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,

  // Lists
  ul: Ul,
  ol: Ol,
  li: Li,

  // Tables
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  td: Td,
  th: Th,

  // Code
  pre: Pre,
  code: Code,
  inlineCode: InlineCode,

  // Font styles
  em: Em,
  strong: Strong,
  del: Del,

  // Other
  blockquote: Blockquote,
  hr: Hr,
  a: A,
  img: Img,
};

export default MDComponents;
