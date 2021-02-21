import { useFirebaseApp } from "reactfire";

/* eslint-disable */
class AuthService {
    constructor() {
        this.firebase = useFirebaseApp();
    }
    async signIn(email, password) {
        let ok = true;
        let errors = undefined;
        const response = await this.firebase.auth().signInWithEmailAndPassword(email, password).catch(e => { ok = false; errors = e });
        //console.log(response);
        return { ok, response, errors };
    }
    async signOut() {
        let ok = true;
        let errors = undefined;
        const response = await this.firebase.auth().signOut().catch(e => { ok = false; errors = e });
        //console.log(response);
        return { ok, response, errors };
    }
    async signUp(email, password, passwordAgain) {
        let ok = true;
        let errors = undefined;
        console.log("signUp");
        if (password !== passwordAgain) {
            console.log("Passwords are not matched");
            return { ok: false, errors: ["Passwords are not matched"] };
        }

        const response = await this.firebase.auth().createUserWithEmailAndPassword(email, password).catch(e => { ok = false; errors = e });
        console.log(response);
        return { ok, response, errors };
    }
    async deleteAccount() {

    }
}

export default AuthService
/* eslint-enable */