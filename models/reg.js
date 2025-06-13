import mongoose from "mongoose";

const regSchema = new mongoose.Schema(
  {
    regID: { type: String, required: true  },
    regLineID: { type: String},
    regName: { type: String, required: true },
    regLastname: { type: String, required: true },
    regTel: { type: String, required: true },
    regAgency: { type: String, required: true },
    regPosition: { type: String, required: true },
    regRole: { type: String, required: true, default: "emp" },
  },
  { timestamps: true }
);

const Register = mongoose.models.Register || mongoose.model("Register", regSchema, "Register");

export default Register;
