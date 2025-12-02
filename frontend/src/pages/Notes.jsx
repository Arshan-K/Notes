import { useEffect, useState } from "react";
import { fetchNotes } from "../api/notes";
import { Link } from "react-router-dom";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchNotes();
      setNotes(data);
    })();
  }, []);

  return (
    <div className="p-6 bg-dark min-h-screen text-white">
      <h1 className="text-gold text-3xl font-bold mb-4">Your Notes</h1>

      <Link to="/notes/new" className="bg-gold px-4 py-2 text-black rounded">
        New Note
      </Link>

      <div className="mt-6">
        {notes?.length > 0 ? (
            notes.map((n) => (
                <Link
                    to={`/notes/${n.id}`}
                    key={n.id}
                    className="block bg-black p-4 mt-3 border border-gold rounded"
                >
                    <h2 className="text-lg text-yellow">{n.title}</h2>
                    <p className="text-gray-400">{n.preview_text}</p>
                </Link>
            ))
            ) : (
            <p className="text-gray-500 mt-4">No notes found.</p>
        )}
      </div>
    </div>
  );
}
