const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//cargar validacion
const validateRegisterInputs = require('../../validation/register');
const validateLoginInputs = require('../../validation/login');



// load user model
const User = require('../../models/User')

// @route GET api/users/test
// @desc test users route
// @acceso publico
router.get('/test', (req, res) =>
    res.json({
        msg: 'Users works'
    })
)

// @route GET api/users/register
// @desc registrar  usuario
// @acceso publico
router.post('/register', (req, res) => {
    const {
        errors,
        isValid
    } = validateRegisterInputs(req.body);

    //CHEQUEO DE VALIDACION
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            errors.email = 'el email ya existe';
            return res.status(400).json({
                email: 'este email ya existe'
            })
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', // Size
                r: 'pg', // rate
                d: 'mm' // default
            })
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                });
            });
        }
    });
});

// @route GET api/users/login
//@desc Login User / returning  jwtToken
//@acceso publico
router.post('/login', (req, res) => {
    const {
        errors,
        isValid
    } = validateLoginInputs(req.body);

    //CHEQUEO DE VALIDACION
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //encuentra al usuario por email
    User.findOne({
            email
        })
        .then(user => {
            //chequeamos el user
            if (!user) {
                errors.email = 'Usuario no encontrado';
                return res.status(404).json(errors);
            }
            //check  password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //usuario encontrado
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        } //creando la "carga" jwt
                        jwt.sign(payload,
                            keys.secretOrKey, {
                                expiresIn: 14400
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            });
                    } else {
                        errors.password = 'Password incorrecto';
                        return res.status(400).json(errors);
                    }
                });
        });
});

// @route GET api/users/current
// @desc retorna usuario actual
// @acceso privado
router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        }
        //req.user
    );
});




module.exports = router;