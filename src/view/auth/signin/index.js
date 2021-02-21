import React from "react";
import AuthService from "services/auth";
import { useStateWithPush } from "utils/handler";
import AuthPresenter from "../presenter";
import SignInView from "./../parts/signin"
import { Link } from 'react-router-dom'
import Landing from "../../landing";

const SignIn = () => {
  const [state, pushState] = useStateWithPush({});
  const authService = new AuthService();

  return <div className="auth-page-container">
    <Landing></Landing>
    <SignInView
      onSignIn={
        ({ email, password }) =>
          AuthPresenter.signIn(
            { authService, email, password },
            pushState,
          )
      }
      errors={state.errors}>
    </SignInView>
    <div className="flex-column">
      {/* <Link to='/passwordrecovery' > forgot password</Link> */}
      <Link to='/signup' > create new account</Link>
    </div>
  </div>
}

export default SignIn;