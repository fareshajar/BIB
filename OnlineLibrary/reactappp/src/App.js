import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./Components/login";
import SignUp from "./Components/register";
import ForgotPassword from "./Components/ForgotPassword";
import UploadBooks from "./Components/UploadBooks";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./Components/firebase";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Écouter les changements d'état d'authentification via Firebase
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser); // Si l'utilisateur est connecté
      } else {
        setUser(null); // Si l'utilisateur est déconnecté
      }
      setLoading(false); // Terminer le chargement après avoir vérifié l'état d'authentification
    });

    // Nettoyer l'écouteur à la destruction du composant
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading-screen">Chargement...</div>;
  }

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              {/* Si l'utilisateur est connecté, redirige vers UploadBooks */}
              <Route
                path="/"
                element={user ? <Navigate to="/UploadBooks" /> : <Navigate to="/login" />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route
                path="/UploadBooks"
                element={user ? <UploadBooks /> : <Navigate to="/login" />}
              />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
