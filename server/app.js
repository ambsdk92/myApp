const express = require("express");
const userRouter = require("./routes/users-router");
const app = express();
const json = express.json();

app.use(json);

app.use((req, res, next) => {
  console.log("Request log: ", req.path, req.method);
  next();
});

app.use("/users", userRouter);

module.exports = app;
