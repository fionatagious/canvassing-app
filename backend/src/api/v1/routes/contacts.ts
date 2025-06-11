import { Router } from "express";
import { getAllContacts } from "../controllers/contacts";

const router = Router();

/* bind routes to controller functions */
router.get("/", getAllContacts);

export default router;
