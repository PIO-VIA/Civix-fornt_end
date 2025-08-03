"use client";

import { Vote } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 shadow-lg mb-6">
          <Vote className="w-8 h-8 text-white animate-pulse" />
        </div>
        
        <div className="relative mb-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Chargement...
        </h2>
        <p className="text-gray-600">
          Préparation des données électorales
        </p>
      </div>
    </div>
  );
}