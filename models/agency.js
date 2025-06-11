import mongoose from "mongoose";

const ageSchema = new mongoose.Schema(
  {
    ageName: { type: String, required: true },
    agePosition: { type: String,required: true},
  },
  { timestamps: true }
);

const Agency = mongoose.models.Agency || mongoose.model("Agency", ageSchema, "Agency");

export default Agency;
