import { conn } from "../../../db";
import { Request, Response, NextFunction } from "express";

/* ContractRow type matches the database schema, MySQL doesn't have a true boolean type */
type ContactRow = {
  id: number;
  name: string;
  email?: string;
  address?: string;
  notes?: string;
  contacted: number; // 0 or 1 from database, not a boolean yet
  follow_up_needed: number; // 0 or 1 from database, not a boolean yet
};

/** Contact type uses true booleans */
type Contact = Omit<ContactRow, "contacted" | "follow_up_needed"> & {
  contacted: boolean;
  follow_up_needed: boolean;
};

/* Override MySQL TINYINT(1) types with boolean to prepare it for frontend */
const formatContact = (row: ContactRow): Contact => ({
  ...row,
  contacted: Boolean(row.contacted),
  follow_up_needed: Boolean(row.follow_up_needed),
});

// GET /api/v1/contacts
export const getAllContacts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  console.log("Received payload:", req.body);

  try {
    const [contacts] = (await conn.query("SELECT * FROM contacts")) as [
      ContactRow[],
      any
    ];
    const formatted = contacts.map(formatContact);
    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
};
