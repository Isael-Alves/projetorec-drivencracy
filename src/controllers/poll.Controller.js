import db from "../database/db.js";
import { ObjectId } from "mongodb";

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
    const enquete = await db
      .collection("enquetes")
      .find({ _id: new ObjectId(id) })
      .toArray();

    if (enquete.length < 1) {
      return res.status(STATUS_CODE.NOT_FOUND).send("Enquete não existente");
    }

    const options = await db
      .collection("optionssurvey")
      .find({ poolId: id })
      .toArray();

    const votos = await db.collection("votos").find({}).toArray();

    if (votos) {
      const arrayVotos = [];
      for (let i = 0; i < options.length; i++) {
        let cont = 0;
        let title = options[i].title;

        for (let j = 0; j < votos.length; j++) {
          let titleVoto = votos[j].title;

          if (title === titleVoto) {
            cont += 1;
          }
        }
        arrayVotos.push(cont);
      }

      let indice = 0;
      let qtdVotos = arrayVotos[0];
      for (let i = 1; i < arrayVotos.length; i++) {
        if (qtdVotos < arrayVotos[i]) {
          qtdVotos = arrayVotos[i];
          indice = i;
        }
      }

      const body = {
        ...enquete,
        result: {
          title: options[indice].title,
          votes: qtdVotos,
        },
      };

      return res.status(STATUS_CODE.OK).send(body);
    }

  } catch (e) {
    console.error(e);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { pollPost, pollGet, pollChoiceGet, pollResultGet };
