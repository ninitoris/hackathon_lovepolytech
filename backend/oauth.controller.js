const express = require('express');
const router = express.Router();
const db = require('./pool');
const { signupValidation, loginValidation } = require('./validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Axios = require('axios');

const FORGE_CLIENT_ID = "3ytcIEPclEcrOUWH6d6dYQsTRx9A1OIS";
const FORGE_CLIENT_SECRET = "WRKbZ4kUXR5l4ORz";

const querystring = require('querystring');
const { prototype } = require("events");
let access_token = '';
const scopes = 'data:read data:write data:create bucket:create bucket:read';

//register new user (add to users table)
const postRegister = (req, res, next) =>{
    db.query(
        `SELECT * FROM Users WHERE LOWER(login) = LOWER(${db.escape(
            req.body.login
        )});`,
        (err, result) => {
            if (result.length) {
                return res.status(409).send({
                    msg: 'This user is already in use!'
                });
            } else {
                // username is available
                bcrypt.hash(req.body.password, 5, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            msg: 'err1 ' + err
                        });
                    } else {
                        // has hashed password => add to database
                        db.query(
                            `INSERT INTO Users (login, password, level) VALUES (${db.escape(
                                req.body.login
                            )}, ${db.escape(hash)}, 1)`,
                            (err, result) => {
                                if (err) {
                                    
                                    return res.status(400).send({
                                        msg: err
                                    });
                                }
                                return res.status(201).send({
                                    msg: 'The user has been registerd with us!'
                                });
                            }
                        );
                    }
                });
            }
        }
    );
}

//log in 
const postLogin = (req, res, next) => {
    db.query(
        `SELECT * FROM Users WHERE login = ${db.escape(req.body.login)};`,
        (err, result) => {
            // user does not exists
            if (err) {
                
                return res.status(400).send({
                    msg: err
                });
            }
            if (!result.length) {
                return res.status(401).send({
                    msg: 'user does not exists'
                });
            }
            // check password
            bcrypt.compare(
                req.body.password,
                result[0]['password'],
                (bErr, bResult) => {
                    
                    // wrong password
                    if (bErr) {
                        
                        return res.status(401).send({
                            msg: 'wrong password!'
                        });
                    }
                    if (bResult) {
                        const token = jwt.sign({ id: result[0].id }, 'the-super-strong-secrect', { expiresIn: '1h' });
                        db.query(
                            `UPDATE Users SET last_login = now() WHERE id = '${result[0].id}'`
                        );
                        return res.status(200).send({
                            msg: 'Logged in!',
                            token,
                            user: result[0]
                        });
                    }
                    return res.status(401).send({
                        msg: 'wrong password!'
                    });
                }
            );
        }
    );
}


const postGetUser = (req, res, next) => {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ) {
        return res.status(422).json({
            message: "Please provide the token",
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'the-super-strong-secrect');
    db.query('SELECT * FROM Users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Fetch Successfully.' });
    });
}

const getForgeToken = (req, res) =>{
    Axios({
        method: 'POST',
        url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        data: querystring.stringify({
            client_id: FORGE_CLIENT_ID,
            client_secret: FORGE_CLIENT_SECRET,
            grant_type: 'client_credentials',
            scope: scopes
        })
    })
        .then(function (response) {
            // Success
            access_token = response.data.access_token;
            res.send(response.data)
        })
        .catch(function (error) {
            // Failed
            console.log(error);
            res.send('Failed to authenticate');
        });
}

module.exports = {
    postLogin,
    postGetUser,
    getForgeToken,
    postRegister
};