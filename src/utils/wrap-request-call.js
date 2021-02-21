class StoreResponse {
    constructor({ ok, data, errors, response }) {
        this.ok = ok;
        this.data = data;
        this.errors = errors;
        this.response = response;
    }

    static success({ data, response }) {
        return new StoreResponse({ data, response, ok: true })
    }

    static error({ errors, response }) {
        return new StoreResponse({ errors, response, ok: false })
    }
}
const wrapCall = async (requestInvoke) => {

    let response;
    let data;
    try {
        response = await requestInvoke;
        // for set and add request firestore return undefined response
        if (response)
            data = response.docs.map(d => ({ id: d.id, ...d.data() }));
        return StoreResponse.success({ data, response })
    }
    catch (errors) {
        return StoreResponse.error({ errors, response })
    }
}

export { StoreResponse }
export default wrapCall;