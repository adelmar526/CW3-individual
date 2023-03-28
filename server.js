const API_URL = "https://darius-project.herokuapp.com/api";

const express = require("express");
var app = express();
const { MongoClient } = require("mongodb");
var uri =
    "mongodb+srv://darius-dude:dyWNzqsGVhErKgwX@cluster0.hlvaagz.mongodb.net/?retryWrites=true&w=majority"; //uri for mongodb
var client = new MongoClient(uri);

async function connect() {
    // try to establish a connection with the mongodb
    try {
        await client.connect().then(() => console.log("connected to mongodb"));
    } catch (e) {
        console.log("error while connecting to mongodb", e);
    }
}

connect();

async function getLessons() { // retrieves lessons from mongodb
    return client
        .db("project")
        .collection("lessons")
        .find().toArray(); // the array method is used to convert the lesson information
}

// setting up express server
const cors = require("cors");
app.use(express.json());
app.use(cors()); // enabling CORS to avoid CORS error between frontend and backend

// Defining api routes // ASYNC allows the perform updates which can delay time to the thread exuction 
app.get("/api/lesson", async(req, res) => { // the req respresents the http request for the express.js
    var result = await getLessons();
    res.send(result); // sends the http 
});

// PORT
var PORT = process.env.PORT || 3000;

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
