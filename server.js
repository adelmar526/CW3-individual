const express = require(express);
var app = express();
const { MongoClient } = require("mongodb");
// uri for mongodb
var uri = "mongodb+srv://ad1581:<password>@cluster0.nlwvzii.mongodb.net/?retryWrites=true&w=majority";
var client = new MongoClient(uri);

async function connect() {
    //etsablishing connection with Mongodb
    try {
        await client.connect().then(() => console.log("successful connection to MongoDB"));
    } catch (e) {
        console.log("Error connecting to MongoDB");
    }

}

// here we call the function so that the code stored is carried out
connect();

// the function below will retrieve the lessons stored in mongodb
async function getLessons() {
    return client
        .db("app")
        .collection("lessons")
        .find().toArray; // this will convert the lesson information to string and store it in an array
}

// setting up express server
const cors = require("cors");
app.use(express.json());
app.use(cors()); // enables cors and avoids error between front and backend

//define api routes
app.get("/api/lesson", async(req, res) => { // req stands for request and res for response which is used in http request
    var result = await getLessons();
    res.send(result); // sends the http
});

//port config
var PORT = process.env.PORT || 3000;

//starting the server
app.listen(PORT, () => {
    console.log(`server is running on PORT: ${PORT}`);
});