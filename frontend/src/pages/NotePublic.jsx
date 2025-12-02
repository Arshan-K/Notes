import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NotePublic() {
  const { id, token } = useParams();
  const [note, setNote] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL || "";
  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_URL}/api/v1/share/${id}/${token}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      setNote(await res.json());
    })();
  }, [id, token]);

  if (!note) return null;

  return (
    <div className="p-6 bg-dark min-h-screen text-white">
      <h1 className="text-gold text-2xl">{note.title}</h1>

      <p className="bg-black p-4 mt-4 border border-yellow rounded whitespace-pre-wrap">
        {note.content}
      </p>

      <p className="text-gray-400 mt-2">View-only access</p>
    </div>
  );
}
