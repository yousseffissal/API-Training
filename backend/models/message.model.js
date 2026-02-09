const mongoose = require('mongoose');

// Define the Message schema
const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, "Message parameter is required in the request body"]
    },
    sender: {
        type: String,
        required: [true, "Sender parameter is required in the request body"]
    },
    receiver: {
        type: String,
        required: [true, "Receiver parameter is required in the request body"]
    },
},
    {
        timestamps: true
    }
);

// Make the name of the schema in the database "Message" and not "Messages" cus mongoose will automatically pluralize the name of the schema and make it "Messages" if we don't specify it like this, and also we can specify the collection name in the database by passing a third argument to the mongoose.model() function like this : mongoose.model("Message", MessageSchema, "this-is-collection-name") , but if we don't specify it, mongoose will automatically create a collection with the pluralized name of the schema which is "Messages" in this case.

// In MongoDB, the structure is organized in levels.At the top level, there is a Cluster.A Cluster hosts one or more databases.Inside each database, there are Collections.A Collection stores multiple documents.Each Document represents a single record in JSON-like format.When using Mongoose, a Model is used in the application code.The Model represents a collection and allows us to create, read, update, and delete documents in this collection. So, the Model is the interface through which we interact with the database collection in our application code, while the Collection is the actual storage of documents in the MongoDB database. The Model provides a higher-level abstraction for working with the data, while the Collection is responsible for storing and managing the documents in the database the documents in the collection have the same structure defined by te schema, and the model is used to create and manipulate these documents in the application code. so its : cluster > database > collection > document, and the model is the interface to interact with the collection in the application code.

// The model will be created when we call mongoose.model() function and we will export it to use it in the controllers to perform CRUD operations on the messages collection in the database, and also we can use it to create new messages and save them to the database, and also to retrieve messages from the database and send them to the frontend.
const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;

