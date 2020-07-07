import { FunctionComponent } from 'react';
import styles from './SignIn.module.scss';

const SignIn: FunctionComponent = () => {
  return (
    <div className={styles.root}>
      <a href="/onboarding">
        <div className={styles.signUp}>Sign up</div>
      </a>
      <a href="/onboarding">
        <div className={styles.signIn}>Sign in</div>
      </a>
    </div>
  );
};

export default SignIn;
