import { Router } from "express";
import { getCustomers, getCustomer } from "../controllers/customerController";

const customerRouter=Router();

customerRouter.get("/customers", getCustomers);
customerRouter.get("/customers/:id", getCustomer);

export default customerRouter;