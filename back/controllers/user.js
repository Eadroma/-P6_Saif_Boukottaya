const bcrypt = require('bcrypt');
const {
    json
} = require('express');
const modelUser = require('../models/User');
const jwt = require('jsonwebtoken');
exports.signup = (req, res, next) => {
    modelUser.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                console.log('user already exists');
                return res.status(400).json({
                    error: 'User already exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10)
                    .then((password) => {
                        const user = new modelUser({
                            email: req.body.email,
                            password: password
                        });
                        user.save().then(() => res.status(201).json({
                                message: `user Created !`
                            }))
                            .catch((err) => {
                                res.status(400).json({
                                    error: err
                                });
                            });
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            error: err
                        });
                    });
            }
        })

}

exports.login = (req, res, next) => {
    modelUser.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then((userValid) => {
                        if (!userValid)
                            return res.status(400).json({
                                error: 'No username found'
                            })
                        res.status(201).json({
                            userId: user._id,
                            token: jwt.sign({
                                userId: user._id
                            }, 'RANDOM_TOKEN_SECRET', {
                                expiresIn: '24h'
                            })
                        })
                    })
                    .catch((err) => res.status(500).json({
                        error: err
                    }));
            }
        })
        .catch((err) => res.status(500).json({
            error: err
        }));
}