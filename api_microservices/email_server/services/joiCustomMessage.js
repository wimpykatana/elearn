const message = (errors) => {
    const err = errors[0];

    if(err.type === 'string.min') {
        return `${err.context.key} minimal ${err.context.limit} karakter`
    }

    if(err.type === 'string.max') {
        return `${err.context.key} maksimal ${err.context.limit} karakter`
    }

    if(err.type === 'any.required') {
        return `${err.context.key} tidak boleh kosong`;
    }

    return `${err.context.key} tidak valid`;
}

exports.message = message;