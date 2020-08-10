import { FunctionComponent } from 'react';

import { library, IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faJs,
  faJava,
  faSwift,
  faPhp,
  faPython,
} from '@fortawesome/free-brands-svg-icons';
import {
  faHome,
  faAward,
  faHeartbeat,
  faLifeRing,
  faRocket,
  faChevronLeft,
  faToolbox,
  faCode,
  faTerminal,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';
import { faRuby, faCSharp, faTypescript, faKotlin, faC } from './customIcons';

library.add(
  faHome,
  faToolbox,
  faAward,
  faHeartbeat,
  faLifeRing,
  faRocket,
  faChevronLeft,
  faCode,
  faJs,
  faJava,
  faSwift,
  faPhp,
  faPython,
  faTerminal,
  faRuby,
  faCSharp,
  faTypescript,
  faKotlin,
  faC,
  faSearch,
);

interface IconProps {
  name: string;
  pack?: IconPrefix;
  relativeSize?: FontAwesomeIconProps['size'];
  fontSize?: number;
  color?: string;
}

const Icon: FunctionComponent<IconProps> = ({
  name,
  relativeSize,
  color,
  fontSize,
  pack,
}) => {
  const iconPack = pack || 'fas';
  const icon = [iconPack, name as IconName];

  return (
    <FontAwesomeIcon
      icon={icon as IconProp}
      size={relativeSize || '1x'}
      fontSize={fontSize}
      color={color || 'black'}
    />
  );
};

export default Icon;
