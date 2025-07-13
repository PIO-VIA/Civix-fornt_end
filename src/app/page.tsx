"use client";

import { useState } from "react";
import Image from "next/image";
import { User, Shield, ArrowRight, Vote } from "lucide-react";

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<"voter" | "admin" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRoleSelect = (role: "voter" | "admin") => {
    setSelectedRole(role);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Connexion:", { role: selectedRole, email, password });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <Image
        src="/assets/vote.jpeg"
        alt="Vote électronique"
        fill
        className="object-cover"
        priority
      />
      
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Vote className="w-16 h-16 mx-auto mb-4 text-white" />
          <h1 className="text-4xl font-bold text-white mb-2">CIVIX</h1>
          <p className="text-xl text-white/90">Plateforme de vote électronique sécurisée</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Connexion</h2>
            <p className="text-gray-700">Choisissez votre rôle et connectez-vous</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Je suis un :
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleRoleSelect("voter")}
                className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                  selectedRole === "voter"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800 bg-white/80"
                }`}
              >
                <User className="w-6 h-6" />
                <span className="font-medium">Électeur</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect("admin")}
                className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                  selectedRole === "admin"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800 bg-white/80"
                }`}
              >
                <Shield className="w-6 h-6" />
                <span className="font-medium">Administrateur</span>
              </button>
            </div>
          </div>

          {selectedRole && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white/90 backdrop-blur-sm"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white/90 backdrop-blur-sm"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
              >
                Se connecter
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {selectedRole === "voter" && "Accédez à vos bulletins de vote"}
              {selectedRole === "admin" && "Gérez les élections et les candidats"}
              {!selectedRole && "Sélectionnez votre rôle pour continuer"}
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-white/80">
            © 2024 CIVIX - Plateforme de vote électronique sécurisée
          </p>
        </div>
      </div>
    </div>
  );
}
