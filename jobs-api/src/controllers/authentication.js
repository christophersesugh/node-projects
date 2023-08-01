import { StatusCodes } from "http-status-codes";
import asyncWrapper from "../middleware/async-wrapper.js";
import CustomApiError from "../errors/custom-api.js";
import User from "../models/user.js";
import Job from "../models/job.js";

export const register = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    throw new CustomApiError("User already exist.", StatusCodes.BAD_REQUEST);
  }
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    token,
  });
});

// login user
export const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomApiError(
      "Provide all input values.",
      StatusCodes.BAD_REQUEST
    );
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomApiError("Invalid credentials", StatusCodes.BAD_REQUEST);
  }
  const correctPassword = await user.checkPassword(password);
  if (!correctPassword) {
    throw new CustomApiError("Invalid credentials", StatusCodes.BAD_REQUEST);
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    token,
  });
});

export const me = asyncWrapper(async (req, res) => {
  const { name, id } = req.user;
  const jobs = await Job.find({ createdBy: id });

  res.status(StatusCodes.OK).json({
    user: {
      name,
      id,
      jobs,
    },
  });
});
