import Joi from "joi";

export const CreateCardSchema = Joi.object({
  title: Joi.string().required().min(2).max(256).messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 2 characters",
    "string.max": "Title must be less than 256 characters",
  }),
  subtitle: Joi.string().required().min(2).max(256).messages({
    "string.empty": "Subtitle is required",
    "string.min": "Subtitle must be at least 2 characters",
    "string.max": "Subtitle must be less than 256 characters",
  }),
  description: Joi.string().required().min(2).max(1024).messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 2 characters",
    "string.max": "Description must be less than 1024 characters",
  }),
  phone: Joi.string()
    .required()
    .pattern(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
    .messages({
      "string.empty": "Phone is required",
      "string.pattern.base": "Phone must be a valid Israeli phone number",
    }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
    }),
  web: Joi.string().allow(""),
  imageUrl: Joi.string().required().uri().messages({
    "string.empty": "Image URL is required",
    "string.uri": "Image URL must be valid",
  }),
  imageAlt: Joi.string().required().min(2).max(256).messages({
    "string.empty": "Image alt text is required",
    "string.min": "Image alt text must be at least 2 characters",
    "string.max": "Image alt text must be less than 256 characters",
  }),
  state: Joi.string().required().min(2).max(256).messages({
    "string.empty": "State is required",
    "string.min": "State must be at least 2 characters",
    "string.max": "State must be less than 256 characters",
  }),
  country: Joi.string().required().min(2).max(256).messages({
    "string.empty": "Country is required",
    "string.min": "Country must be at least 2 characters",
    "string.max": "Country must be less than 256 characters",
  }),
  city: Joi.string().required().min(2).max(256).messages({
    "string.empty": "City is required",
    "string.min": "City must be at least 2 characters",
    "string.max": "City must be less than 256 characters",
  }),
  street: Joi.string().required().min(2).max(256).messages({
    "string.empty": "Street is required",
    "string.min": "Street must be at least 2 characters",
    "string.max": "Street must be less than 256 characters",
  }),
  houseNumber: Joi.string().required().messages({
    "string.empty": "House number is required",
  }),
  zip: Joi.string().required().messages({
    "string.empty": "ZIP code is required",
  }),
});
