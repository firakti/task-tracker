// TODO implement this
/**
 * fluent validation
 */
import validatorjs from 'validator';

const validationFunctions = {
    "notEmpty": (value) => {
        return Boolean(value);
    },
    "maxLength": (value, { length }) => {
        return validatorjs.isLength(value, { max: length });
    },
    "empty": (value) => {
        return !Boolean(value);
    },
    "oneOf": (value, { options }) => {
        return options.includes(value);
    },
    "bool": (value) => {
        return typeof value === "boolean";
    },
    "numeric": (value) => {
        return validatorjs.isNumeric(value);
    },
    "email": (value) => {
        return validatorjs.isEmail(value);
    },
    "dateString": (value) => {
        return true;
        // return validatorjs.isDate(value);
    },
}
const validationMessages = {
    "notEmpty": (value) => {
        return "can't be empty";
    },
}

class BuilderBase {
    constructor(ruleContext) {
        this._ruleContext = ruleContext ?? {}
    }

    pushToContext(key, args, message) {
        this._ruleContext[key] = { args, key, message }
    }
    or() {
        return this.pushToContext("or", null, null);
    }
    _isRuleValid(value, rule) {
        return validationFunctions[rule.key](value, rule.args);
    }
    validate(value) {
        let isValid = true;
        const errors = [];

        for (const key in this._ruleContext) {
            const rule = this._ruleContext[key];
            if (rule.key === "or") {
                isValid = true;
                if (isValid) {
                    return { isValid, errors }
                }
                else {
                    isValid = true;
                    continue;
                }
            }
            const isRuleValid = this._isRuleValid(value, rule);
            isValid = isValid && isRuleValid;
            if (!isRuleValid) {
                const message =
                    rule.message?.format(...key.args) ??
                    validationMessages[key]?.() ??
                    `${key}`;

                errors.push(message);
            }
        }

        return { isValid, errors };
    }
}

class ValidationBuilder extends BuilderBase {
    notEmpty(message) {
        return this.pushToContext("notEmpty", null, message);
    }
    maxLength(length, message) {
        return this.pushToContext("maxLength", { length }, message);
    }
    empty(message) {
        return this.pushToContext("empty", null, message);
    }
    oneOf(options, message) {
        return this.pushToContext("oneOf", { options }, message);
    }
    numeric(message) {
        return this.pushToContext("numeric", null, message);
    }
    email(message) {
        return this.pushToContext("email", null, message);
    }
    bool(message) {
        return this.pushToContext("bool", null, message);
    }
    dateString(message) {
        return this.pushToContext("dateString", null, message);
    }

    pushToContext(key, args, message) {
        super.pushToContext(key, args, message)
        return this
    }
}


// function validator(validationFunctionsExtension, validationMessageExtension)
function validator() {
    return new ValidationBuilder()
}
function validateSchema(schema, input) {
    let isValid = true;
    const errors = {};
    for (const key in schema) {
        const rule = schema[key];
        const value = input[key];
        const { isValid: isPropValid, errors: propErrors } = rule.validate(value);

        isValid = isValid && isPropValid;
        if (propErrors) {
            errors[key] = propErrors;
        }
    }
    return [isValid, errors];
}

export { validationFunctions, validationMessages, validateSchema }
export default validator