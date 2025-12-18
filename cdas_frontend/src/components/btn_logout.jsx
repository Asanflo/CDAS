import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BtnDeconnexion = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Suppression du token dans le localStorage
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // Redirection vers la page d'illustration 
        navigate("/");
    };

    return (
        <button
            onClick={handleLogout}
            className="
                bg-red-500 text-white font-bold py-2 px-4 
                rounded-lg hover:bg-red-400 transition duration-300
                shadow-md flex items-center space-x-2
            "
        >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
        </button>
    );
}

export default BtnDeconnexion;