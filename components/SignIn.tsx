import { FunctionComponent } from 'react';
import styles from './SignIn.module.scss';

const SignIn: FunctionComponent = () => {
  return (
    <div className={styles.root}>
      <a href="https://avo.app/onboarding">
        <div className={styles.signUp}>Sign up</div>
      </a>
      <a href="https://avo.app/login">
        <div className={styles.signIn}>Sign in</div>
      </a>
    </div>
  );
};

export default SignIn;
