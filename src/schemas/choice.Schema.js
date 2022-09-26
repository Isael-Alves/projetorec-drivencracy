import Joi from "joi";

const postChoiceScrema = Joi.object({
  title: Joi.string().required(),
  poolId: Joi.string().required()
});

export { postChoiceScrema };