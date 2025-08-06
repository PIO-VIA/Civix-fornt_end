'use client';

import { Mail, User, Calendar, Shield } from 'lucide-react';

interface ProfilInfoProps {
  user?: {
    externalIdElecteur: string;
    username?: string;
    email?: string;
  };
}

export function ProfilInfo({ user }: ProfilInfoProps) {
  return (
    <div className="space-y-6">
      {/* Informations principales */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <User className="w-4 h-4 mr-2" />
            Nom d'utilisateur
          </label>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
            <span className="text-gray-900">
              {user?.username || 'Non défini'}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            Adresse email
          </label>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
            <span className="text-gray-900">
              {user?.email || 'Non définie'}
            </span>
          </div>
        </div>
      </div>

      {/* Identifiant électeur */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 flex items-center">
          <Shield className="w-4 h-4 mr-2" />
          Identifiant électeur
        </label>
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
          <code className="text-sm text-gray-900 font-mono">
            {user?.externalIdElecteur || 'Non disponible'}
          </code>
        </div>
      </div>

      {/* Statut du compte */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start">
          <Shield className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-green-900">
              Compte vérifié
            </h3>
            <p className="text-sm text-green-700 mt-1">
              Votre compte électeur est actif et vérifié. Vous pouvez participer aux votes.
            </p>
          </div>
        </div>
      </div>

      {/* Note d'information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Calendar className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">
              Informations importantes
            </h3>
            <ul className="text-sm text-blue-700 mt-1 space-y-1">
              <li>• Vos informations personnelles sont protégées</li>
              <li>• Votre historique de vote reste confidentiel</li>
              <li>• Contactez l'administrateur pour toute modification</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}