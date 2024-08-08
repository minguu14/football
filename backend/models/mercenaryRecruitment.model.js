import { mongoose } from "mongoose";
const { Schema, model } = mongoose;

const MercenaryRecruitmentSchema = new Schema(
  {
    teamName: { type: String, required: true },
    formation: { type: String, required: true },
    skillLevel: { type: String, required: true },
    manners: { type: String, required: true },
    ageGroup: { type: String, required: true },
    field: { type: String, required: true },
    address: { type: String, required: true },
    matchStartTime: { type: String, required: true },
    totalMatchTime: { type: String, required: true },
    recruitingPositions: { type: Array, required: true },
    recruitingNumber: { type: String, required: true },
    recruitedMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mercenary",
      },
    ],
    cost: { type: String, required: true },
    minimumQuarter: { type: String, required: true },
    comment: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const MercenaryRecruitmentModel = model(
  "MercenaryRecruitment",
  MercenaryRecruitmentSchema
);

export default MercenaryRecruitmentModel;
