const mongoose = require("mongoose");
require('dotenv').config({ path: 'env' });

const initDatabase = () => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  };

  // setting up DB_URI
  // let db_URI = "";
  let dbURI = process.env.DB_URI;
  // connection to db
  mongoose.connect(dbURI, options);

  //access connection object
  const connection = mongoose.connection;

  // Event listeners for connection objects
  connection.on("connected", () => {
    console.log("Connected to the database successfully");
  });

  connection.on("error", (err) => {
    console.log(err);
  });

  connection.on("disconnected", () => {
    console.log("Disconnected");
  });
};

// initDatabase();

module.exports = initDatabase;
// console.log(dbURI);
