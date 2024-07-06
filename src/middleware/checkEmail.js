import userModel from "../../DB/models/user.model.js";
import { AppError } from "../utls/AppError.js";

export const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return next(new AppError("email already exists", 409));
  }
  next();
};
