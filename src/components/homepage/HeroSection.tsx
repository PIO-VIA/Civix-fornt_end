"use client";

import { Vote, Users, BarChart3, Shield } from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  stats?: {
    totalElections?: number;
    totalVotes?: number;
    totalUsers?: number;
  };
}

export default function HeroSection({ stats }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Hero Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Vote électronique
            </span>
            <br />
            <span className="text-gray-900">sécurisé et transparent</span>
          </h1>
          
          {/* Hero Description */}
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Participez aux élections de manière sécurisée avec CIVIX, 
            la plateforme de vote électronique nouvelle génération.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/login"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
            >
              Commencer à voter
            </Link>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300 font-semibold">
              En savoir plus
            </button>
          </div>
          
          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50">
                <div className="flex items-center justify-center mb-3">
                  <Vote className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stats.totalElections?.toLocaleString() || '0'}
                </div>
                <div className="text-gray-600">Élections organisées</div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50">
                <div className="flex items-center justify-center mb-3">
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stats.totalVotes?.toLocaleString() || '0'}
                </div>
                <div className="text-gray-600">Votes exprimés</div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50">
                <div className="flex items-center justify-center mb-3">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stats.totalUsers?.toLocaleString() || '0'}
                </div>
                <div className="text-gray-600">Électeurs inscrits</div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Security Badges */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Chiffrement SSL</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Conforme RGPD</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Audité et certifié</span>
          </div>
        </div>
      </div>
    </section>
  );
}