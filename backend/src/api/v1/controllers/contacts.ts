import { conn } from "../../../db";
import { Request, Response, NextFunction } from "express";
import { ResultSetHeader } from "mysql2";

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
const normalizeContact = (row: ContactRow): Contact => ({
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
    const normalized = contacts.map(normalizeContact);
    res.status(200).json(normalized);
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
};

// GET /api/v1/contacts/:id
export const getContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  console.log("Received payload:", req.body);

  try {
    const id = req.params.id;
    console.log("Fetching contact with ID:", id);
    if (!id) {
      return res.status(400).json({ error: "Contact ID is required." });
    }
    if (isNaN(Number(id))) {
      return res.status(400).json({ error: "Contact ID must be a number." });
    }

    const [contact] = (await conn.query("SELECT * FROM contacts WHERE id = ?", [
      id,
    ])) as [ContactRow[], any];
    if (contact.length === 0) {
      return res.status(404).json({ error: "Contact not found." });
    }

    // format the contact row to pass the Contact object rather than array
    const normalized = normalizeContact(contact[0]);
    res.status(200).json(normalized);
  } catch (error) {
    console.error("Error fetching contact:", error);
  }
};

// DELETE /api/v1/contacts/:id
export const deleteContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const id = req.params.id;
    console.log("Deleting contact with ID:", id);
    if (!id) {
      return res.status(400).json({ error: "Contact ID is required." });
    }

    const [contact] = await conn.query("DELETE FROM contacts WHERE id = ?", [
      id,
    ]);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found." });
    }
    res.status(200).json({ message: "Contact deleted successfully." });
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
};

// POST /api/v1/contacts
export const createContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  console.log("Received payload:", req.body);
  try {
    const {
      contactName,
      contactAddress,
      contactEmail,
      contactNotes,
      contacted,
      needToFollowUp,
    } = req.body;

    // name cannot be null
    if (!contactName) {
      return res.status(400).json({
        error: "Name is a required field.",
      });
    }

    // insert contact into the database
    const [result] = await conn.query<ResultSetHeader>(
      "INSERT INTO contacts (name, address, email, notes, contacted, follow_up_needed) VALUES (?, ?, ?, ?, ?, ?)",
      [
        contactName,
        contactAddress || null,
        contactEmail || null,
        contactNotes || null,
        Boolean(contacted), // convert to MySQL TINYINT(1)
        Boolean(needToFollowUp), // convert to MySQL TINYINT(1)
      ]
    );

    res.status(201).json({
      message: "Contact created successfully",
      contactId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT /api/v1/contacts/:id
export const editContactNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  console.log("Received payload:", req.body);
  try {
    const { contactNotes } = req.body;

    // insert contact into the database
    await conn.query<ResultSetHeader>(
      "UPDATE contacts SET notes = ? WHERE id = ?",
      [contactNotes || null, req.params.id]
    );

    res.status(200).json({
      message: "Note updated successfully",
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
