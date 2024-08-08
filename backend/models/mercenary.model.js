import { mongoose } from "mongoose";
const { Schema, model } = mongoose;

const MercenarySchema = new Schema(
  {
    real_name: { type: String, required: true },
    contact: { type: String, required: true },
    positions: { type: Array, required: true },
    player: { type: String },
    comment: { type: String },
    isAccepted: { type: Boolean },
    mercenary_teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MercenaryRecruitment",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const MercenaryModel = model("Mercenary", MercenarySchema);

export default MercenaryModel;
