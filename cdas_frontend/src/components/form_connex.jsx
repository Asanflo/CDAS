import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn, GraduationCap } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Mot de passe:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 from-gray-100 via-gray-200 to-gray-300 p-4">
      <div className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-full max-w-md border border-white/30">

        {/* Titre */}
        <GraduationCap className="w-auto h-20 text-amber-400 mx-auto"/>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Bienvenue 👋
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Connecte-toi pour continuer
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="email"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Mot de passe */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Icône show/hide password */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Bouton de connexion */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
          >
            <LogIn size={20} />
            Se connecter
          </button>

        </form>

        {/* Lien inscription */}
        <p className="text-center text-gray-600 mt-6">
          Pas de compte ?
          <a href="/register" className="text-indigo-600 font-medium hover:underline ml-1">
            S’inscrire
          </a>
        </p>
      </div>
    </div>
  );
}
