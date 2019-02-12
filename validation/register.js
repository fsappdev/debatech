const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    

    if (Validator.isEmpty(data.name)) {
        errors.name = 'se requiere un nombre';
    }else if (!Validator.isLength(data.name, {
            min: 2,
            max: 30
        })) {
            errors.name = 'el nombre debe estar entre los 2 y los 30 caracteres';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'se requiere un email';
    }else  if (!Validator.isEmail(data.email)) {
        errors.email = 'Email no es válido';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'se requiere contraseña';
    }else  if (!Validator.isLength(data.password, {
            min: 6,
            max: 30
        })) {
             errors.password = 'la contraseña debe tener al menos 6 caracteres';
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'se require un password de confirmacion';
    }else  if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'las contraseñas no coinciden';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};