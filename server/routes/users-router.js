const express = require("express");
const userRouter = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/users-controller");

userRouter.get("/", getUsers);

userRouter.get("/:id", getUser);

userRouter.post("/", createUser);

userRouter.delete("/:id", deleteUser);

userRouter.patch("/:id", updateUser);

module.exports = userRouter;
