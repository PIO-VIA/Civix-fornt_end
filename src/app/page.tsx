"use client";

import { useState } from "react";
import { User, Shield, ArrowRight, Vote, Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<"voter" | "admin" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: "voter" | "admin") => {
    setSelectedRole(role);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'une connexion
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Connexion:", { role: selectedRole, email, password });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Personne votant - main mettant un bulletin dans l'urne"
          className="w-full h-full object-cover"
        />
        {/* Overlay with gradient for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-slate-900/80"></div>
        {/* Additional subtle pattern overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Animated elements for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 shadow-lg mb-6">
            <Vote className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
            CIVIX
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Plateforme de vote électronique sécurisée
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-8 relative overflow-hidden">
          {/* Card subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h2>
              <p className="text-gray-600">Accédez à votre espace sécurisé</p>
            </div>

            {/* Role Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Sélectionnez votre profil :
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleRoleSelect("voter")}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${
                    selectedRole === "voter"
                      ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 scale-105"
                      : "border-gray-200 hover:border-blue-300 text-gray-600 hover:text-gray-800 bg-white/80 hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-white"
                  }`}
                >
                  <div className={`p-3 rounded-xl transition-all duration-300 ${
                    selectedRole === "voter"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-gray-100 group-hover:bg-blue-100"
                  }`}>
                    <User className="w-6 h-6" />
                  </div>
                  <span className="font-semibold">Électeur</span>
                  <span className="text-xs text-center opacity-75">Participer aux votes</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => handleRoleSelect("admin")}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${
                    selectedRole === "admin"
                      ? "border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 scale-105"
                      : "border-gray-200 hover:border-purple-300 text-gray-600 hover:text-gray-800 bg-white/80 hover:bg-gradient-to-br hover:from-purple-50/50 hover:to-white"
                  }`}
                >
                  <div className={`p-3 rounded-xl transition-all duration-300 ${
                    selectedRole === "admin"
                      ? "bg-purple-500 text-white shadow-lg"
                      : "bg-gray-100 group-hover:bg-purple-100"
                  }`}>
                    <Shield className="w-6 h-6" />
                  </div>
                  <span className="font-semibold">Administrateur</span>
                  <span className="text-xs text-center opacity-75">Gérer les élections</span>
                </button>
              </div>
            </div>

            {/* Login Form */}
            {selectedRole && (
              <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-6">
                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Adresse e-mail
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white focus:bg-white text-gray-900 placeholder-gray-500"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white focus:bg-white text-gray-900 placeholder-gray-500"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    onClick={handleSubmit}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                      selectedRole === "voter"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
                        : "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                    } ${isLoading ? "opacity-80 cursor-not-allowed" : "transform hover:scale-105"}`}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Se connecter
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Role Description */}
                <div className={`text-center p-4 rounded-xl ${
                  selectedRole === "voter" 
                    ? "bg-blue-50 border border-blue-200" 
                    : "bg-purple-50 border border-purple-200"
                }`}>
                  <p className={`text-sm font-medium ${
                    selectedRole === "voter" ? "text-blue-800" : "text-purple-800"
                  }`}>
                    {selectedRole === "voter" && "✓ Accédez à vos bulletins de vote en toute sécurité"}
                    {selectedRole === "admin" && "✓ Gérez les élections et supervisez les candidats"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            © 2024 CIVIX - Plateforme de vote électronique sécurisée
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="text-xs text-gray-500">🔒 Chiffrement end-to-end</span>
            <span className="text-xs text-gray-500">🛡️ Conforme RGPD</span>
            <span className="text-xs text-gray-500">✅ Audit sécurité</span>
          </div>
        </div>
      </div>
    </div>
  );
}