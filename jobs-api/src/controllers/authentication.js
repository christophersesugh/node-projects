import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import CustomApiError from "../errors/custom-api.js";
import asyncWrapper from "../middleware/async-wrapper.js";
import User from "../models/user.js";

export const register = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const tempUser = { name, email, password: hashedPassword };
  const user = await User.create({ ...tempUser });
  res.status(StatusCodes.CREATED).json({ user });
});

export const login = asyncWrapper(async (req, res) => {
  res.send("LOGIN");
});

export const me = asyncWrapper(async (req, res) => {
  res.send("ME");
});
