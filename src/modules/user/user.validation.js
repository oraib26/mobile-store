import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';


export const createUserSchema = joi.object({
    userName: joi.string().pattern(new RegExp('^[a-zA-Z0-9\u0621-\u064A\u0660-\u0669]+$')).min(3).max(20).required().messages({
        "string.empty": "userName is required",
    }
    ).required(),
    email: generalFields.email.required(),
    password: generalFields.password.required(),
    checkPassword: joi.valid(joi.ref('password')).required(),
    role:joi.required()

});

export const editUserSchema = joi.object({
    userName: joi.string().pattern(new RegExp('^[a-zA-Z0-9\u0621-\u064A\u0660-\u0669]+$')).min(3).max(20).required().messages({
        "string.empty": "userName is required",
    }
    ).optional(),
    email: generalFields.email.required(),
    password: generalFields.password.optional(),
    checkPassword: joi.valid(joi.ref('password')).optional(),
    role:joi.optional()

});