import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getToken } from "../utils/storage";
import { createNote as apiCreateNote } from "../api/notes";
import { Copy, Check } from "lucide-react";

const API_URL = process.env.REACT_APP_API_URL || "";

export default function NoteView() {
  const { id } = useParams();
  const nav = useNavigate();

  const [note, setNote] = useState(id ? null : { title: "", content: "" });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return; // new note route, nothing to fetch

    (async () => {
      const token = getToken();

      const res = await fetch(`${API_URL}/api/v1/notes/${id}`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });

      setNote(await res.json());
    })();
  }, [id]);

  const shareUrl = `${window.location.origin}/share/${id}/${note?.share_token}`;

  const handleSave = async () => {
    if (!note) return;

    if (!id) {
      // create
      const created = await apiCreateNote({ title: note.title, content: note.content });
      if (created?.id) {
        nav(`/notes/${created.id}`);
      } else {
        // show basic error (could be improved)
        alert(created?.errors?.join("\n") || "Failed to create note");
      }
    } else {
      // update - not implemented yet
      alert("Update not implemented yet");
    }
  };

  const handleCopy = async () => {
    try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // tick disappears in 2s
    } catch (err) {
        console.error("Copy failed:", err);
    }
    };

  return (
    <div className="p-6 bg-dark min-h-screen text-white">
      {note && (
        <>
          <input
            className="w-full bg-black text-white p-3 border border-gold rounded"
            value={note.title}
            placeholder="Please Type Title"
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />

          <textarea
            className="w-full bg-black text-white p-3 border border-gold rounded mt-3 h-64"
            value={note.content}
            placeholder="Please Type Notes"
            onChange={(e) => setNote({ ...note, content: e.target.value })}
          />

          <button onClick={handleSave} className="bg-gold text-black px-5 py-2 rounded mt-4">
            Save
          </button>

          {id && (
            <div className="mt-6 bg-black p-4 border border-orange rounded">
                <h3 className="text-yellow font-bold mb-2">Share Note</h3>

                <div className="flex items-start gap-3 justify-center items-center">
                <p className="text-white break-all flex-1">{shareUrl}</p>

                <button
                    onClick={handleCopy}
                    className="p-2 border border-yellow rounded hover:bg-yellow transition"
                >
                    {copied ? (
                    // Tick icon
                        <Check className="w-5 h-5 text-green-400 transition" />
                    ) : (
                    // Copy icon
                        <Copy className="w-5 h-5 transition hover:text-yellow-500" />
                    )}
                </button>
                </div>

                {copied && <p className="text-green-500 mt-2">Copied!</p>}
            </div>
            )}
        </>
      )}
    </div>
  );
}
