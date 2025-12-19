import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  UserPlus,
  Phone,
  MailPlus,
} from "lucide-react";

// appel du service
import { registerUser } from "../services/inscripService";

export default function Register() {
  const [name, setName] = useState("");
  const [numero, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    
    // donnees envoyes
    const payload = {
      nom: name,
      email: email,
      telephone: numero,
      password: password,
    };

    try {
      const response = await registerUser(payload);
      console.log("inscription reussie"), response;

      alert("compte cree avec succes");
      navigate("/login");
    } catch (error) {
      console.error("Erreur inscription :", error);

      alert(
        error.response?.data?.detail ||
        "Erreur lors de la création du compte"
      );
    }
  };

  // Boutons OAuth (à intégrer à ton backend plus tard)
  const signUpWithGoogle = () => {
    console.log("Créer le compte avec Google");
  };

  // const signUpWithYahoo = () => {
  //   console.log("Créer le compte avec Yahoo");
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 from-gray-100 via-gray-200 to-gray-300 p-4">
      <div className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-4 w-full max-w-md border border-white/30">

        {/* Titre */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Créer un compte
        </h1>
      
        {/* Boutons OAuth */}
        <div className="space-y-3 mb-8">
          <button
            onClick={signUpWithGoogle}
            className="w-full flex items-center justify-center gap-3 py-2 border border-gray-300 rounded-xl bg-white hover:bg-gray-100 transition font-medium"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continuer avec Google
          </button>

          {/* <button
            onClick={signUpWithYahoo}
            className="w-full flex items-center justify-center gap-3 py-2 border border-gray-300 rounded-xl bg-white hover:bg-gray-100 transition font-medium"
          >
            <img
              src="https://www.svgrepo.com/show/448228/yahoo.svg"
              alt="yahoo"
              className="w-5 h-5"
            />
            Continuer avec Yahoo
          </button> */}
        </div>

        {/* Séparateur */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">
            ou créer un compte avec email
          </span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Formulaire principal */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Nom */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-2 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        
          {/* Numero de telephone */}
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Numero de telephone"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-2 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-2 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-12 pr-12 py-2 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full pl-12 pr-12 py-2 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Bouton inscription */}
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
          >
            <UserPlus size={20} />
            S'inscrire
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Déjà un compte ?
          <a href="/login" className="text-indigo-600 font-medium hover:underline ml-1">
            Se connecter
          </a>
        </p>

      </div>
    </div>
  );
}
