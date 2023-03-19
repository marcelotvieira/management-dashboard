import Joi = require('joi');

export const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(3),
  role: Joi.string()
});

export const userLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(3),
});

export const projectValidateSchema = Joi.object({
  name: Joi.string().required(),
  clientId: Joi.string().required(),
  status: Joi.string(),
  initialDate: Joi.string().required(),
  endDate: Joi.string().required(),
  expectedEndDate: Joi.string().required(),
  ofertedValue: Joi.number().required(),
  value: Joi.number(),
  capturedBy: Joi.string().required(),
  category: Joi.string(),
  tags: Joi.array(),
  tasks: Joi.array(),
});

