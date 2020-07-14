import { FunctionComponent } from 'react';
import Link from 'next/link';

interface LogoProps {
  width?: number;
}

const Logo: FunctionComponent<LogoProps> = ({ width = 200 }) => (
  <Link href="/">
    <img
      src={require('../images/docs_logo.svg')}
      width={width}
      style={{ cursor: 'pointer' }}
    />
  </Link>
);

export default Logo;
