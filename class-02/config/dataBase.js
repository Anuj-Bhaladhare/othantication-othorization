// dataBase.js

const mongoose = require("mongoose");

require("dotenv").config();

function Connect() {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((error) => {
        console.log("Error connecting to the database:", error);
        console.error(error);
        process.exit(1);
    });
}

module.exports = { Connect };
