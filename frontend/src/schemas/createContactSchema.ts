// This file defines a Yup schema for validating form field inputs.
import * as yup from "yup";

// keys in the schema must match the form field names in AddContactPage.tsx
export const createContactSchema = yup.object({
  name: yup
    .string()
    .required("Contact name is required")
    .min(2, "Contact name must be at least 2 characters long"),
  address: yup.string().nullable().notRequired(),
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .nullable()
    // .transform workaround: convert empty string to null so that Yup does not throw an error if no input is provided
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired(),
  notes: yup.string().nullable().notRequired(),
  contacted: yup.boolean().default(false),
  followup: yup.boolean().default(false),
});

// infers TypeScript types from the schema
export type CreateContactFormData = yup.InferType<typeof createContactSchema>;
