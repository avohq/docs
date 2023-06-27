import { FunctionComponent } from 'react';
import styles from './SignIn.module.scss';
import Avo from '../Avo';
import useAvoPath from '../util/useAvoPath';

const SignIn: FunctionComponent = () => {
  const path = useAvoPath();

  return (
    <div className={styles.root}>
      <a
        className={styles.signUp}
        href="https://www.avo.app/onboarding"
        onClick={() =>
          Avo.signUpStarted({
            siteSection: Avo.SiteSection.HEADER,
            emailInput: undefined,
            path: path,
          })
        }
      >
        Sign up
      </a>
      <a href="https://www.avo.app/login" className={styles.signIn}>
        Sign in
      </a>
    </div>
  );
};

export default SignIn;
