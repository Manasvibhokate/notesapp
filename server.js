const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "notes.json";

// read notes
const readNotes = () => {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE));
};

// write notes
const writeNotes = (data) => {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
};

// GET
app.get("/api/notes", (req, res) => {
  res.json(readNotes());
});

// POST
app.post("/api/notes", (req, res) => {
  const notes = readNotes();
  const newNote = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content
  };
  notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
});

// DELETE
app.delete("/api/notes/:id", (req, res) => {
  let notes = readNotes();
  notes = notes.filter(n => n.id != req.params.id);
  writeNotes(notes);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
