//importing express, environmental variables, bodyparser, router, database connection function and declaring them in a variable to be using it in our index.js file
const express = require('express');
const dotenv = require('dotenv');
const ConnectDB = require('./db/ConnectDB');
const app = express();
const router = require('./routes/DBOperRoutes');
const bodyParser = require('body-parser');
const cors = require("cors");
dotenv.config();
//using the port in environmental variable or 5000
const port = process.env.PORT || 5000;

// middleware to parse incoming request in bodies
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Allow all origins and domains for CORS
app.use(cors({
    origin: '*', // Allows all domains and origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allows common HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allows specific headers
}));

// initialize the database connection pool
let pool;

(async () => {
    pool = await ConnectDB();

    // pass the pool to the routes
    app.use((req, res, next) => {
        req.pool = pool;
        next();
    });

    // use the router
    app.use("/", router);

    // start the server
    app.listen(port, () => {
        console.log(`Example app listening on port http://localhost:${port}`);
    });
})();
