import { FunctionComponent } from 'react';
import styles from './SignIn.module.scss';
import Avo from '../Avo';
import useAvoPath from '../util/useAvoPath';

const SignIn: FunctionComponent = () => {
  const path = useAvoPath();

  return (
    <div className={styles.root}>
      <a
        href="https://avo.app/onboarding"
        onClick={() =>
          Avo.signUpStarted({
            siteSection: Avo.SiteSection.FOOTER,
            emailInput: undefined,
            path: path,
          })
        }
      >
        <div className={styles.signUp}>Sign up</div>
      </a>
      <a href="https://avo.app/login">
        <div className={styles.signIn}>Sign in</div>
      </a>
    </div>
  );
};

export default SignIn;
