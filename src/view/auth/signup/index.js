import React from "react";
import AuthService from "services/auth";
import { useStateWithPush } from "utils/handler";
import AuthPresenter from "../presenter";
import SignUpView from "./../parts/signup"
import "../style.scss"

const SignUp = () => {
    const [state, pushState] = useStateWithPush({});
    const authService = new AuthService();

    return (
        <div className="auth-page-container">
            <SignUpView
                onSignUp={
                    ({ email, password, passwordAgain }) =>
                        AuthPresenter.signUp(
                            { email, password, passwordAgain },
                            authService,
                            pushState,
                        )
                }
                errors={state.errors}>
            </SignUpView>
        </div>)
}

export default SignUp;