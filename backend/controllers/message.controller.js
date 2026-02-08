// here we will define the controller functions for handling the message routes, and we will import the Message model to interact with the database.

// we used seperater function to separate the logs of each request in the console for better readability, and we used auth function to protect some routes and only allow access to them if the user is logged in and is an admin.

//the diffrence between middleware and controller functions is that middleware functions are used to perform some operations on the request and response objects before they reach the controller functions, while controller functions are used to handle the logic of the routes and send the appropriate response back to the client. Middleware functions are usually used for tasks such as authentication, logging, error handling, etc., while controller functions are used for tasks such as creating, reading, updating, and deleting data from the database.

// Importing the Message model to interact with the database
const Message = require('../models/message.model.js');

// controllers/message.controller.js
const Hello = (req, res, next) => {
    res.status(200).send(
        {
            message: 'Hello, World! from the server this is a test message',
            sender: 'Server'
        }
    );
    console.log('Hello, World! from the server this is a test message');
    next();
};

const FetchALL = async (req, res, next) => {
    try {
        // get all messages from the database
        const getMessages = await Message.find({});
        if (getMessages.length === 0) {
            res.status(404).send(
                {
                    error: 'No messages found in the database.'
                }
            );
            console.log('No messages found in the database.');
            console.log('-----------------------------');
            return;
        }
        res.status(200).send(
            {
                message: 'Messages retrieved successfully.',
                data: getMessages
            }
        );
        console.log('Messages retrieved successfully.');
        next();
    } catch (error) {
        console.error('Error processing the request:', error);
        res.status(500).send(
            {
                error: 'An error occurred while processing the request.'
            });
        return;
    }
};

const FindHello = async (req, res, next) => {
    try {
        const id = req.params.id;

        // get message from the database
        const getMessage = await Message.find({ sender: id });
        if (getMessage.length === 0) {
            res.status(404).send(
                {
                    error: 'Message not found for the given sender ID.'
                }
            );
            console.log('Message not found for the given sender ID.');
            console.log('-----------------------------');
            return;
        }
        res.status(200).send(
            {
                message: 'Message retrieved successfully.',
                //data ----> datas it's a change to practice we made in the frontend
                datas: getMessage
            }
        );
        console.log('Message retrieved successfully.');
        next();
    } catch (error) {
        console.error('Error processing the request:', error);
        res.status(500).send(
            {
                error: 'An error occurred while processing the request.'
            }
        );
        return;
    }
};

const UpdateHello = async (req, res, next) => {
    try {
        const id = req.params.id;

        // Update message from the database
        const UpdateMessage = await Message.findOneAndUpdate(
            { sender: id },
            { message: req.body.message },
            { new: true }
        );

        if (!UpdateMessage) {
            res.status(404).send(
                {
                    error: 'Message not found for the given sender ID.'
                }
            );
            console.log('Message not found for the given sender ID.');
            console.log('-----------------------------');
            return;
        }
        res.status(200).send(
            {
                message: 'Message updated successfully.',
                data: UpdateMessage
            }
        );
        console.log('Message updated successfully.');
        next();
    } catch (error) {
        console.error('Error processing the request:', error);
        res.status(500).send(
            {
                error: 'An error occurred while processing the request.'
            }
        );
        return;
    }
};

const DeleteHello = async (req, res, next) => {
    try {
        const id = req.params.id;

        // delete the message to the database
        const deleteMessage = await Message.deleteMany({ sender: id });
        if (deleteMessage.deletedCount === 0) {
            res.status(404).send(
                {
                    error: 'Message not found for the given sender ID.'
                }
            );
            console.log('Message not found for the given sender ID.');
            console.log('-----------------------------');
            return;
        }
        res.status(200).send(
            {
                message: 'Messages deleted successfully for this sender',
                data: deleteMessage
            }
        );
        console.log('Message deleted successfully for id : ' + id);
        next();
    } catch (error) {
        console.error('Error processing the request:', error);
        res.status(500).send(
            {
                error: 'An error occurred while processing the request.'
            }
        );
        return;
    }
};

const DeleteAll = async (req, res, next) => {
    try {

        // delete all messages to the database
        const deleteMessages = await Message.deleteMany({});
        if (deleteMessages.deletedCount === 0) {
            res.status(404).send(
                {
                    error: 'There is no one here (: (All messages deleted).'
                }
            );
            console.log('Tere are no messages in the database.');
            console.log('-----------------------------');
            return;
        }
        res.status(200).send(
            {
                message: 'All messages deleted successfully.',
                data: deleteMessages
            }
        );
        console.log('All messages deleted successfully.');
        next();
    } catch (error) {
        console.error('Error processing the request:', error);
        res.status(500).send(
            {
                error: 'An error occurred while processing the request.'
            }
        );
        return;
    }
};

const SayHello = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { message } = req.body;
        if (!message) {
            res.status(400).send(
                {
                    error: 'Message parameter is required in the request body.'
                }
            );
            console.log('Message parameter is required in the request body.');
            console.log('-----------------------------');
            return;
        }
        // save the message to the database
        const newMessage = await Message.create(
            {
                message: message,
                sender: id,
                receiver: 'Server'
            }
        );
        res.status(200).send(
            {
                message: 'Message received successfully.',
                data: newMessage
            }
        );
        console.log('Message received successfully from id : ' + id);
        console.log(`${JSON.stringify(req.body)}`);
        next();
    } catch (error) {
        console.error('Error processing the request:', error);
        res.status(500).send(
            {
                error: 'An error occurred while processing the request.'
            }
        );
        return;
    }
};

// we export the controller functions to be used in the routes file (message.route.js) where we will import them and use them as handlers for the corresponding routes.
module.exports = {
    Hello,
    FetchALL,
    FindHello,
    UpdateHello,
    DeleteHello,
    DeleteAll,
    SayHello
};