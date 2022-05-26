import { Router } from "express";

import customerRouter from "./customerRouter.js";

const router = Router();
router.use(customerRouter);

export default router;