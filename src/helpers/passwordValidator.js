import validator from 'password-validator'


export const passwordValidator = (password) => {
    const schema = new validator();
    schema
        .is().min(8)                                    // Minimum length 8
        .is().max(64)                                  // Maximum length 64
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits()
        .has().symbols()
    return schema.validate(password)
}

export const validateMinimum = (password) => {
    const schema = new validator();
    return schema.is().min(8).validate(password)
}

export const validateUpperCase = (password) => {
    const schema = new validator();
    return schema.has().uppercase().validate(password)
}

export const validateLowerCase = (password) => {
    const schema = new validator();
    return schema.has().lowercase().validate(password)
}


export const validateNumber = (password) => {
    const schema = new validator();
    return schema.has().digits().validate(password)
}

export const validateSpecialCharacter = (password) => {
    const schema = new validator();
    return schema.has().symbols().validate(password)

}