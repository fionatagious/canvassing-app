import { Router } from "express";
import {
  getAllContacts,
  getContact,
  createContact,
  editContactNote,
  deleteContact,
} from "../controllers/contacts";

const router = Router();

/* bind routes to controller functions */
router.get("/", getAllContacts);
router.get("/:id", getContact);
router.post("/", createContact);
router.put("/:id", editContactNote);
router.delete("/:id", deleteContact);

export default router;
