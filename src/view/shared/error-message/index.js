import React from "react";
import "./style.scss"

const InputError = ({ errors, messageFormatter }) => {
    messageFormatter = messageFormatter ?? (e => e);
    console.log(errors)
    return <>
        {
            errors ? errors.map(e => <small className="text-error">{messageFormatter(e)}</small>) : null
        }
    </>
}
export default InputError