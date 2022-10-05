const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true},
  },
  { timestamps: true }
);

// static signup method
userSchema.statics.signup = async function (name, email, password, isAdmin) {
  // validation
  if (!name && !email && !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });
  if(exists){
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ name, email, isAdmin, password: hash })

  return user
};

userSchema.statics.login = async function(email, password) {

    if (!email || !password) {
      throw Error('All fields must be filled')
    }
  
    const user = await this.findOne({ email })
    if (!user) {
      throw Error('Incorrect email')
    }
  
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw Error('Incorrect password')
    }
  
    return user
  }

const User = mongoose.model("user", userSchema);
module.exports = User;
