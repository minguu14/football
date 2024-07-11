import { mongoose } from "mongoose";
const { Schema, model } = mongoose;

const TeamSchema = new Schema(
  {
    logo: { type: String },
    name: { type: String, required: true, unique: true },
    skill: { type: String, required: true },
    manner: { type: String, required: true },
    age: { type: String, required: true },
    area: { type: String, required: true },
    introductions: { type: String, required: true },
  },
  { timestamps: true }
);

const TeamModel = model("Team", TeamSchema);

export default TeamModel;
