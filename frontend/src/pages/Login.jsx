import { useState, useContext } from "react";
import { loginUser as apiLogin } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { removeToken } from "../utils/storage";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginUser: contextLogin } = useContext(AuthContext);

  const handleLogin = async () => {
    setLoading(true);
    removeToken();
    setError("");

    const data = await apiLogin(email, pw);

    if (data?.token) {
      contextLogin(data.token);
      toast.success("Logged in successfully!");
      nav("/notes");
    } else {
      setError(data?.errors?.[0] || data?.error || "Invalid Credentials");
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-dark">
      <div className="bg-black p-8 rounded-2xl shadow-2xl w-96 border border-gold/30">
        <h1 className="text-gold text-3xl font-bold mb-6 text-center tracking-wide">
          Welcome Back
        </h1>

        <div className="space-y-4">
          <input
            className="w-full p-3 bg-dark text-black border border-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
            placeholder="Email or Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-3 bg-dark text-black border border-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />

          {error && (
            <p className="text-red-400 text-sm font-medium">{error}</p>
          )}
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gold text-black font-semibold p-3 rounded-lg mt-6 
                     hover:bg-yellow transition flex items-center justify-center 
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </div>
    </div>
  );
}
