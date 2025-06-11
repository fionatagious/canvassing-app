import { useState, useEffect } from "react";
import { getContacts, editContactNote } from "../api/v1/contacts";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import Heading1 from "../components/Heading1";
import Paragraph from "../components/Paragraph";

type Contact = {
  id: number;
  name: string;
  email?: string;
  address?: string;
  notes?: string;
  contacted?: boolean;
  follow_up_needed?: boolean;
};

const NotesPage = () => {
  // fetch contacts from backend API and store in state
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    getContacts().then(setContacts);
  }, []);

  // inline editing notes
  const [editContactId, setEditContactId] = useState<number | null>(null);
  const [noteContent, setNoteContent] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const showTextareaWithContent = (contact: Contact) => {
    setEditContactId(contact.id);
    setNoteContent(contact.notes || "");
    setIsDisabled(true);
  };

  const handleCancelEdit = () => {
    setEditContactId(null);
    setNoteContent("");
    setIsDisabled(true);
  };

  const handleNoteChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    originalNotes: string
  ) => {
    const updatedNotes = event.target.value;
    setNoteContent(updatedNotes);
    const noteHasChanged = originalNotes !== updatedNotes;
    noteHasChanged && setIsDisabled(!noteHasChanged);
  };

  const handleSaveNote = async (contact: Contact) => {
    try {
      if (noteContent == contact.notes) {
        // no changes made to note
        setEditContactId(null);
        return;
      } else {
        setEditContactId(null);
        // save the edited note
        await editContactNote(contact.id, noteContent);
        // render the updated note in UI
        setContacts((previousContacts) =>
          previousContacts.map((c) =>
            c.id === contact.id ? { ...c, notes: noteContent } : c
          )
        );
        setNoteContent("");
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <div className="px-4 md:px-6 py-4 md:py-6">
      <Heading1 title="Canvassing notes" />
      <div className="flex bg-white rounded-md border-slate-900 border-2 px-8 py-4">
        <Paragraph>
          View, edit, and manage your notes. Click on "Edit note" button to edit
          the notes inline for that contact.
        </Paragraph>
      </div>
      <div className="overflow-x-auto mt-4">
        <table
          id="notes-table"
          className="rounded-lg overflow-hidden border-separate border-spacing-0"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Notes</th>
              <th></th>
              <th>Contacted?</th>
              <th>Follow up needed?</th>
            </tr>
          </thead>
          <tbody>
            {contacts &&
              contacts.map((contact: Contact) => (
                <tr key={contact.id}>
                  <td>
                    <span>{contact.name}</span>
                  </td>
                  <td>
                    {contact.id == editContactId ? (
                      <TextArea
                        data-cy={`note-textarea-${contact.id}`}
                        name="notes"
                        noteContent={noteContent}
                        onChange={(e) =>
                          handleNoteChange(e, contact.notes || "")
                        }
                      />
                    ) : (
                      <span>{contact.notes}</span>
                    )}
                  </td>
                  <td className="flex text-nowrap justify-center">
                    {contact.id == editContactId ? (
                      <div className="flex flex-col gap-1 py-2">
                        <Button
                          data-cy={`cancel-edit-button-${contact.id}`}
                          onClick={() => handleCancelEdit()}
                          label="Cancel edit"
                        />
                        <Button
                          data-cy={`save-note-button-${contact.id}`}
                          onClick={() => handleSaveNote(contact)}
                          label="Save note"
                          disabled={isDisabled}
                        />
                      </div>
                    ) : (
                      <Button
                        data-cy={`edit-note-button-${contact.id}`}
                        className="my-4"
                        onClick={() => showTextareaWithContent(contact)}
                        label="Edit note"
                      />
                    )}
                  </td>
                  <td>{contact.contacted ? "Yes" : "No"}</td>
                  <td>{contact.follow_up_needed ? "Yes" : "No"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotesPage;
