import { Router } from "express";
import { addGame, getGames } from "../controllers/gamesController.js"

import validadeGameMiddleware from "../middlewares/validateGameMiddleware.js";

const gamesRouter=Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validadeGameMiddleware, addGame);

export default gamesRouter;