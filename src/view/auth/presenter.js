const authPresenter = {

    async signOut(authService, pushState) {
        const result = await authService.signOut();
        if (!result.ok) {
            pushState({ errors: [result.errors] });
        }
    },
    async signIn({ email, password }, authService, pushState) {
        const result = await authService.signIn(email, password);
        if (!result.ok) {
            pushState({ errors: [result.errors] });
        }
    },
    async signUp({ email, password, passwordAgain }, authService, pushState) {
        const result = await authService.signUp(email, password, passwordAgain);
        if (!result.ok) {
            pushState({ errors: [result.errors] });
        }
    },
};

export default authPresenter;
