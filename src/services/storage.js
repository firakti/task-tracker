import 'firebase/database'
import { useFirebaseApp, useUser } from "reactfire";

/* eslint-disable */

class FirebaseStorage {
    constructor() {
        this.firebase = useFirebaseApp();
        this.db = this.firebase.firestore();
        this.user = useUser();
    }
}

export default FirebaseStorage

/* eslint-enable */