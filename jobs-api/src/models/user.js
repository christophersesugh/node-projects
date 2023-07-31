import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "jobsapi";
const lifetime = "1d";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide username"],
    minlength: 4,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { id: this._id, name: this.name, email: this.email },
    secret,
    {
      expiresIn: lifetime,
    }
  );
};

export default mongoose.model("User", userSchema);
