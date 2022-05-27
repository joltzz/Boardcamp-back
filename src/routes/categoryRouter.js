import { Router } from "express";
import { getCategories, addCategory } from "../controllers/categoryController.js"

import { validateCategoryMiddleware } from "../middlewares/validateCategoryMiddleware.js"

const categoriesRouter=Router();

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", validateCategoryMiddleware, addCategory);

export default categoriesRouter;