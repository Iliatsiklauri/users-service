import Joi from "joi";

export const UserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).options({ abortEarly: false });

export type UserType = {
  email: string;
  password: string;
  role: "ADMIN" | "USER";
};
