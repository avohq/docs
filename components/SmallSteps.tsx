import React, { FunctionComponent, ReactElement } from 'react';

import styles from './SmallSteps.module.scss';

interface StepProps {
  number: number;
  title: string;
}

export const Step: FunctionComponent<StepProps> = ({
  children,
  number,
  title,
}) => {
  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <span className={styles.stepNumber}>{number}.</span> {title}
      </div>
      <div className={styles.stepContent}>{children}</div>
    </div>
  );
};

interface SmallStepsProps {
  children: ReactElement<StepProps> | ReactElement<StepProps>[];
}

const SmallSteps: FunctionComponent<SmallStepsProps> = ({ children }) => {
  return React.Children.map(children, (child, i) => {
    if (child == null) return null;
    if (typeof child !== 'object') return child;

    return React.cloneElement(child, { number: i + 1 });
  });
};

export default SmallSteps;
