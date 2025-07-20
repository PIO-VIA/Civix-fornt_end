"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="relative mt-12 bg-white border-t border-gray-200 text-gray-800 py-8 px-4 shadow-sm">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo et titre */}
        <div className="flex items-center gap-4 mb-6 md:mb-0">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center shadow">
            <span className="text-3xl font-bold text-blue-600">🗳️</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">CIVIX</h2>
            <p className="text-sm text-gray-500">Vote électronique sécurisé</p>
          </div>
        </div>
        {/* Mentions et badges */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex gap-3 mb-2">
            <span className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 text-gray-700">
              <span className="text-lg">🔒</span> Chiffré
            </span>
            <span className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 text-gray-700">
              <span className="text-lg">🛡️</span> RGPD
            </span>
            <span className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 text-gray-700">
              <span className="text-lg">✅</span> Audité
            </span>
          </div>
          <p className="text-xs text-gray-400">© 2025 CIVIX - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
} 