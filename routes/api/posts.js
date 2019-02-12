const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//post model
const Post = require('../../models/Post');

//profile model
const Profile = require('../../models/Profile');

//validacion
const validatePostInput = require('../../validation/posts');

//@route GET api/posts/test
//@desc test posts route
//@acceso publico
router.get('/test', (req, res) => res.json({
    msg: 'posts works'
}));

//@route GET api/posts
//@desc get posts
//@access publico
router.get('/', (req, res) => {
    Post.find()
        .sort({
            date: -1
        })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({
            nopostsfound: 'no se encontraron posteos'
        }));
});

//@route GET api/posts/:id
//@desc get post by id
//@access publico
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({
            nopostfound: 'no se encontro un post con ese id'
        }));
});

//@route POST api/posts
//@desc crear posts
//@acceso Privado
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        errors,
        isValid
    } = validatePostInput(req.body);

    //chekeo de validacion
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
});

//@route DELETE api/posts/:ID
//@desc BORRAR posts
//@acceso Privado
router.delete('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    //chekeo del dueño del post
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({
                            notauthorized: 'Usuario no autorizado'
                        });
                    }
                    //borrado
                    post.remove().then(() => res.json({
                        success: true
                    }));
                })
                .catch(err => res.status(404).json({
                    postnotfound: 'no se encontro el post'
                }));
        })
});

//@route POST api/posts/like/:ID
//@desc LIKE posts
//@acceso Privado
router.post('/like/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    //chekeo si el post ya tiene un like
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({
                            alreadyliked: 'ya le has dado like a este post'
                        });
                    }

                    //add user al array de likes
                    post.likes.unshift({
                        user: req.user.id
                    });
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({
                    postnotfound: 'no se encontro el post'
                }));
        })
});


//@route POST api/posts/unlike/:ID
//@desc UNLIKE posts
//@acceso Privado
router.post('/unlike/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    //chekeo si el post ya tiene un like
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length = 0) {
                        return res.status(400).json({
                            alreadyliked: 'AUN NO le has dado like a este post'
                        });
                    }
                    //buscar el indice del user para revomer del array de likes
                    const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
                    //sacando del array
                    post.likes.splice(removeIndex, 1);

                    //guardamos
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({
                    postnotfound: 'no se encontro el post'
                }));
        })
});

//@route POST api/posts/comment/:ID
//@desc add comment to post
//@acceso Privado
router.post('/comment/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    const {
        errors,
        isValid
    } = validatePostInput(req.body);

    //checkeo de validacion
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }
            //añadimos al array de comentarios
            post.comments.unshift(newComment);
            //save
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({
            postnotfound: 'no se encontro el post'
        }));
});

//@route DELETE api/posts/comment/:id/:comment_id
//@desc REMOVE comment FROM post
//@acceso Privado
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Post.findById(req.params.id)
        .then(post => {
            //CHECKEAMOS SI EL COMENTARIO EXISTE
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                return res.status(404).json({
                    commentnotexists: 'no existe el comentario'
                });
            }
            //traer el indice para removerlo
            const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.commet_id);
            //sacamos al comentario del array
            post.comments.splice(removeIndex, 1);
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({
            postnotfound: 'no se encontro el post'
        }));
});

module.exports = router;