import joi from "joi";

export const generalFields = {
  email: joi.string().email().required().messages({
    "string.empty": "email is required",
    "string.email": "plz enter a valid email",
  }),
  password: joi.string().required().min(6).max(20).messages({
    "string.empty": "password is required",
  }),
  file: joi.object({
    size: joi.number().max(50000000).required(),
    path: joi.string().required(),
    filename: joi.string().required(),
    destination: joi.string().required(),
    mimetype: joi.string().required(),
    encoding: joi.string().required(),  
    originalname: joi.string().required(),
    fieldname: joi.string().required(),
    dest: joi.string(),
  }),
};

export const validation = (schema) => {
  return (req, res, next) => {
    const errorMessage = [];
    let filterData = { ...req.body, ...req.params, ...req.query };

    if (req.file) {
      filterData.file = req.file;  // Ensure this matches the schema expectation
    } else if (req.files) {
      // Handle multiple files if necessary
      filterData.files = req.files;
    }

    const { error } = schema.validate(filterData, { abortEarly: false, allowUnknown: true });
    if (error) {
      error.details.forEach((err) => {
        errorMessage.push({ [err.context.key]: err.message });
      });

      return res.status(400).json({ message: "validation error", errors: errorMessage });
    }
    next();
  };
};
