"use client";

import { useState, useEffect } from "react";
import { User, Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LoginRequest } from "@/lib/models/LoginRequest";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isValid: false
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading, user } = useAuth();
  
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    motDePasse: "",
  });

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated && user && !authLoading) {
      switch (user.role) {
        case 'electeur':
          router.push('/voter');
          break;
        case 'admin':
        case 'administrateur':
          router.push('/admin');
          break;
        case 'lecteur':
          router.push('/reader');
          break;
        default:
          router.push('/profile');
          break;
      }
    }
  }, [isAuthenticated, user, authLoading, router]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "motDePasse") validatePassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordValidation.isValid && formData.motDePasse.length > 0) {
      setError("Le mot de passe ne respecte pas les critères de sécurité");
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    try {
      const response = await login(formData, "electeur");
      
      // Gestion de la première connexion
      if (response.premierConnexion) {
        console.log("Première connexion détectée");
        // TODO: Rediriger vers une page de changement de mot de passe
      }
      
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setError("Identifiants invalides ou erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  // Afficher un loader pendant l'initialisation de l'auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 shadow-lg mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="w-8 h-8 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="relative flex items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 shadow-lg mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Connexion Électeur
            </h1>
            <p className="text-gray-600">
              Accédez à votre espace de vote sécurisé
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8 relative overflow-hidden">
            {/* Card gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
            
            <div className="relative z-10">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-sm text-red-700">{error}</span>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Adresse e-mail
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white focus:bg-white text-gray-900 placeholder-gray-500"
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
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="motDePasse"
                      value={formData.motDePasse}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white focus:bg-white text-gray-900 placeholder-gray-500 ${
                        formData.motDePasse && !passwordValidation.isValid 
                          ? "border-red-300 focus:ring-red-500" 
                          : formData.motDePasse && passwordValidation.isValid
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
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Validation */}
                  {formData.motDePasse && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        {passwordValidation.hasUppercase ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className={passwordValidation.hasUppercase ? "text-green-600" : "text-red-600"}>
                          Une majuscule
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {passwordValidation.hasNumber ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className={passwordValidation.hasNumber ? "text-green-600" : "text-red-600"}>
                          Un chiffre
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {passwordValidation.hasSpecialChar ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className={passwordValidation.hasSpecialChar ? "text-green-600" : "text-red-600"}>
                          Un caractère spécial (!@#$%...)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {formData.motDePasse.length >= 8 ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className={formData.motDePasse.length >= 8 ? "text-green-600" : "text-red-600"}>
                          Minimum 8 caractères
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || (formData.motDePasse.length > 0 && !passwordValidation.isValid)}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl ${
                    isLoading || (formData.motDePasse.length > 0 && !passwordValidation.isValid) 
                      ? "opacity-50 cursor-not-allowed" 
                      : "transform hover:scale-105"
                  }`}
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
              </form>

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <div className="bg-blue-50/80 rounded-lg p-4 text-sm text-blue-700">
                  <User className="w-5 h-5 mx-auto mb-2" />
                  Espace dédié aux électeurs pour participer aux votes
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 mb-2">
              Première fois sur CIVIX ?
            </p>
            <p className="text-xs text-gray-400">
              Contactez votre administrateur pour obtenir vos identifiants
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}