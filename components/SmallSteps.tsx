import React, { FunctionComponent, ReactElement, useState } from 'react';

import classNames from 'classnames';

import styles from './SmallSteps.module.scss';

interface StepProps {
  number: number;
  title: string;
  collapsible: boolean;
}

export const Step: FunctionComponent<StepProps> = ({
  children,
  number,
  title,
  collapsible,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className={styles.step}>
      <div className={classNames(styles.stepHeader, !open && styles.collapsed)}>
        <span className={styles.stepNumber}>{number}.</span> {title}
        {collapsible && (
          <span className={styles.collapse} onClick={() => setOpen(!open)}>
            x
          </span>
        )}
      </div>
      {open && <div className={styles.stepContent}>{children}</div>}
    </div>
  );
};

interface SmallStepsProps {
  children: ReactElement<StepProps> | ReactElement<StepProps>[];
  collapsible?: boolean | null;
}

const SmallSteps: FunctionComponent<SmallStepsProps> = ({
  children,
  collapsible = false,
}) => {
  return (
    <React.Fragment>
      {React.Children.map(children, (child, i) => {
        if (child == null) return null;
        return React.cloneElement<StepProps>(child, {
          number: i + 1,
          collapsible,
        });
      })}
    </React.Fragment>
  );
};

export default SmallSteps;
