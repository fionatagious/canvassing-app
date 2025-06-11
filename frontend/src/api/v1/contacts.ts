export async function getContacts(): Promise<any> {
  // Fetch contacts from the backend API
  const response = await fetch("http://localhost:3000/api/v1/contacts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching contacts: ${response.statusText}`);
  } else {
    return response.json();
  }
}

export async function getContact(id: number): Promise<any> {
  // Fetch a single contact by ID
  const response = await fetch(`http://localhost:3000/api/v1/contacts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching contact: ${response.statusText}`);
  } else {
    return response.json();
  }
}

export async function createContact(
  name: string,
  address: string,
  email: string,
  notes: string,
  contacted: boolean,
  needToFollowUp: boolean
): Promise<any> {
  // Create a new contact
  const response = await fetch("http://localhost:3000/api/v1/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contactName: name,
      contactAddress: address || null,
      contactEmail: email || null,
      contactNotes: notes || null,
      contacted: contacted,
      needToFollowUp: needToFollowUp,
    }),
  });
  if (!response.ok) {
    throw new Error(`Error creating contact: ${response.statusText}`);
  } else {
    return response.json();
  }
}

export async function editContactNote(id: number, notes: string): Promise<any> {
  // Update an existing contact
  const response = await fetch(`http://localhost:3000/api/v1/contacts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contactNotes: notes || null,
    }),
  });
  if (!response.ok) {
    throw new Error(`Error updating contact: ${response.statusText}`);
  } else {
    return response.json();
  }
}

export async function deleteContact(id: number): Promise<any> {
  // Delete a single contact by ID
  const response = await fetch(`http://localhost:3000/api/v1/contacts/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Error deleting contact: ${response.statusText}`);
  } else {
    return response.json();
  }
}
