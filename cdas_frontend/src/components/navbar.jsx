import React from "react";
import { GraduationCap, LogIn } from "lucide-react";

import BtnDeconnexion from "./btn_logout";

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
               
               {/* Zone de boutons et liens */}
                <div className="flex items-center space-x-4">
                    {/* Exemple : bouton de connexion */}
                    {/* <LogInButton /> */}

                    {/* Bouton de déconnexion */}
                    <BtnDeconnexion />
                </div>
            </div>
        </nav>
    );
}
 export default NavBar;