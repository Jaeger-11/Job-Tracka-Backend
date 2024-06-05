const express = require('express');
const app = express();
require("express-async-errors");
require("dotenv").config();
const cors = require('cors');
const helmet  = require('helmet');
const xss = require('xss-clean');

//Database
const connectDatabase = require("./database/connect");
//Middlewares
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const authentication = require("./middlewares/authentication");
//Router
const applicationRouter = require("./routes/applicationRoutes");
const authenticationRouter = require("./routes/authRoutes");
const goalRouter = require("./routes/goalRoutes");

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req,res) => {
    res.send("JOB TRACKA BACKEND APPLICATION")
})

app.use("/api/v1/application",authentication, applicationRouter);
app.use("/api/v1/auth", authenticationRouter); 
app.use("/api/v1/goal", authentication, goalRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000

const start = () => {
    try {
        connectDatabase(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start();
