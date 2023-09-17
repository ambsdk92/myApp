const usersModel = require("../models/users-model");
const mongoose = require("mongoose");

const getUsers = async (req, res) => {
  try {
    const user = await usersModel.find().sort({ createdAt: -1 });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err.errors);
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ _message: "user not found" });

  try {
    const user = await usersModel.findById(id);
    if (!user) return res.status(404).json({ _message: "user not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const createUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const user = await usersModel.create({
      firstname,
      lastname,
      email,
      password,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err.errors);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ _message: "user not found" });

  try {
    const user = await usersModel.findOneAndDelete({ _id: id });
    if (!user) return res.status(404).json({ _message: "user not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ _message: "user not found" });

  try {
    const user = await usersModel.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!user) return res.status(404).json({ _message: "user not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { getUsers, getUser, createUser, deleteUser, updateUser };
