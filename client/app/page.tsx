"use client";
import { useState, useEffect } from "react";

const API = "https://notes-api-6ckc.onrender.com/api/notes";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState<any[]>([]);

  // Fetch notes
  const fetchNotes = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add note
  const addNote = async () => {
    if (!title || !content) return;

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    setTitle("");
    setContent("");
    fetchNotes();
  };

  // Delete note
  const deleteNote = async (id: number) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white p-10">
      <h1 className="text-4xl font-bold mb-6 text-cyan-400">
        Quick Notes App 📝
      </h1>

      <div className="bg-slate-800 p-4 rounded-lg mb-6">
        <input
          className="w-full p-2 mb-3 rounded bg-slate-700"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 mb-3 rounded bg-slate-700"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={addNote}
          className="bg-cyan-500 px-4 py-2 rounded hover:bg-cyan-600"
        >
          Add Note
        </button>
      </div>

      <div className="grid gap-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-slate-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{note.title}</h2>
            <p className="mb-3">{note.content}</p>
            <button
              onClick={() => deleteNote(note.id)}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
