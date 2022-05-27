import { Router } from "express";

import categoriesRouter from "./categoryRouter.js";
import gamesRouter from "./gamesRouter.js";
import customerRouter from "./customerRouter.js";

const router = Router();
router.use(customerRouter);
router.use(gamesRouter);
router.use(categoriesRouter);


export default router;