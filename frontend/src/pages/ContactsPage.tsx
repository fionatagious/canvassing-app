import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getContacts } from "../api/v1/contacts";
import Button from "../components/Button";
import FilterLink from "../components/FilterLink";
import { links, filters } from "../data/consts";

type Contact = {
  id: number;
  name: string;
  email?: string;
  address?: string;
  notes?: string;
  contacted?: boolean;
  follow_up_needed?: boolean;
};

const ContactsPage = () => {
  // fetch contacts from backend API and store in state
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    getContacts().then(setContacts);
  }, []);

  // filter contacts based on search params
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");
  const filteredContacts = contacts.filter((contact: Contact) => {
    if (!filter) return true;
    if (filter === "contacted") {
      return contact.contacted === true;
    }
    if (filter === "not_yet_contacted") {
      return contact.contacted === false;
    }
    if (filter === "follow_up_needed") {
      return contact.follow_up_needed === true;
    }
  });

  // redirect to view a specific contact
  const navigate = useNavigate();
  const handleRedirect = (contactId: number) => {
    navigate(links.viewContact.href.replace(":id", contactId.toString()));
  };

  return (
    <div className="page-padding">
      <h1>Your contacts</h1>
      <div className="flex bg-white rounded-md border-slate-900 border-2 pl-8 py-4 mb-8">
        <p>
          View and manage your contacts. Use the filters below to find specific
          contacts.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-6 items-center">
        <p>Filters: </p>
        <FilterLink
          data-cy="contacts-no-filter"
          label="All contacts"
          href={links.contacts.href}
        />
        <FilterLink
          data-cy="contacts-filter-contacted"
          label={filters.contacted.label}
          href={`${links.contacts.href}?filter=${filters.contacted.filterName}`}
        />
        <FilterLink
          data-cy="contacts-filter-not-yet-contacted"
          label={filters.notYetContacted.label}
          href={`${links.contacts.href}?filter=${filters.notYetContacted.filterName}`}
        />
        <FilterLink
          data-cy="contacts-filter-follow-up-needed"
          label={filters.followUpNeeded.label}
          href={`${links.contacts.href}?filter=${filters.followUpNeeded.filterName}`}
        />
      </div>

      {/* Contacts table */}
      <div className="overflow-x-auto mt-4">
        <table
          id="contacts-table"
          className="rounded-lg overflow-hidden border-separate border-spacing-0"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Contacted</th>
              <th>Follow up needed</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts &&
              filteredContacts.map((contact: Contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.address}</td>
                  <td>{contact.email}</td>
                  <td>{contact.contacted ? "Yes" : "No"}</td>
                  <td>{contact.follow_up_needed ? "Yes" : "No"}</td>
                  <td className="flex justify-center">
                    <Button
                      data-cy={`view-contact-button-${contact.id}`}
                      onClick={() => handleRedirect(contact.id)}
                      label="View contact"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Button
        data-cy="add-contact-button"
        className="my-4"
        label="Add a new contact"
        onClick={() => navigate(links.newContact.href)}
      />
    </div>
  );
};

export default ContactsPage;
