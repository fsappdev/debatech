const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    /*  if (Validator.isEmpty(data.name)) {
         errors.name = 'se requiere un nombre';
     }else if (!Validator.isLength(data.name, {
             min: 2,
             max: 30
         })) {
             errors.name = 'el nombre debe estar entre los 2 y los 30 caracteres';
     } */



    if (Validator.isEmpty(data.title)) {
        errors.title = 'se requiere el campo titulo de su trabajo';
    }
    if (Validator.isEmpty(data.company)) {
        errors.company = 'se requiere el campo compañia';
    }
    if (Validator.isEmpty(data.from)) {
        errors.from = 'se requiere el campo desde';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};