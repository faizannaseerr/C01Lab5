test("1+2=3, empty array is empty", () => {
  expect(1 + 2).toBe(3);
  expect([].length).toBe(0);
});

const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`);
  const getAllNotesBody = await getAllNotesRes.json();


  expect(getAllNotesRes.status).toBe(200);
  expect(getAllNotesBody.response).toHaveLength(0);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes1 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  
  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`);
  const getAllNotesBody = await getAllNotesRes.json();

  expect(getAllNotesRes.status).toBe(200);
  expect(getAllNotesBody.notes.length).toBe(2);
  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });
});

test("/deleteNote - Delete a note", async () => {
  // Assuming there is a note with a known ID to delete
  const noteIdToDelete = "noteId"; // Replace with actual ID
  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${noteIdToDelete}`, {
    method: "DELETE",
  });

  const deleteNoteBody = await deleteNoteRes.json();

  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.message).toBe("Note deleted successfully.");
});

test("/patchNote - Patch with content and title", async () => {
  const noteIdToUpdate = "noteId"; // Replace with actual ID
  const updatedTitle = "Updated Title";
  const updatedContent = "Updated Content";

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteIdToUpdate}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: updatedTitle,
      content: updatedContent,
    }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.message).toBe("Note patched successfully.");
});

test("/patchNote - Patch with just title", async () => {
  const noteIdToUpdate = "noteId"; // Replace with actual ID
  const updatedTitle = "Updated Title";

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteIdToUpdate}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: updatedTitle,
    }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.message).toBe("Note patched successfully.");
});

test("/patchNote - Patch with just content", async () => {
  const noteIdToUpdate = "noteId"; // Replace with actual ID
  const updatedContent = "Updated Content";

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteIdToUpdate}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: updatedContent,
    }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.message).toBe("Note patched successfully.");
});

test("/deleteAllNotes - Delete one note", async () => {
  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });

  const deleteAllNotesBody = await deleteAllNotesRes.json();

  expect(deleteAllNotesRes.status).toBe(200);
  expect(deleteAllNotesBody.message).toBe("All notes deleted successfully.");
});

test("/deleteAllNotes - Delete three notes", async () => {
  // Assuming there are three notes in the system
  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });

  const deleteAllNotesBody = await deleteAllNotesRes.json();

  expect(deleteAllNotesRes.status).toBe(200);
  expect(deleteAllNotesBody.message).toBe("All notes deleted successfully.");
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  const noteIdToUpdate = "noteId"; // Replace with actual ID
  const updatedColor = "#FF0000";

  const updateNoteColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${noteIdToUpdate}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      color: updatedColor,
    }),
  });

  const updateNoteColorBody = await updateNoteColorRes.json();

  expect(updateNoteColorRes.status).toBe(200);
  expect(updateNoteColorBody.message).toBe("Note color updated successfully.");
});
