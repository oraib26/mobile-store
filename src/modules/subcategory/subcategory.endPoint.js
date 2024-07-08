import { roles } from "../../middleware/auth.js";

export const endPoint = {
  create: [roles.SuperAdmin,roles.Admin],
  getAll: [roles.SuperAdmin,roles.Admin],
  update: [roles.SuperAdmin,roles.Admin],
  delete: [roles.SuperAdmin,roles.Admin],
};
