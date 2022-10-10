const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { name, email, 
          goal, age, location, height, weight, targetWeight, medicalCondition,
          password, isAdmin } = req.body;

  try {
    const user = await User.signup(name, email, 
      goal, age, location, height, weight, targetWeight, medicalCondition, password, isAdmin);

    // create a token
    const token = createToken(user._id);
    res.status(200).json({ name, email, 
      goal, age, location, height, weight, targetWeight, medicalCondition,isAdmin, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// find user
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  next();
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json({ user });
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// remove user
const removeUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      if (user.email === "username2@gmail.com") {
        res.status(400).send({ message: "cannot delete admin user" });
        return;
      }
      await user.remove();
      res.status(200).json({ user });
    }
  } catch (error) {
    res.status(400).json({ message: 'User not found' });
  }
};
module.exports = { loginUser, signupUser, getUsers, getUserById, removeUser };
