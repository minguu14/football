import { mongoose } from "mongoose";
const { Schema, model } = mongoose;

const TeamSchema = new Schema(
  {
    teamName: { type: String, required: true, unique: true },
    teamLogo: { type: String, required: true },
    members: { type: Number, required: true },
    area: { type: String, required: true },
  },
  { timestamps: true }
);

const TeamModel = model("Team", TeamSchema);

export default TeamModel;
