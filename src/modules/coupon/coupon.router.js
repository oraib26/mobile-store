import { Router } from "express";
import * as couponController from "./coupon.controller.js";
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utls/errorHandling.js";
import { endPoint } from "./coupon.endPoint.js";
import { validation } from "../../middleware/validation.js";
import { CreateCoupon } from "./coupon.validation.js";

const router = Router();
router.post(
  "/",
  auth(endPoint.create),
  validation(CreateCoupon),
  asyncHandler(couponController.createCoupon)
);
router.get(
    "/",
    auth(endPoint.getAll),
    asyncHandler(couponController.getAll)
  );
  
  router.put(
    "/updateCoupon",
    auth(endPoint.update),
    asyncHandler(couponController.updateCoupon)
  );

  router.delete(
    "/deleteCoupon",
    auth(endPoint.delete),
    asyncHandler(couponController.deleteCoupon)
  );
  

export default router;
