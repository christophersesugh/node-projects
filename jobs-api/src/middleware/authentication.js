import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import CustomApiError from "../errors/custom-api.js";

const auth = async (req, res, next) => {
  const headers = req.headers.authorization;
  if (!headers || !headers.startsWith("Bearer")) {
    throw new CustomApiError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }
  const token = headers.split(" ")[1];
  try {
    let user = jwt.verify(token, "secret");
    req.user = { id: user.id, name: user.name };
    next();
  } catch (error) {
    throw new CustomApiError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }
};

export default auth;
