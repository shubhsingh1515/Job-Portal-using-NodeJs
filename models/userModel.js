import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

//middlewares
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  const isMatch= await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};

//JSON WEBTOKEN
userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};
export default mongoose.model("User", userSchema);
