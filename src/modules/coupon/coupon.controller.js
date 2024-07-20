import couponModel from "../../../DB/models/coupon.model.js";
import { AppError } from "../../utls/AppError.js";

export const createCoupon = async (req, res, next) => {
  const { name, amount } = req.body;
  if (await couponModel.findOne({ name })) {
    return next(new AppError(`coupon ${name} already exist`, 409));
  }
  req.body.expireDate = new Date(req.body.expireDate);
  const coupon = await couponModel.create(req.body);
  return res.status(201).json({ message: "success", coupon });
};

export const getAll = async (req, res, next) => {
  const coupons = await couponModel.find({});
  return res.status(201).json({ message: "success", coupons });
};

export const updateCoupon = async (req, res, next) => {
  const { name, amount } = req.body;
  let { expireDate } = req.body;
  if (!(await couponModel.findOne({ name }))) {
    return next(new AppError(`coupon ${name} not found`, 404));
  }
  expireDate = new Date(req.body.expireDate);
  const coupon = await couponModel.findOneAndUpdate({ amount, expireDate },{new:true});
  return res.status(201).json({ message: "success", coupon });
};

export const deleteCoupon = async (req, res, next) => {
  const { name } = req.body;
  const coupon = await couponModel.findOneAndDelete({name});
  if (!coupon) {
    return next(new AppError(`coupon ${name} not found`, 404));
  }
  return res.status(201).json({ message: "success", coupon });
};
