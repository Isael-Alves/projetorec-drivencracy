import express from "express";
import postPollMiddleWares from "../middlewares/poll.middleWares.js";
import { pollPost, pollGet, pollChoiceGet, pollResultGet } from "../controllers/poll.Controller.js";

const router = express.Router();

router.post("/poll", postPollMiddleWares, pollPost);
router.get("/poll", pollGet);
router.get("/poll/:id/choice", pollChoiceGet);
router.get("/poll/:id/result", pollResultGet);

export default router;
