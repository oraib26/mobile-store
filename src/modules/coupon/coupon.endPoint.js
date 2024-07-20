import { roles } from "../../middleware/auth.js";

export const endPoint = {
  create: [roles.Admin, roles.SuperAdmin],
  getAll: [roles.Admin, roles.SuperAdmin],
  update: [roles.Admin, roles.SuperAdmin],
  delete: [roles.Admin, roles.SuperAdmin],
};
