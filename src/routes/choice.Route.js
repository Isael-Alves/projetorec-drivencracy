import express from "express";
import { choicePost, choiceVotePost } from "../controllers/choice.Controller.js";
import { postChoiceMiddleWares, postChoiceVoteMiddleWares } from "../middlewares/choice.MiddleWares.js";

const router = express.Router();

router.post("/choice", postChoiceMiddleWares, choicePost);
router.post("/choice/:id/vote", postChoiceVoteMiddleWares, choiceVotePost);

export default router;
 