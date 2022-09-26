import { ObjectID } from "bson";
import { ObjectId } from "mongodb";
import db from "../database/db.js";

import { STATUS_CODE } from "../enums/statusCode.enum.js";

async function pollPost(req, res) {
  const { title, expireAt } = req.body;
  let body = {
    title,
    expireAt,
  };

  try {
    if (expireAt.length < 1) {
      const newExpireAt = res.locals.newExpireAt;

      body = { ...body, expireAt: newExpireAt };
    }

    await db.collection("enquetes").insertOne(body);

    return res.status(STATUS_CODE.CREATED).send(body);
  } catch (e) {
    console.error(e);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function pollGet(req, res) {
  try {
    const enquetes = await db.collection("enquetes").find({}).toArray();

    return res.status(STATUS_CODE.OK).send(enquetes);
  } catch (e) {
    console.error(e);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function pollChoiceGet(req, res) {
  const { id } = req.params;

  try {
    const enquetes = await db
      .collection("optionssurvey")
      .find({ poolId: id })
      .toArray();

    if (enquetes.length < 1) {
      return res.sendStatus(STATUS_CODE.NOT_FOUND);
    }
    return res.status(STATUS_CODE.OK).send(enquetes);
  } catch (e) {
    console.error(e);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function pollResultGet(req, res) {
  const { id } = req.params;
  try {
    const enquetes = await db.collection("enquetes").findOne({_id: new ObjectId(id)}).toArray();

    return res.status(STATUS_CODE.OK).send(enquetes);
  } catch (e) {
    console.error(e);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { pollPost, pollGet, pollChoiceGet, pollResultGet};
