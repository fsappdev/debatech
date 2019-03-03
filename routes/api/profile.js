const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
//cargar la validacion
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

//cargar el modelo de perfil
const Profile = require('../../models/Profile');
//cargar el modelo de user
const User = require('../../models/User');
//request
const request = require('request');


//@route GET api/profile/test
//@desc test profile route
//@acceso publico
router.get('/test', (req, res) => res.json({
    msg: 'Profile works'
}));
//////////////////////////
//@route GET api/profile/
//@desc GET  current user profile 
//@acceso privado
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const errors = {};

    Profile.findOne({
        user: req.user.id
    })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'NO Existe un perfil para ese usuario';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route       GET api/profile/github/:username/:count/:sort
// @desc        Get github data from github api
// @access      Public
router.get("/github/:username/:count/:sort", (req, res) => {
    username = req.params.username;
    clientId = "4431a4ae1cc62c61a76d";
    clientSecret = "8b18c8a8f80ce07a8856a90c8d22989fa84ceb83";
    count = req.params.count;
    sort = req.params.sort;
    const options = {
        url: `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`,
        headers: {
            "User-Agent": "request"
        }
    };
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            res.json(info);
        }
    }
    request(options, callback);

});


//@route api/profile/all
//@desc get all the profiles
//@access public
router.get('/all', (req, res) => {
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = 'aun no existen perfiles';
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err => res.status(404).json({
            profile: 'no existe perfil para este user'
        }));
});


////////////////////////////////////////////

//@route GET api/profile/handle/:handle
//@desc get profile by handle
//@access Public
router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({
        handle: req.params.handle
    })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'no existe un perfil para este user';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});
///////////////////////////////////////////
//@route GET api/profile/user/:user_id
//@desc ger profile by user ID
//@access Public
router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({
        user: req.params.user_id
    })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'no existe un perfil para este user';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json({
            profile: 'no existe un perfil para este usuario'
        }));
});
/////////////////////////////////////
//@route POST api/profile/
//@desc create  or edituser profile 
//@acceso private

router.post('/', passport.authenticate('jwt', {
    session: false
}),
    (req, res) => {
        const {
            errors,
            isValid
        } = validateProfileInput(req.body);
        //check validacion
        if (!isValid) {
            //retorna cualquier error con el status 400
            return res.status(400).json(errors);
        }

        //traer los campos}
        const profileFields = {};
        profileFields.user = req.user.id;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.company) profileFields.company = req.body.company;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.status) profileFields.status = req.body.status;
        if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
        //ahora dividimos, separamos en un array
        if (typeof req.body.skills !== 'undefined') {
            profileFields.skills = req.body.skills.split(',');
        }

        //social
        profileFields.social = {};
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

        Profile.findOne({
            user: req.user.id
        })
            .then(profile => {
                if (profile) {
                    //actualizar
                    Profile.findOneAndUpdate({
                        user: req.user.id
                    }, {
                            $set: profileFields
                        }, {
                            new: true
                        })
                        .then(profile => res.json(profile));
                } else {
                    //crear

                    //chequear si handle existe
                    Profile.findOne({
                        handle: profileFields.handle
                    }).then(profile => {
                        if (profile) {
                            errors.handle = 'that handle already exists';
                            res.status(400).json(errors);
                        }
                        //guardar perfil
                        new Profile(profileFields).save().then(profile => res.json(profile));
                    });
                }
            });
    });
////////////////////////////////////////////
//@route POST api/profile/experience
//@desc add experience to profile 
//@acceso private
router.post('/experience', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        errors,
        isValid
    } = validateExperienceInput(req.body);
    //check validacion
    if (!isValid) {
        //retorna cualquier error con el status 400
        return res.status(400).json(errors);
    }
    Profile.findOne({
        user: req.user.id
    })
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }
            //agragar al array de experiencia
            profile.experience.unshift(newExp);

            profile.save().then(profile => res.json(profile));
        })
});

/////////////////////////////////////////////////////////////
//@route POST api/profile/education
//@desc add education to profile 
//@acceso private
router.post('/education', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        errors,
        isValid
    } = validateEducationInput(req.body);
    //check validacion
    if (!isValid) {
        //retorna cualquier error con el status 400
        return res.status(400).json(errors);
    }
    Profile.findOne({
        user: req.user.id
    })
        .then(profile => {
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }
            //agragar al array de experiencia
            profile.education.unshift(newEdu);

            profile.save().then(profile => res.json(profile));
        })
});

/////////////////////////////////////////////////////////////
//@route DELETE api/profile/experience/:exp_id
//@desc DELETE experience from profile 
//@acceso private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Profile.findOne({
        user: req.user.id
    })
        .then(profile => {
            //ge remove index
            const removeIndex = profile.experience
                .map(item => item.id)
                .indexOf(req.params.exp_id);
            //splice out of array
            profile.experience.splice(removeIndex, 1);
            //save
            profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json(err));
});

/////////////////////////////////////////////////////////////
//@route DELETE api/profile/education/:edu_id
//@desc DELETE education from profile 
//@acceso private
router.delete('/education/:edu_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Profile.findOne({
        user: req.user.id
    })
        .then(profile => {
            //ge remove index
            const removeIndex = profile.education
                .map(item => item.id)
                .indexOf(req.params.edu_id);
            //splice out of array
            profile.education.splice(removeIndex, 1);
            //save
            profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json(err));
});

////////////////////////////////////////////////////////////
//@route DELETE api/profile
//@desc DELETE user and profile 
//@acceso private
router.delete('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOneAndRemove({
        user: req.user.id
    })
        .then(() => {
            User.findOneAndRemove({
                _id: req.user.id
            })
                .then(() => res.json({
                    success: true
                }));
        })
        .catch(err => res.status(404).json(err));
});



module.exports = router;