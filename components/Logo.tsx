import { FunctionComponent } from 'react';

interface LogoProps {
  width?: number;
}

const Logo: FunctionComponent<LogoProps> = ({ width = 200 }) => <img src="/docs_logo.svg" width={width} />;

export default Logo;
