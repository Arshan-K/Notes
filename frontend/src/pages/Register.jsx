import { useState, useContext } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { removeToken } from "../utils/storage";

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [error, setError] = useState("");
  const { loginUser: contextLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    removeToken();
    if (pw !== pw2) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    const data = await registerUser(name, email, pw, pw2);
    setLoading(false);
    if (data?.token) {
      contextLogin(data.token);
      toast.success("Registration successful");
      nav("/notes");
    } else {
      toast.error(data?.errors ? data.errors.join(", ") : "Registration failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-dark">
      <div className="bg-black p-8 rounded-xl shadow-xl w-96 border border-gold">
        <h1 className="text-gold text-2xl font-bold mb-6">Create account</h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <input
            className="w-full p-2 bg-dark text-black border border-gold rounded"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="w-full p-2 bg-dark text-black border border-gold rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full p-2 bg-dark text-black border border-gold rounded"
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full p-2 bg-dark text-black border border-gold rounded"
            placeholder="Confirm password"
            value={pw2}
            onChange={(e) => setPw2(e.target.value)}
            required
          />

          {error && <p className="text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-black font-semibold p-3 rounded-lg mt-6 
                      hover:bg-yellow transition flex items-center justify-center 
                      disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
