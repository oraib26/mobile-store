import { roles } from "../../middleware/auth.js";

export const endpoints = {
    create:[roles.User],
    getAll:[roles.Admin, roles.SuperAdmin],
    orderUser:[roles.User],
    updateOrder:[roles.Admin, roles.SuperAdmin]
}