const message = (errors) => {
    const err = errors[0];
    
    if(err.type === 'string.min') {
        return `${err.context.key} Minimum Length ${err.context.limit}`
    }

    if(err.type === 'string.max') {
        return `${err.context.key} Maximum Length ${err.context.limit}`
    }

    if(err.type === 'any.required') {
        return `${err.context.key} cannot be empty`;
    }

    if(err.type === 'any.allowOnly' &&  err.context.key === 'password_confirmation') {
        return "Password Confirmation don't match";
    }

    return `Please insert your valid ${err.context.key}`;
}

exports.message = message;