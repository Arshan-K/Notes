import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import NoteView from "./pages/NoteView";
import NotePublic from "./pages/NotePublic";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-dark text-white">
          <Navbar />
          <ToastContainer position="top-right" autoClose={4000} />

          <Routes>
            <Route path="/" element={<Navigate to="/notes" replace />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <Notes />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notes/new"
              element={
                <ProtectedRoute>
                  <NoteView /> {/* reuse NoteView for new/edit; handle empty id/client-side */}
                </ProtectedRoute>
              }
            />

            <Route
              path="/notes/:id"
              element={
                <ProtectedRoute>
                  <NoteView />
                </ProtectedRoute>
              }
            />

            {/* Public shared view: /share/:id/:token */}
            <Route path="/share/:id/:token" element={<NotePublic />} />

            {/* fallback */}
            <Route path="*" element={<div className="p-8">Page not found</div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
