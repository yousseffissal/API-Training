const express = require('express');
const mongoose = require('mongoose');
// Importing the message routes
const MessageRoutes = require('./routes/message.route.js');
// Importing the CORS package
const cors = require('cors');
const app = express();

// Load environment variables from .env file
require('dotenv').config();

const PORT = process.env.PORT || 8090;
const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@crudtest.odr2zlg.mongodb.net/${process.env.MONGO_DB}?appName=CRUDtest`;

// we will need also to install the axios package in the frontend to make HTTP requests to the backend, you can run the following command in your terminal : npm install axios in the frontend, and then you can import it in your frontend files to use it to make requests to the backend. it is a promise-based HTTP client for the browser and node.js, it allows you to make HTTP requests to the backend and handle the responses easily. you can use it to make GET, POST, PUT, DELETE requests to the backend and handle the responses in your frontend code.

//we can use fetch API instead of axios to make HTTP requests to the backend, it is a built-in JavaScript API for making HTTP requests, it is supported in modern browsers and can be used in the frontend without the need to install any additional packages, but axios provides some additional features and a more convenient API for handling HTTP requests and responses, so it is often preferred by developers for making HTTP requests in the frontend.

//the word endpoint here is our route in the backend that we want to access from the frontend, for example if we have a route in the backend like this : app.get('/messages', (req, res) => { ... }) , then the endpoint for this route will be '/messages' and we can make a GET request to this endpoint from the frontend to get the messages data from the backend. endpoints are used to define the routes in the backend that we want to access from the frontend, and they are usually defined in the controllers or routes files in the backend.

//this part dosn't work cus we need to install the cors package and import it in this file to use it, but i will let it here for you to see how to use it if you want to allow requests only from the frontend URL that is running on the port 8090, but if you want to allow requests from any origin you can just use app.use(cors()) without any options, if we don't use CORS middleware, the frontend will not be able to make requests to the backend if they are running on different ports, and we will get a CORS error in the browser console.to install the cors package, you can run the following command in your terminal : npm install cors in the backend or the frontend depending on where you want to use it, but in this case we need to install it in the backend because we want to allow requests from the frontend to the backend :

//----------------------------------------------------------------------------------------------
// CORS configuration to allow requests only from the frontend URL that is running on port 8090
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    optionsSuccessStatus: 200 // For legacy browser support
};

// Enable CORS without any options to allow requests from any origin
app.use(cors(corsOptions));
//----------------------------------------------------------------------------------------------

//connection to the cluster and specify the database name that we want to connect to, and if it doesn't exist, it will be created automatically when we save the first message to the database
//all the detail here you will find them in the url in the MONGO_URL variable and in the env file
// we can connect to many databases in the same cluster by specifying the database name in the connection string, for example if we want to connect to another database called "Another-Database" we can use the following connection string : mongodb+srv://Yousseffissal:<password>@crudtest.odr2zlg.mongodb.net/Another-Database?appName=CRUDtest , and we can switch between the databases by using the mongoose.connection.useDb() method, for example if we want to switch to the "Another-Database" we can use the following code : mongoose.connection.useDb('Another-Database') , and then we can perform operations on this database using the models that we have defined for this database. so we can connect to multiple databases in the same cluster and switch between them using the mongoose.connection.useDb() method, but in our case we will just connect to one database called "Messages-App" and use it to store our messages data.
//Messages-App part is the name of the database that we chose to connect to, and if it doesn't exist, it will be created automatically when we save the first message to the database, and also we can specify the collection name in the database by passing a third argument to the mongoose.model() function like this : mongoose.model("Message", MessageSchema, "this-is-collection-name") , but if we don't specify it, mongoose will automatically create a collection with the pluralized name of the schema which is "Messages" in this case. so in our case we specified the collection name as "Messages" in the message.model.js file, so all the messages will be stored in this collection in the database.
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Connected to the database successfully.');
        // Middleware to handle CORS
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

// Middleware to parse JSON bodies
app.use(express.json());
app.use(logger);
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Use the message routes
app.use('/messages', MessageRoutes);

// Main route
app.get('/', (req, res, next) => {
    res.status(200).send('Hello to the Express server!');
    console.log('Hello to the Express server!');
    next();
}, seperater);

// Middleware functions
function logger(req, res, next) {
    console.log(`methode : ${req.method} & url : ${req.url}`);
    next();
}

function seperater(req, res) {
    console.log('-----------------------------');
}

