import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LogIn, UserPlus, GraduationCap } from "lucide-react";

export default function Intro () {
    const FullText = "Bienvenue sur votre plateforme de vérification et authentification des diplômes. Sécurisez, validez et certifiez vos documents académiques en un clic.";

    const [index, setIndex] = useState (0);
    const [displayedText, setDisplayedText] = useState("");

    // Animation machine a ecrire
    useEffect(() => {
        if (index < FullText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + FullText[index]);
                setIndex(index +1);
            }, 25);

            return () => clearTimeout(timeout);
        }
    }, [index]);

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center 
        bg-linear-to-br from-indigo-600 via-indigo-700 to-indigo-900 p-8 text-white">
            
            {/* illustration */}
            <div className="w-full md:w-1/2 pr-2 flex items-center justify-center md:mb-0 relative">
                <img
                src="image_illustration.jpg"
                alt="Illustration diplômes"
                className="rounded-3xl shadow-2xl drop-shadow-2xl w-full
                    h-full object-cover"
                />
            </div>

            {/* Texte + Boutons */}
            <div className="w-full md:w-1/2 space-y-6">
                <h1 className="text-3xl md:text-4xl font font-extrabold leading-tight text-center">
                    Cameroon Diplomas Authentication System
                </h1>
                <GraduationCap className="w-auto h-20 text-amber-400 mx-auto"/>
                <p className="text-lg text-gray-200 min-h-[100] border-l-4 border-white/40 pl-4">
                   {displayedText}
                   {index < FullText.length && (
                      <span className="animate-pulse">|</span>
                    )}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 ml-5">

                    {/* Bouton de connexion */}
                    <Link to="/login"
                        className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl
                        shadow-lg hover:bg-amber-400 hover:text-amber-50 transition flex items-center gap-2">
                            <LogIn size={20}/> Se Connecter
                    </Link>

                    {/* Bouton d'inscription */}
                    <Link to="/register"
                        className="px-6 py-3 bg-indigo-500  font-semibold rounded-xl
                        shadow-lg hover:bg-indigo-400 transition flex items-center gap-2">
                            <UserPlus size={20}/> S'inscrire
                    </Link>

                </div>

            </div>
        </div>
    );
}