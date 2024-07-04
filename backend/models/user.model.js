const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  name: { type: String, required: true },
  birthday: { type: String, required: true },
});

const UserModel = model("User", UserSchema);
module.exports = UserModel;
