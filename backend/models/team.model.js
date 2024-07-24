import { mongoose } from "mongoose";
const { Schema, model } = mongoose;

const TeamSchema = new Schema(
  {
    name: { type: String, required: true },
    formation: { type: String, required: true },
    skill: { type: String, required: true },
    manner: { type: String, required: true },
    age: { type: String, required: true },
    place: { type: String, required: true },
    address: { type: String, required: true },
    kick_off: { type: String, required: true },
    play_time: { type: String, required: true },
    positions: { type: Array, required: true },
    people: { type: String, required: true },
    cost: { type: String, required: true },
    quarter: { type: String, required: true },
    announcement: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const TeamModel = model("Team", TeamSchema);

export default TeamModel;
