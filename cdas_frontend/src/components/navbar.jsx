import React from "react";
import { GraduationCap, LogIn } from "lucide-react";

const NavBar = () => {
    const primaryColor = 'bg-indigo-800';
    const secondaryColor = 'text-amber-400';
    const textColor = 'text-white';

    return(
        <nav className={`${primaryColor} p-4 shadow-lg`}>
            <div className="conrainer mx-auto flex justify-between items-center">

                <a href="/" className={`text-2xl font-bold ${textColor} tracking-wider flex items-center`}>
                    {/* Remplacement du <span>🎓</span> par l'icône GraduationCap */}
                    <GraduationCap className={`w-8 h-8 ${secondaryColor} mr-3`} /> 
                    <span className="hidden sm:inline">CDAS Diplomas</span>
                    <span className="sm:hidden">CDAS</span>
                </a>
                {/* Liens de Navigation */}
        <div className="flex items-center space-x-6">
            
            {/* Lien de Vérification Publique */}
            {/* <a 
                href="#verification" 
                className={`font-semibold ${textColor} hover:${secondaryColor} transition duration-300 hidden md:inline`}
            >
                Vérifier un Diplôme
            </a> */}
            
            {/* Bouton de Connexion Administrateur */}
            {/* <button
                onClick={() => console.log("Redirection vers la page de connexion Admin")}
                className={`
                bg-amber-500 
                text-indigo-800 
                font-bold 
                py-2 
                px-4 
                rounded-lg 
                hover:bg-amber-400 
                transition 
                duration-300
                shadow-md
                flex items-center space-x-2
                `}
            >
                {/* Ajout de l'icône LogIn */}
              {/*  <LogIn className="w-5 h-5" /> 
                <span>Connexion Admin</span>
            </button> */}
            
            </div>
            </div>
        </nav>
    );
}
 export default NavBar;