import { FunctionComponent } from 'react';
import Avo from '../Avo';
import useAvoPath from '../util/useAvoPath';

const SignIn: FunctionComponent = () => {
  const path = useAvoPath();

  return (
    <div className="root">
      <a
        className="signUp"
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
      <a href="https://www.avo.app/login" className="signIn">
        Sign in
      </a>
      <style jsx>{`
        .root {
          font-size: 14px;
          font-weight: 500;
          display: flex;

          a {
            display: flex;
            align-items: center;
            text-decoration: none;
            padding: 4px 12px;
          }
        }

        .signUp {
          border-radius: 8px;
          background-color: #ff0eb4;
          color: white;
        }

        .signIn {
          color: #ff0eb4;
        }

        @media (min-width: 400px) {
          .root a {
            padding: 7px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default SignIn;
