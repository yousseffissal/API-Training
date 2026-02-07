// here when we will define all the routes related to messages, and we will import the functions that we created in the controller to handle the logic of each route.

// we import the express module and create a router instance to define our routes.
const express = require('express');
const router = express.Router();
// we import the controller functions that we will use as handlers for our routes.
const { Hello, FindHello, UpdateHello, DeleteHello, DeleteAll, SayHello, FetchALL } = require('../controllers/message.controller.js');

// Message routes
router.get('/Hello', Hello, seperater);
router.get('/FetchALL', auth, FetchALL, seperater);
router.get('/FindHello/:id', auth, FindHello, seperater);
router.patch('/UpdateHello/:id', auth, UpdateHello, seperater);
router.delete('/DeleteHello/:id', auth, DeleteHello, seperater);
router.delete('/DeleteAll', auth, DeleteAll, seperater);
router.post('/SayHello/:id', auth, SayHello, seperater);

// Middleware functions
function auth(req, res, next) {

    const isloggedIn = req.query.loggedIn;
    const authHeader = req.query.admin;

    if (isloggedIn !== 'true') {
        res.status(401).send(
            {
                error: 'Unauthorized. you are not logged in.'
            }
        );
        console.log('Unauthorized. you are not logged in.');
        console.log('-----------------------------');
        return;
    }
    else {
        if (!authHeader || authHeader !== 'true') {
            res.status(401).send(
                {
                    error: 'Unauthorized. you are not admin.'
                }
            );
            console.log('Unauthorized. you are not admin.');
            console.log('-----------------------------');
            return;
        }
        else {
            console.log('Authorized request from admin.');
            next()
        }
    }
}

function seperater(req, res) {
    console.log('-----------------------------');
}

// we export the router to be used in the main application file (index.js) where we will import it and use it as middleware for the /messages route, so all the routes defined in this file will be prefixed with /messages.
module.exports = router;