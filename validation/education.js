const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    /*  if (Validator.isEmpty(data.name)) {
         errors.name = 'se requiere un nombre';
     }else if (!Validator.isLength(data.name, {
             min: 2,
             max: 30
         })) {
             errors.name = 'el nombre debe estar entre los 2 y los 30 caracteres';
     } */



    if (Validator.isEmpty(data.school)) {
        errors.school = 'se requiere el campo escuela';
    }
    if (Validator.isEmpty(data.degree)) {
        errors.degree = 'se requiere el campo grado';
    }
    if (Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'se requiere el campo de estudio';
    }
    if (Validator.isEmpty(data.from)) {
        errors.from = 'se requiere el campo desde';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};