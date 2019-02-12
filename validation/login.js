const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    /*  if (Validator.isEmpty(data.name)) {
         errors.name = 'se requiere un nombre';
     }else if (!Validator.isLength(data.name, {
             min: 2,
             max: 30
         })) {
             errors.name = 'el nombre debe estar entre los 2 y los 30 caracteres';
     } */

    if (Validator.isEmpty(data.email)) {
        errors.email = 'se requiere un email';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email no es válido';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'se requiere contraseña';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};