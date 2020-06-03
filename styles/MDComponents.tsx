import { FunctionComponent } from 'react';

const H1: FunctionComponent = (props) => (
  <h1 style={{ color: 'tomato' }} {...props} />
);

const MDComponents = {
  h1: H1,
};

export default MDComponents;
