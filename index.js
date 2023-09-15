const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const {shipmentRoute} =require('./routes/shipment.route');

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(shipmentRoute);

app.all("*", (req, res, next) => {
    res.status(404).json({
        message:"Page not found"
    });
});


mongoose
    .connect(process.env.DB_URL)
    .then((db) => {
    console.log("DB Connected");
    app.listen(3000, () => {
    console.log(`Server started on 3000.`);
    });
})
    .catch((error) => {
    console.log(error);
});  