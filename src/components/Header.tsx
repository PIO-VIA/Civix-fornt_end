"use client";

import { Vote, LogOut, User, Shield, Eye } from "lucide-react";
import React from "react";

interface HeaderProps {
  title: string;
  role: "Électeur" | "Administrateur" | "Lecteur";
  color?: "blue" | "purple" | "green";
  onLogout?: () => void;
}

export default function Header({ title, role, color = "blue", onLogout }: HeaderProps) {
  const getColorClasses = () => {
    switch (color) {
      case "blue": return "bg-blue-600";
      case "purple": return "bg-purple-600";
      case "green": return "bg-green-600";
      default: return "bg-blue-600";
    }
  };

  const getRoleIcon = () => {
    switch (role) {
      case "Électeur": return <User className="w-4 h-4" />;
      case "Administrateur": return <Shield className="w-4 h-4" />;
      case "Lecteur": return <Eye className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColorClasses()}`}>
              <Vote className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              {getRoleIcon()}
              <span>{role}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>{role === "Lecteur" ? "Retour" : "Déconnexion"}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 