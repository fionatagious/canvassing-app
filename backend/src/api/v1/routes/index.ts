// main router for api/v1
import { Router } from "express";
import contactsRouter from "./contacts";

const router = Router();

// mount the contacts router at /api/v1/contacts
router.use("/contacts", contactsRouter);

export default router;
