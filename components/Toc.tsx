import { FunctionComponent, useEffect, useState, useRef } from 'react';
import Link from 'next/link';

import { heading } from '../util/generateToc';

import styles from './Toc.module.scss';

import throttle from 'lodash.throttle';

interface TocProps {
  headings: heading[];
}

interface locatedHeading extends heading {
  y: number;
  active?: boolean | null;
}

const Toc: FunctionComponent<TocProps> = ({ headings }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onScrollThrottled = useRef(
    throttle((locatedHeadings: locatedHeading[]) => {
      const y = window.scrollY;
      const foundIndex = locatedHeadings.findIndex(
        (heading) => heading.y < y + 1,
      );
      const active =
        foundIndex === -1 ? 0 : locatedHeadings.length - foundIndex - 1;
      setActiveIndex(active);
    }, 150),
  );

  useEffect(() => {
    const locatedHeadings = headings
      .slice()
      .reverse()
      .map((heading) => {
        const element = document.getElementById(heading.id);

        return {
          ...heading,
          y: element ? element.offsetTop : Infinity,
          active: false,
        };
      });

    const onScroll = (): void => {
      onScrollThrottled.current(locatedHeadings);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [headings]);

  return (
    <div className={styles.root}>
      <div className={styles.onThisPage}>On this page</div>
      {headings.map((heading, idx) => (
        <Link href={`#${heading.id}`} key={heading.id}>
          <div
            className={[
              styles.item,
              idx === activeIndex ? styles.active : '',
            ].join(' ')}
          >
            {heading.text}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Toc;
