require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const server = require("./app");
const PORT = 4000;

const app = express();

console.log("Establishing database connection...");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.use("/api", server);

    app.listen(PORT, () => {
      console.log("Connected to database");
      console.log("App listening on port: ", PORT);
    });
  })
  .catch((err) => {
    console.log("Error connecting to DB", err);
  });
