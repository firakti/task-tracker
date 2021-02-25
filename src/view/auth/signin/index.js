import React from "react";
import AuthService from "services/auth";
import { useStateWithPush } from "utils/handler";
import AuthPresenter from "view/auth/presenter";
import SignInView from "view/auth/parts/signin"
import { Link, useHistory } from 'react-router-dom'
import Landing from "view/auth/parts/landing";

const SignIn = () => {
  const [state, pushState] = useStateWithPush({});
  const authService = new AuthService();
  return <div className="auth-page-container">
    <Landing></Landing>
    <div className="signin flex-column flex-align-center">
      <SignInView
        onSignIn={
          ({ email, password }) =>
            AuthPresenter.signIn(
              {email, password },
              authService,
              pushState,
              history,
            )
        }
        errors={state.errors}>
      </SignInView>

      <Link className="link-new-account" to='/signup' > create new account</Link>
    </div>
  </div>
}

export default SignIn;