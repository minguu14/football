import { mongoose } from "mongoose";
const { Schema, model } = mongoose;

const MercenarySchema = new Schema(
  {
    real_name: { type: String, required: true },
    contact: { type: String, required: true },
    positions: { type: Array, required: true },
    player: { type: String },
    mercenary_teamId: { type: String, required: true },
    isAccepted: { type: Boolean, default: false },
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
