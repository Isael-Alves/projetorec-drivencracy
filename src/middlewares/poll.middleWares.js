import { STATUS_CODE } from "../enums/statusCode.enum.js";
import { postPollScrema } from "../schemas/poll.Schema.js";
import dayjs from "dayjs";

async function postPollMiddleWares(req, res, next) {
  const { title, expireAt } = req.body;

  const validation = postPollScrema.validate(
    { title, expireAt },
    { abortEarly: true }
  );

  if (validation.error) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .send(validation.error.details.map((erro) => erro.message));
  }

  const now = Date.now();
  try {
    if (expireAt.length < 1) {
      const newExpireAt = dayjs(now + 2592000000).format("YYYY/MM/DD hh:mm");
      res.locals.newExpireAt = newExpireAt;
    }

    next();
  } catch (e) {
    console.error(e);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}


export default  postPollMiddleWares ;
