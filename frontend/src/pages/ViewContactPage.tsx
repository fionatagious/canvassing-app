import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getContact, deleteContact } from "../api/v1/contacts";
import Button from "../components/Button";
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
  const [contact, setContact] = useState([]);

  useEffect(() => {
    const id = Number(window.location.pathname.split("/").pop());
    getContact(id).then(setContact);
    console.log(JSON.stringify(contact));
  }, []);

  const navigate = useNavigate();
  const handleDelete = async (contactId: number) => {
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
    <div className="page-padding">
      {contact &&
        contact.map((contact: Contact) => (
          <div key={contact.id}>
            <h2>{contact.name}</h2>
            <p>Address: {contact.address}</p>
            <p>Email: {contact.email}</p>
            <p>Notes: {contact.notes}</p>
            <p>Contacted? {contact.contacted ? "Yes" : "No"}</p>
            <p>Follow up needed? {contact.follow_up_needed ? "Yes" : "No"}</p>
            <Button
              className="my-4"
              label="Delete contact"
              onClick={() => handleDelete(contact.id)}
            />
          </div>
        ))}
    </div>
  );
};

export default ViewContactPage;
