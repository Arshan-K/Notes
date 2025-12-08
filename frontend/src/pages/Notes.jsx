import { useEffect, useState } from "react";
import { fetchNotes, deleteNote } from "../api/notes";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await fetchNotes();
      setNotes(data);
      setLoading(false);
    })();
  }, []);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await deleteNote(id);
      toast.success("Note deleted");
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="p-6 bg-dark min-h-screen text-white">
      <h1 className="text-gold text-3xl font-bold mb-6">Your Notes</h1>

      <Link
        to="/notes/new"
        className="bg-gold px-5 py-2 text-black rounded font-semibold hover:bg-yellow transition"
      >
        + Create New Note
      </Link>

      <div className="mt-6">
        {loading ? (
          <p className="text-gray-400">Loading notes...</p>
        ) : notes.length > 0 ? (
          notes.map((n) => (
            <Link
              to={`/notes/${n.id}`}
              key={n.id}
              className="block bg-black border border-gold rounded-xl p-4 mt-4 hover:border-yellow transition cursor-pointer"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-yellow mb-1">
                    {n.title || "Untitled Note"}
                  </h2>

                  <p className="text-gray-400 text-sm">
                    {n.content || "No content yet..."}
                  </p>
                </div>

                <button
                  onClick={(e) => handleDelete(n.id, e)}
                  className="text-red-500 hover:text-red-600 p-2"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 mt-4">No notes found.</p>
        )}
      </div>
    </div>
  );
}
