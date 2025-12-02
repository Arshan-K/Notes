import { useState, useContext } from "react";
import { loginUser as apiLogin } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const { loginUser: contextLogin } = useContext(AuthContext);

  const handleLogin = async () => {
    const data = await apiLogin(email, pw);
    if (data?.token) {
      // save token in context storage and mark logged in
      contextLogin(data.token);
      nav("/notes");
    } else {
      setError(data?.errors?.[0] || data?.error || "Invalid Credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-dark">
      <div className="bg-black p-8 rounded-xl shadow-xl w-96">
        <h1 className="text-gold text-2xl font-bold mb-6">Login</h1>

        <input
          className="w-full p-2 mb-3 bg-dark text-black border border-gold rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 bg-dark text-black border border-gold rounded"
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />

        {error && <p className="text-red-400 mb-2">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-gold text-black font-semibold p-2 rounded hover:bg-yellow"
        >
          Login
        </button>
      </div>
    </div>
  );
}
