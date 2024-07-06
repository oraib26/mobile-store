import { Router } from "express";
import * as userController from "./user.controller.js";
import { checkEmail } from '../../middleware/checkEmail.js';
import { auth } from "../../middleware/auth.js";
import { endpoints } from "./user.endPoint.js";
import { asyncHandler } from "../../utls/errorHandling.js";
import { validation } from '../../middleware/validation.js';
import * as validators from './user.validation.js';

const router = Router();

router.get('/getUser',auth(['User']), userController.getUser);
router.post(
  "/",
  auth(endpoints.create),
  checkEmail,
  validation(validators.createUserSchema),
  asyncHandler(userController.create)
);

router.patch(
  "/edit",
  auth(endpoints.update),
  validation(validators.editUserSchema),
  asyncHandler(userController.edit)
);

router.delete(
  "/delete",
  auth(endpoints.delete),
  asyncHandler(userController.remove)
);

export default router;
