import React, { FunctionComponent, ReactElement } from 'react';

import classNames from 'classnames';

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
      <div className={classNames(styles.stepHeader)}>
        <span className={styles.stepNumber}>{number}.</span> {title}
      </div>
      <div className={styles.stepContent}>{children}</div>
    </div>
  );
};

interface SmallStepsProps {
  children: ReactElement<StepProps> | ReactElement<StepProps>[];
  collapsible?: boolean | null;
}

const SmallSteps: FunctionComponent<SmallStepsProps> = ({ children }) => {
  return (
    <React.Fragment>
      {React.Children.map(children, (child, i) => {
        if (child == null) return null;
        return React.cloneElement<StepProps>(
          child as React.ReactElement<StepProps>,
          {
            number: i + 1,
          },
        );
      })}
    </React.Fragment>
  );
};

export default SmallSteps;
