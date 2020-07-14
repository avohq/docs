import { FunctionComponent, useState, useCallback, useEffect } from 'react';
import styles from './FeedbackButtons.module.scss';
import classNames from 'classnames';

import Avo, { Feedback, FeedbackValueType } from '../Avo';
import useAvoPath from '../util/useAvoPath';

const FeedbackButtons: FunctionComponent = () => {
  const [optionChosen, setOptionChosen] = useState<FeedbackValueType | null>(
    null,
  );

  const path = useAvoPath();

  useEffect(() => {
    setOptionChosen(null);
  }, [path]);

  const onClick = useCallback(
    (feedback: FeedbackValueType) => {
      if (optionChosen) return;

      Avo.feedbackGiven({
        path,
        feedback,
      });
      setOptionChosen(feedback);
    },
    [optionChosen],
  );

  return (
    <div className={styles.root}>
      <div
        className={classNames(styles.button, {
          [styles.disabled]: optionChosen !== null,
          [styles.chosen]: optionChosen === Feedback.HELPFUL,
        })}
        onClick={() => onClick(Feedback.HELPFUL)}
      >
        <img width={20} src={require('../images/svg/thumbsup.svg')} />
      </div>
      <div
        className={classNames(styles.button, {
          [styles.disabled]: optionChosen !== null,
          [styles.chosen]: optionChosen === Feedback.NOT_HELPFUL,
        })}
        onClick={() => onClick(Feedback.NOT_HELPFUL)}
      >
        <img width={20} src={require('../images/svg/thumbsdown.svg')} />
      </div>
    </div>
  );
};

export default FeedbackButtons;
