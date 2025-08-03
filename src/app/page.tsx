"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/homepage/HeroSection";
import ElectionsSection from "@/components/homepage/ElectionsSection";
import CampaignsSection from "@/components/homepage/CampaignsSection";
import LeaderboardSection from "@/components/homepage/LeaderboardSection";
import NewsSection from "@/components/homepage/NewsSection";
import LoadingPage from "@/components/ui/LoadingPage";

import { PublicService } from "@/lib/services/PublicService";
import { CampagnesPublicService } from "@/lib/services/CampagnesPublicService";
import { CandidatsPublicService } from "@/lib/services/CandidatsPublicService";
import { ElectionsService } from "@/lib/services/ElectionsService";

import { StatistiquesPubliquesDTO } from "@/lib/models/StatistiquesPubliquesDTO";
import { CampagneAvecCandidatDTO } from "@/lib/models/CampagneAvecCandidatDTO";
import { CandidatAvecVotesDTO } from "@/lib/models/CandidatAvecVotesDTO";
import { ElectionDTO } from "@/lib/models/ElectionDTO";
import { ActualiteDTO } from "@/lib/models/ActualiteDTO";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatistiquesPubliquesDTO | null>(null);
  const [campaigns, setCampaigns] = useState<CampagneAvecCandidatDTO[]>([]);
  const [candidates, setCandidates] = useState<CandidatAvecVotesDTO[]>([]);
  const [elections, setElections] = useState<ElectionDTO[]>([]);
  const [news, setNews] = useState<ActualiteDTO[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Charger toutes les données en parallèle
        const [
          statsResponse,
          campaignsResponse,
          candidatesResponse,
          electionsResponse,
          newsResponse
        ] = await Promise.allSettled([
          PublicService.obtenirStatistiquesPubliques(),
          CampagnesPublicService.obtenirCampagnesTendance(6),
          CandidatsPublicService.obtenirClassement(),
          ElectionsService.listerElectionsDisponibles(),
          PublicService.obtenirActualites(6)
        ]);

        // Traiter les statistiques
        if (statsResponse.status === 'fulfilled') {
          setStats(statsResponse.value);
        } else {
          console.warn('Erreur lors du chargement des statistiques:', statsResponse.reason);
        }

        // Traiter les campagnes
        if (campaignsResponse.status === 'fulfilled') {
          setCampaigns(campaignsResponse.value);
        } else {
          console.warn('Erreur lors du chargement des campagnes:', campaignsResponse.reason);
        }

        // Traiter les candidats
        if (candidatesResponse.status === 'fulfilled') {
          setCandidates(candidatesResponse.value);
        } else {
          console.warn('Erreur lors du chargement des candidats:', candidatesResponse.reason);
        }

        // Traiter les élections
        if (electionsResponse.status === 'fulfilled') {
          setElections(electionsResponse.value);
        } else {
          console.warn('Erreur lors du chargement des élections:', electionsResponse.reason);
        }

        // Traiter les actualités
        if (newsResponse.status === 'fulfilled') {
          setNews(newsResponse.value);
        } else {
          console.warn('Erreur lors du chargement des actualités:', newsResponse.reason);
        }

      } catch (error) {
        console.error('Erreur générale lors du chargement des données:', error);
        setError('Une erreur est survenue lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-4 mt-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <HeroSection 
          stats={{
            totalElections: stats?.nombreElections || 0,
            totalVotes: stats?.nombreVotes || 0,
            totalUsers: stats?.nombreElecteurs || 0,
          }}
        />
        
        <ElectionsSection elections={elections} />
        
        <CampaignsSection campaigns={campaigns} />
        
        <LeaderboardSection candidates={candidates} />
        
        <NewsSection news={news} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-tr from-blue-500 to-purple-600 p-2 rounded-lg">
                <Vote className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">CIVIX</span>
              </div>
              <p className="text-gray-400 mb-4">
                La plateforme de vote électronique sécurisée qui démocratise l'accès aux élections.
              </p>
              <div className="flex space-x-4 text-sm text-gray-500">
                <span>🔒 Sécurisé</span>
                <span>🛡️ Conforme RGPD</span>
                <span>✅ Certifié</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Plateforme</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sécurité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Aide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 CIVIX. Tous droits réservés. Vote électronique sécurisé.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}