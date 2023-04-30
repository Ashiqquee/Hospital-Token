const express = require('express');
const path = require('path');
const session = require('express-session');
const nocache = require('nocache');
const morgan = require('morgan');
const dbConnection = require('./config/dbConnect')
const app = express();
require('dotenv').config();

dbConnection.mongooseConnection();

const PORT = 3000;

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.sessionSecret,
        saveUninitialized: true,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 24 * 10,
        },
    })
);
app.use(nocache());
app.use(express.static(path.join(__dirname, "public")));
app.engine('ejs', require('ejs').renderFile);
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views', 'user'));




//...................... USER ROUTE ......................//

const userRoute = require("./routes/userRoute");
app.use("/", userRoute);


//...................... ADMIN ROUTE ......................//

const adminRoute = require("./routes/adminRoute");
app.use("/admin", adminRoute);



app.listen(PORT, () => {
    console.log("Server running...");
});