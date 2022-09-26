import Joi from "joi";

const postPollScrema = Joi.object({
  title: Joi.string().required(),
  expireAt: Joi.string().min(0),
});


export { postPollScrema };