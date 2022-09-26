import { STATUS_CODE } from "../enums/statusCode.enum.js";
import { postChoiceScrema } from "../schemas/choice.Schema.js";
import db from "../database/db.js";

async function postChoiceMiddleWares(req, res, next) {
  const { title, poolId } = req.body;

  const validation = postChoiceScrema.validate(
    { title, poolId },
    { abortEarly: true }
  );

  if (validation.error) {
    return res
      .status(STATUS_CODE.UNPROCESSABLE_ENTITY)
      .send(validation.error.details.map((erro) => erro.message));
  }

  const now = Date.now();
  try {
    const enquete = await db
      .collection("enquetes")
      .findOne({ _id: new ObjectId(poolId) });

    const option = await db.collection("optionssurvey").findOne({ title });

    const time = Date.parse(enquete.expireAt);
    if (time < now) {
      return res.status(STATUS_CODE.FORBIDDEN).send("Tempo da enquete expirou");
    }

    if (!enquete) {
      return res.status(STATUS_CODE.NOT_FOUND).send("Enquete não existente");
    }

    if (option) {
      return res.status(STATUS_CODE.CONFLICT).send("Título já existente");
    }

    next();
  } catch (e) {
    console.error(e);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function postChoiceVoteMiddleWares(req, res, next) {
  const { id } = req.params;

  try {
    //  const option = await db.collection("optionssurvey").findOne({ _id: new ObjectId(id) });
    //  if (!option) {
    //    return res.status(STATUS_CODE.NOT_FOUND).send("Opção não existente");
    //  }

    //  const enquete = await db
    //    .collection("enquetes")
    //    .findOne({ _id: new ObjectId(option.poolId) });

    //  const time = Date.parse(enquete.expireAt);
    //  if (time < now) {
    //    return res.status(STATUS_CODE.FORBIDDEN).send("Tempo da enquete expirou");
    //  }
    res.locals.title = "JavaScript";
    next();
  } catch (e) {
    console.error(e);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { postChoiceMiddleWares, postChoiceVoteMiddleWares };
