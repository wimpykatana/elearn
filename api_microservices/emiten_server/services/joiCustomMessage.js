const message = (errors) => {
    const err = errors[0];

    if(err.type === 'string.min') {
        return `${err.context.key} minimum length ${err.context.limit}`
    }

    if(err.type === 'string.max') {
        return `${err.context.key} maximum length ${err.context.limit}`
    }

    if(err.type === 'any.required') {
        return `${err.context.key} can't be blank`;
    }

    return `${err.context.key} not valid`;
}

exports.message = message;