"use client";

import { useState } from "react";
import { User, Shield, ArrowRight, Vote, Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle } from "lucide-react";

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<"voter" | "admin" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isValid: false
  });

  const handleRoleSelect = (role: "voter" | "admin") => {
    setSelectedRole(role);
  };

  const validatePassword = (pwd: string) => {
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    const isValid = hasUppercase && hasNumber && hasSpecialChar && pwd.length >= 8;
    
    setPasswordValidation({
      hasUppercase,
      hasNumber,
      hasSpecialChar,
      isValid
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordValidation.isValid && password.length > 0) {
      alert("Le mot de passe ne respecte pas les critères de sécurité");
      return;
    }
    
    setIsLoading(true);
    
    // Simulation d'une connexion
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Connexion:", { role: selectedRole, email, password });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 font-inter">
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

      <div className="relative z-10 w-full max-w-md">
        {/* Header - Compact */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 shadow-lg mb-4">
            <Vote className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2 tracking-tight">
            CIVIX
          </h1>
          <p className="text-lg text-gray-300 font-light">
            Vote électronique sécurisé
          </p>
        </div>

        {/* Main Card - Compact */}
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-6 relative overflow-hidden">
          {/* Card subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">Connexion</h2>
              <p className="text-gray-600 text-sm">Accédez à votre espace sécurisé</p>
            </div>

            {/* Role Selection - Compact Toggle */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                Sélectionnez votre profil
              </label>
              
              {/* Compact Toggle Switch */}
              <div className="flex items-center justify-center mb-4">
                <div className="relative bg-gray-100 rounded-full p-1 w-72">
                  <div 
                    className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-full shadow-lg transition-all duration-300 ${
                      selectedRole === "admin" ? "translate-x-full" : "translate-x-0"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRoleSelect("voter")}
                    className={`relative z-10 w-1/2 py-2.5 px-4 rounded-full font-semibold transition-all duration-300 text-sm ${
                      selectedRole === "voter"
                        ? "text-blue-700"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Électeur
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleSelect("admin")}
                    className={`relative z-10 w-1/2 py-2.5 px-4 rounded-full font-semibold transition-all duration-300 text-sm ${
                      selectedRole === "admin"
                        ? "text-purple-700"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Administrateur
                  </button>
                </div>
              </div>

              {/* Compact Role Description */}
              {selectedRole && (
                <div className="animate-in slide-in-from-bottom-2 duration-300">
                  <div className={`p-3 rounded-xl border transition-all duration-300 ${
                    selectedRole === "voter"
                      ? "border-blue-200 bg-blue-50/80"
                      : "border-purple-200 bg-purple-50/80"
                  }`}>
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${
                        selectedRole === "voter"
                          ? "bg-blue-500 text-white"
                          : "bg-purple-500 text-white"
                      }`}>
                        {selectedRole === "voter" ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Shield className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <h3 className={`font-semibold text-sm ${
                          selectedRole === "voter" ? "text-blue-800" : "text-purple-800"
                        }`}>
                          {selectedRole === "voter" ? "Espace Électeur" : "Espace Administrateur"}
                        </h3>
                        <p className={`text-xs ${
                          selectedRole === "voter" ? "text-blue-600" : "text-purple-600"
                        }`}>
                          {selectedRole === "voter" 
                            ? "Participez aux votes" 
                            : "Gérez les élections"
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Login Form - Compact */}
            {selectedRole && (
              <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Adresse e-mail
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white focus:bg-white text-gray-900 placeholder-gray-500 text-sm"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white focus:bg-white text-gray-900 placeholder-gray-500 text-sm ${
                          password && !passwordValidation.isValid 
                            ? "border-red-300 focus:ring-red-500" 
                            : password && passwordValidation.isValid
                            ? "border-green-300 focus:ring-green-500"
                            : "border-gray-300 focus:ring-blue-500"
                        }`}
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    {/* Password Validation */}
                    {password && (
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          {passwordValidation.hasUppercase ? (
                            <CheckCircle className="w-3 h-3 text-green-500" />
                          ) : (
                            <AlertCircle className="w-3 h-3 text-red-500" />
                          )}
                          <span className={passwordValidation.hasUppercase ? "text-green-600" : "text-red-600"}>
                            Une majuscule
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          {passwordValidation.hasNumber ? (
                            <CheckCircle className="w-3 h-3 text-green-500" />
                          ) : (
                            <AlertCircle className="w-3 h-3 text-red-500" />
                          )}
                          <span className={passwordValidation.hasNumber ? "text-green-600" : "text-red-600"}>
                            Un chiffre
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          {passwordValidation.hasSpecialChar ? (
                            <CheckCircle className="w-3 h-3 text-green-500" />
                          ) : (
                            <AlertCircle className="w-3 h-3 text-red-500" />
                          )}
                          <span className={passwordValidation.hasSpecialChar ? "text-green-600" : "text-red-600"}>
                            Un caractère spécial (!@#$%...)
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          {password.length >= 8 ? (
                            <CheckCircle className="w-3 h-3 text-green-500" />
                          ) : (
                            <AlertCircle className="w-3 h-3 text-red-500" />
                          )}
                          <span className={password.length >= 8 ? "text-green-600" : "text-red-600"}>
                            Minimum 8 caractères
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || (password.length > 0 && !passwordValidation.isValid)}
                    onClick={handleSubmit}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm ${
                      selectedRole === "voter"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
                        : "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                    } ${isLoading || (password.length > 0 && !passwordValidation.isValid) ? "opacity-50 cursor-not-allowed" : "transform hover:scale-105"}`}
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Se connecter
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Role Description */}
                <div className="mt-3">
                  <div className={`text-center p-2 rounded-lg text-xs ${
                    selectedRole === "voter" 
                      ? "bg-blue-50/50 text-blue-700" 
                      : "bg-purple-50/50 text-purple-700"
                  }`}>
                    {selectedRole === "voter" && "🗳️ Interface optimisée pour les électeurs"}
                    {selectedRole === "admin" && "⚙️ Outils de gestion avancés"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer - Compact */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-400 mb-2">
            © 2025 CIVIX - Vote électronique sécurisé
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-xs text-gray-500">🔒 Chiffré</span>
            <span className="text-xs text-gray-500">🛡️ RGPD</span>
            <span className="text-xs text-gray-500">✅ Audité</span>
          </div>
        </div>
      </div>
    </div>
  );
}