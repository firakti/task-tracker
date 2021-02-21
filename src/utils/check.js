//TODO implement
const check = {
    notNull(item) {

    },
    isNull(item) {

    },
    notBigger(small, big) {

    },
    isNullOrEmpty(obj) {
        if (obj == null || obj === undefined) {
            return true;
        }
        return Object.keys(obj).length === 0
    }
}


export default check;