let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

function searchNotes(word) {
  return notes.filter((note) =>
    note.text.toLowerCase().includes(word.toLowerCase())
  );
}

function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  let longest = notes[0];

  for (const note of notes) {
    if (note.text.length > longest.text.length) {
      longest = note;
    }
  }

  return longest;
}

function countByCategory() {
  const counts = {};

  for (const note of notes) {
    if (counts[note.category] === undefined) {
      counts[note.category] = 0;
    }

    counts[note.category]++;
  }

  return counts;
}

function getSummary() {
  const counts = countByCategory();
  const word = notes.length === 1 ? "note" : "notes";

  return `${notes.length} ${word}: ${counts.personal || 0} personal, ${counts.work || 0} work, ${counts.study || 0}.`;
}

function isDuplicate(text) {
  const cleanedText = text.trim().toLowerCase();

  return notes.some(
    (note) => note.text.trim().toLowerCase() === cleanedText
  );
}

function addNote(text, category) {
  const cleanedText = text.trim();
  const validCategories = ["personal", "work", "study"];

  if (cleanedText.length < 1 || cleanedText.length > 200) {
    console.log("Note rejected: text must be 1-200 characters.");
    return false;
  }

  if (isDuplicate(cleanedText)) {
    console.log("Note rejected: duplicate note.");
    return false;
  }

  if (!validCategories.includes(category)) {
    console.log("Note rejected: invalid category.");
    return false;
  }

  const newNote = {
    id: Date.now(),
    text: cleanedText,
    category: category,
  };

  notes.push(newNote);

  console.log(`Note added: "${newNote.text}"`);
  return true;
}

console.log(searchNotes("javascript"));
// Expected: one note, "Revise JavaScript arrays"

console.log(searchNotes("pizza"));
// Expected: []

console.log(longestNote());
// Expected: "Email the project report to Grace"

console.log(countByCategory());
// Expected: { personal: 2, study: 2, work: 1 }

console.log(getSummary());
// Expected: "5 notes: 2 personal, 1 work, 2 study."

console.log(isDuplicate("  CALL MUM  "));
// Expected: true

console.log(isDuplicate("Go to the gym"));
// Expected: false

console.log(addNote("Buy vegetables", "personal"));
// Expected: true

console.log(addNote("Call mum", "personal"));
// Expected: false because it is a duplicate

console.log(addNote("Learn Python", "coding"));
// Expected: false because category is invalid

console.log(addNote("", "study"));
// Expected: false because the text is empty

console.log(notes);
// Expected: 6 notes after the successful addition