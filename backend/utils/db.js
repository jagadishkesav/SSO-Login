const mongoose = require("mongoose");
const config = require("../config");

exports.connect = () => {
  mongoose
    .connect(
      `${config.database.mongodb.protocol}://${config.database.mongodb.host}:${config.database.mongodb.port}/${config.database.mongodb.database}`
    )
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((error) => console.error("Connection error", error));
};
