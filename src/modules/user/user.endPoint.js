import { roles } from "../../middleware/auth.js";

export const endpoints = {
  create: [roles.SuperAdmin],
  update: [roles.SuperAdmin],
  delete: [roles.SuperAdmin],
  getAll: [roles.Admin],

};
