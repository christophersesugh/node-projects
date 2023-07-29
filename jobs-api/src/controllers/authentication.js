import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../libs/prisma.js";
import asyncWrapper from "../middleware/async-wrapper.js";
import CustomApiError from "../errors/custom-api.js";

// register user
// export const register = asyncWrapper(async (req, res) => {
//   const { name, email, password } = req.body;
//   const oldUser = await User.findOne({ email });
//   if (oldUser) {
//     throw new CustomApiError("User already exist.", StatusCodes.BAD_REQUEST);
//   }
//   const user = await User.create({ name, email, password });
//   const token = user.createJWT();
//   res.status(StatusCodes.CREATED).json({
//     token,
//   });
// });

const secret = process.env.JWT_SECRET; // Replace with your actual secret key

export const register = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user with the given email already exists
  const oldUser = await prisma.user.findUnique({ where: { email } });
  if (oldUser) {
    throw new CustomApiError("User already exists.", StatusCodes.BAD_REQUEST);
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the new user in the database
  console.log(hashedPassword);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  // Create a JWT token for the user
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    secret,
    { expiresIn: "7d" } // Set the token expiration as per your requirement
  );

  res.status(StatusCodes.CREATED).json({ token });
});

// login user
// export const login = asyncWrapper(async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     throw new CustomApiError(
//       "Provide all input values.",
//       StatusCodes.BAD_REQUEST
//     );
//   }
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new CustomApiError("Invalid credentials", StatusCodes.BAD_REQUEST);
//   }
//   const correctPassword = await user.checkPassword(password);
//   if (!correctPassword) {
//     throw new CustomApiError("Invalid credentials", StatusCodes.BAD_REQUEST);
//   }
//   const token = user.createJWT();
//   res.status(StatusCodes.OK).json({
//     token,
//   });
// });

export const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomApiError(
      "Provide all input values.",
      StatusCodes.BAD_REQUEST
    );
  }

  // Find the user by email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new CustomApiError("Invalid credentials", StatusCodes.BAD_REQUEST);
  }

  // Check if the password is correct
  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
    throw new CustomApiError("Invalid credentials", StatusCodes.BAD_REQUEST);
  }

  // Create a JWT token for the user
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    secret,
    { expiresIn: "7d" } // Set the token expiration as per your requirement
  );

  res.status(StatusCodes.OK).json({ token });
});

// export const me = asyncWrapper(async (req, res) => {
//   const { name, id } = req.user;
//   const jobs = await Job.find({ createdBy: id });
//   res.status(StatusCodes.OK).json({
//     user: {
//       name,
//       id,
//       jobs,
//     },
//   });
// });

export const me = asyncWrapper(async (req, res) => {
  const { name, id } = req.user;
  // Find all jobs created by the user with the given id
  const jobs = await prisma.job.findMany({ where: { createdBy: id } });
  res.status(StatusCodes.OK).json({
    user: {
      name,
      id,
      jobs,
    },
  });
});
