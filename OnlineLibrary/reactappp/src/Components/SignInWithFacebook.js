import React, { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { FaFacebook } from "react-icons/fa";
import { auth, facebookProvider, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignInWithFacebook() {
    const [isSigningIn, setIsSigningIn] = useState(false);
    const navigate = useNavigate();

    async function handleFacebookLogin() {
        if (isSigningIn) return;
        setIsSigningIn(true);

        try {
            // 1. Déconnexion de la session Facebook via l'API JavaScript de Facebook
            if (window.FB) {
                window.FB.logout();  // Déconnecter l'utilisateur Facebook de la session actuelle
            }

            // 2. Déconnexion de Firebase (si un utilisateur est déjà connecté)
            await signOut(auth);

            // 3. Paramètres pour forcer la fenêtre de sélection de compte
            facebookProvider.setCustomParameters({
                auth_type: "reauthenticate",  // Forcer une nouvelle authentification à chaque fois
                display: "popup",             // Utilisation d'un popup pour afficher la fenêtre de connexion
            });

            // 4. Connexion avec Facebook
            const result = await signInWithPopup(auth, facebookProvider);
            const user = result.user;

            if (user) {
                // 5. Ajout des informations utilisateur à Firestore
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email || "",
                    firstName: user.displayName || "",
                    photo: user.photoURL || "",
                });
                toast.success("Logged in with Facebook successfully!");
                navigate("/UploadBooks"); // Redirection vers le profil de l'utilisateur
            }
        } catch (error) {
            toast.error(error.message, { position: "bottom-center" });
        } finally {
            setIsSigningIn(false);
        }
    }

    return (
        <div>
            <button
                className="btn w-100 d-flex align-items-center justify-content-center"
                onClick={handleFacebookLogin}
                disabled={isSigningIn}
                style={{
                    backgroundColor: "#3b5998",
                    color: "white",
                    borderRadius: "8px",
                    padding: "10px 15px",
                    fontWeight: "600",
                    border: "none",
                    transition: "background-color 0.3s ease, transform 0.2s ease",
                    fontSize: "16px"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#2d4373"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#3b5998"}
            >
                <FaFacebook size={20} className="me-2" />
                Continue with Facebook
            </button>
        </div>
    );
}

export default SignInWithFacebook;
