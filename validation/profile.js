const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if (!Validator.isLength(data.handle, {
        min: 2,
        max: 40
    })) {
        errors.handle = 'El nickname debe tener entre 2 y 4 caracteres';
    }
    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Se requiere el nickname';
    }
    if (Validator.isEmpty(data.status)) {
        errors.status = 'se requiere el campo status';
    }
    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'las habilidades son requeridas';
    }
    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = 'no es una URL válida';
        }
    }
    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'no es una URL válida';
        }
    }
    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'no es una URL válida';
        }
    }
    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'no es una URL válida';
        }
    }
    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = 'no es una URL válida';
        }
    }
    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'no es una URL válida';
            instagram
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};