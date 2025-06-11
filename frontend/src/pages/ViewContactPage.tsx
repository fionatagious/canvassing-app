import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getContact, deleteContact } from "../api/v1/contacts";
import Button from "../components/Button";
import Heading1 from "../components/Heading1";
import Paragraph from "../components/Paragraph";
import { links } from "../data/consts";

type Contact = {
  id: number;
  name: string;
  email?: string;
  address?: string;
  notes?: string;
  contacted?: boolean;
  follow_up_needed?: boolean;
};

const ViewContactPage = () => {
  const [contact, setContact] = useState<Contact | null>(null);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getContact(Number(id))
        .then(setContact)
        .catch((error) => console.error("Failed to fetch contact", error));
    }
  }, [id]);

  const navigate = useNavigate();
  const handleDeleteAndRedirect = async (contactId: number) => {
    try {
      await deleteContact(contactId);
      alert("Contact deleted successfully.");
      // Redirect to contacts page after deletion
      navigate(links.contacts.href);
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact. Please try again.");
    }
  };

  return (
    <div className="px-4 md:px-6 py-4 md:py-6">
      {!contact ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-1">
          <Heading1 data-cy="contact-name" title={contact.name} />
          <Paragraph data-cy="contact-address">{`Address: ${contact.address}`}</Paragraph>
          <Paragraph data-cy="contact-email">{`Email: ${contact.email}`}</Paragraph>
          <Paragraph data-cy="contact-notes">{`Notes: ${contact.notes}`}</Paragraph>
          <Paragraph data-cy="contact-contacted">
            Contacted? {contact.contacted ? "Yes" : "No"}
          </Paragraph>
          <Paragraph data-cy="contact-follow-up-needed">
            Follow up needed? {contact.follow_up_needed ? "Yes" : "No"}
          </Paragraph>
          <Button
            data-cy="delete-contact-button"
            className="my-4"
            label="Delete contact"
            onClick={() => handleDeleteAndRedirect(contact.id)}
          />
        </div>
      )}
    </div>
  );
};

export default ViewContactPage;
