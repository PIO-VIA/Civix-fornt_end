"use client";

import { Vote, LogOut, User, Shield } from "lucide-react";
import React from "react";

interface HeaderProps {
  title: string;
  role: "Électeur" | "Administrateur";
  color?: "blue" | "purple";
  onLogout?: () => void;
}

export default function Header({ title, role, color = "blue", onLogout }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color === "blue" ? "bg-blue-600" : "bg-purple-600"}`}>
              <Vote className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              {role === "Électeur" ? <User className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
              <span>{role}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 