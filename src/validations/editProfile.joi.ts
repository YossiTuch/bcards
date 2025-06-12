import Joi from "joi";

export const EditProfileSchema = Joi.object({
  name: Joi.object()
    .keys({
      first: Joi.string().min(2).max(256).required(),
      middle: Joi.string().min(2).max(256).allow(""),
      last: Joi.string().min(2).max(256).required(),
    })
    .required()
    .messages({
      "string.empty": "Required",
      "string.min": "Too Short",
    }),
  phone: Joi.string()
    .ruleset.regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
    .rule({ message: 'user "phone" must be a valid phone number' })
    .required(),

  image: Joi.object()
    .keys({
      url: Joi.string().allow(""),
      alt: Joi.string().allow(""),
    })
    .required(),

  address: Joi.object()
    .keys({
      state: Joi.string().allow(""),
      country: Joi.string().min(2).max(256).required(),
      city: Joi.string().min(2).max(256).required(),
      street: Joi.string().min(2).max(256).required(),
      houseNumber: Joi.string().min(1).max(256).required(),
      zip: Joi.string().min(1).max(10).required(),
    })
    .required(),
});
