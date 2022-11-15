require("dotenv").config();
const mongoose = require("mongoose");
const UserStat = require("./UserStat")
const User = require("./user");
const connectDB = () => {
  return mongoose.connect(process.env.CONNECTION_URI);
};

exports.connectDB = connectDB;
exports.User = User;

exports.UserStat = UserStat;