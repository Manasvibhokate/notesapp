const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const FILE = "notes.json";

/* ---------------- ROOT ROUTE (VERY IMPORTANT) ---------------- */
app.get("/", (req, res) => {
  res.send("Notes API Running 🚀");
});

/* ---------------- FUNCTIONS ---------------- */

const readNotes = () => {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE));
};

const writeNotes = (data) => {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
};

/* ---------------- API ROUTES ---------------- */

// GET all notes
app.get("/api/notes", (req, res) => {
  res.json(readNotes());
});

// ADD note
app.post("/api/notes", (req, res) => {
  const notes = readNotes();

  const newNote = {
    id: Date.now(),
    title: req.body.title || "No title",
    content: req.body.content || ""
  };

  notes.push(newNote);
  writeNotes(notes);

  res.json(newNote);
});

// DELETE note
app.delete("/api/notes/:id", (req, res) => {
  let notes = readNotes();
  notes = notes.filter(n => n.id != req.params.id);
  writeNotes(notes);

  res.json({ message: "Deleted successfully" });
});

/* ---------------- START SERVER ---------------- */

app.listen(PORT, () => console.log("Server running on port " + PORT));
