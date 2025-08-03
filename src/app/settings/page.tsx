"use client";

import { useState, useEffect } from "react";
import { Shield, Bell, Globe, Lock, Moon, Sun, Monitor, ChevronRight, Key } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

type Theme = 'light' | 'dark' | 'system';
type Language = 'fr' | 'en';

export default function SettingsPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  const [theme, setTheme] = useState<Theme>('system');
  const [language, setLanguage] = useState<Language>('fr');
  const [notifications, setNotifications] = useState({
    email: true,
    election: true,
    results: false,
    maintenance: true
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    // TODO: Implémenter la logique de changement de thème
    localStorage.setItem('theme', newTheme);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    // TODO: Implémenter la logique de changement de langue
    localStorage.setItem('language', newLanguage);
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres</h1>
          <p className="text-gray-600">Personnalisez votre expérience CIVIX</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Appearance Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-blue-600" />
                Apparence
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Thème
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => handleThemeChange('light')}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                        theme === 'light' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Sun className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium">Clair</span>
                    </button>
                    
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                        theme === 'dark' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Moon className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium">Sombre</span>
                    </button>
                    
                    <button
                      onClick={() => handleThemeChange('system')}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                        theme === 'system' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Monitor className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium">Système</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Language Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Langue et région
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Langue de l'interface
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleLanguageChange('fr')}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center gap-3 ${
                        language === 'fr' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-lg">🇫🇷</span>
                      <span className="font-medium">Français</span>
                    </button>
                    
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center gap-3 ${
                        language === 'en' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-lg">🇺🇸</span>
                      <span className="font-medium">English</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                Notifications
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="font-medium text-gray-900">Notifications par e-mail</h3>
                    <p className="text-sm text-gray-600">Recevoir les notifications importantes par e-mail</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={() => handleNotificationChange('email')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="font-medium text-gray-900">Nouvelles élections</h3>
                    <p className="text-sm text-gray-600">Être notifié des nouvelles élections disponibles</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.election}
                      onChange={() => handleNotificationChange('election')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="font-medium text-gray-900">Résultats d'élections</h3>
                    <p className="text-sm text-gray-600">Recevoir les résultats des élections auxquelles vous avez participé</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.results}
                      onChange={() => handleNotificationChange('results')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="font-medium text-gray-900">Maintenance du système</h3>
                    <p className="text-sm text-gray-600">Informations sur les maintenances programmées</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.maintenance}
                      onChange={() => handleNotificationChange('maintenance')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                Sécurité
              </h2>
              
              <div className="space-y-4">
                <Link 
                  href="/profile"
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-900">
                        Changer le mot de passe
                      </h3>
                      <p className="text-sm text-gray-600">
                        Modifier votre mot de passe actuel
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Admin Access */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200 p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Accès Administrateur
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Accédez aux outils d'administration pour gérer les élections et les utilisateurs
                </p>
                <Link
                  href="/admin-login"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Shield className="w-5 h-5" />
                  Admin
                </Link>
              </div>
            </div>

            {/* Current User Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compte actuel</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {user.nom || user.email?.split('@')[0] || 'Utilisateur'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {user.role === 'electeur' ? 'Électeur' : user.role === 'admin' ? 'Administrateur' : user.role}
                    </div>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    <div className="flex justify-between mb-1">
                      <span>E-mail:</span>
                      <span className="font-medium">{user.email}</span>
                    </div>
                    {user.dateCreation && (
                      <div className="flex justify-between">
                        <span>Membre depuis:</span>
                        <span className="font-medium">
                          {new Date(user.dateCreation).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Help & Support */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Aide & Support</h3>
              <div className="space-y-3 text-sm">
                <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">
                  Centre d'aide
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">
                  Contacter le support
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">
                  Signaler un problème
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">
                  Conditions d'utilisation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}