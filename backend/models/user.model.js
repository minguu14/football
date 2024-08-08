import { mongoose } from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    real_name: { type: String, required: true },
    birthday: { type: String, required: true },
    nickname: { type: String, required: true },
    phone_number: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel = model("User", UserSchema);

export default UserModel;
