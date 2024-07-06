import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utls/sendEmail.js";
import { AppError } from "../../utls/AppError.js";
import userModel from "../../../DB/models/user.model.js";

export const getUser = async (req, res, next) => {
  return res.json(req.user);
};

export const create = async (req, res, next) => {
  const { userName, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUND)
  );

  const token = jwt.sign({ email }, process.env.CONFIRMEMAILSECRET);
  const createUser = await userModel.create({
    userName,
    email,
    password: hashedPassword,
    role,
  });
  if (!createUser) {
    return next(new AppError(`error while create user`, 400));
  }
  await sendEmail(email, `welcome`, userName, token);
  return res
    .status(201)
    .json({ message: "creating user is success", user: createUser });
};

export const edit = async (req, res, next) => {
  const { userName, email, password, role } = req.body;
  const user = await userModel.findOne({ email: email });

  if (!user) {
    return next(new AppError(`email not found`, 404));
  }
  if(userName){
    user.userName = userName;
  }
  if(role){
    user.role = role;
  }
  if(password){
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUND)
    );
    user.password = hashedPassword;
  }
  await user.save();

  return res.json({ message: "editing user is success", user });

 
};

export const remove = async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOneAndDelete({ email: email });

  if (!user) {
    return next(new AppError(`email not found`, 404));
  }
  return res
    .status(201)
    .json({ message: "deleting user is success", user: user });
  //   console.log("deleteAdmin");
};
