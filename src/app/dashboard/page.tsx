"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Vote, Shield, Eye } from "lucide-react";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Si pas connecté, rediriger vers login
        router.push('/');
        return;
      }

      if (user) {
        // Rediriger selon le rôle
        switch (user.role) {
          case 'electeur':
            router.push('/voter');
            break;
          case 'admin':
            router.push('/admin');
            break;
          case 'lecteur':
            router.push('/reader');
            break;
          default:
            // Rôle inconnu, rediriger vers login
            router.push('/');
            break;
        }
      }
    }
  }, [user, isAuthenticated, isLoading, router]);

  // Afficher un loader pendant la redirection
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-slate-900/80 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 shadow-lg mb-4">
          <Vote className="w-8 h-8 text-white" />
        </div>
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-bold text-white mb-2">Redirection en cours...</h2>
        <p className="text-gray-300">
          {isLoading ? "Vérification de votre session..." : 
           !isAuthenticated ? "Redirection vers la page de connexion..." :
           user ? `Redirection vers votre espace ${
             user.role === 'electeur' ? 'électeur' :
             user.role === 'admin' ? 'administrateur' :
             user.role === 'lecteur' ? 'lecteur' : 'utilisateur'
           }...` : "Redirection..."}
        </p>
        
        {user && (
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              {user.role === 'electeur' && <Vote className="w-4 h-4" />}
              {user.role === 'admin' && <Shield className="w-4 h-4" />}
              {user.role === 'lecteur' && <Eye className="w-4 h-4" />}
              <span>Connecté en tant que {user.username}</span>
            </div>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}