'use client';

import { Mail, Phone, MapPin, Vote, Home, Users, FileText } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-blue-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Section 1: Application + Description + Réseaux sociaux */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <Vote className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">CIVIX</h3>
              </div>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Plateforme démocratique participative moderne et sécurisée pour exercer vos droits civiques en toute simplicité.
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
              {/*  <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.72 13.73 3.72 12.449s.478-2.446 1.406-3.242c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.796 1.406 1.961 1.406 3.242s-.478 2.446-1.406 3.242c-.875.807-2.026 1.297-3.323 1.297z"/>
                  </svg>
                </a>
                <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>*/}
              </div>
            </div>

            {/* Section 2: Navigation rapide */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold text-white mb-6">Navigation rapide</h4>
              <nav className="space-y-3">
                <Link href="/" className="flex items-center justify-center md:justify-start space-x-2 text-blue-100 hover:text-white transition-colors">
                  <Home className="w-4 h-4" />
                  <span>Accueil</span>
                </Link>
                <Link href="/elections" className="flex items-center justify-center md:justify-start space-x-2 text-blue-100 hover:text-white transition-colors">
                  <Vote className="w-4 h-4" />
                  <span>Élections</span>
                </Link>
                <Link href="/candidats" className="flex items-center justify-center md:justify-start space-x-2 text-blue-100 hover:text-white transition-colors">
                  <Users className="w-4 h-4" />
                  <span>Candidats</span>
                </Link>
                <Link href="/campagnes" className="flex items-center justify-center md:justify-start space-x-2 text-blue-100 hover:text-white transition-colors">
                  <FileText className="w-4 h-4" />
                  <span>Campagnes</span>
                </Link>
                <Link href="/resultats" className="flex items-center justify-center md:justify-start space-x-2 text-blue-100 hover:text-white transition-colors">
                  <FileText className="w-4 h-4" />
                  <span>Résultats</span>
                </Link>
              </nav>
            </div>

            {/* Section 3: Contacts */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold text-white mb-6">Contactez-nous</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-blue-100 text-sm">Email</p>
                    <a 
                      href="mailto:piodjiele@gmail.com" 
                      className="text-white hover:text-blue-200 transition-colors font-medium"
                    >
                      piodjiele@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-blue-100 text-sm">Téléphone</p>
                    <p className="text-white font-medium">+237 653 86 82 14</p>
                  </div>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-blue-100 text-sm">Adresse</p>
                    <p className="text-white font-medium">Yaounde, Cameroun</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-500 pt-6 pb-6">
          <div className="text-center">
            <p className="text-blue-100">
              © 2025 <span className="font-bold text-white">CIVIX</span>. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}