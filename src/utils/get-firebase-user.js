/**
 * async function to get firebase user if exist
 */
const getUser = (firebase) => {
    return new Promise(function (resolve, reject) {
        if (firebase.auth().currentUser) {
            resolve(firebase.auth().currentUser);
        }
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                resolve(user);
            } else {
                resolve(null);
            }
        });
        setTimeout(() => {
            reject(null);
        }, 3000)
    });
}

export default getUser