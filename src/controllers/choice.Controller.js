import { STATUS_CODE } from "../enums/statusCode.enum.js";
import db from "../database/db.js";
import dayjs from "dayjs";

async function choicePost(req, res) {
  const { title, poolId } = req.body;
  try {
    await db
      .collection("optionssurvey")
      .insertOne({ title, poolId});

    return res.sendStatus(STATUS_CODE.CREATED);
  } catch (e) {
    console.error(e);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function choiceVotePost(req, res) {
  const { title } = res.locals;

  const now = Date.now();
  const time = dayjs(now).format("YYYY/MM/DD hh:mm");
  try {
    await db.collection("votos").insertOne({ title, time });

    return res.sendStatus(STATUS_CODE.CREATED);
  } catch (e) {
    console.error(e);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { choicePost, choiceVotePost };
