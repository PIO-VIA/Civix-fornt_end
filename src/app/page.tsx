import Link from 'next/link';
import Image from 'next/image';
import { Vote, Users, Calendar, Shield } from 'lucide-react';
import { ApiTest } from '@/components/debug/ApiTest';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Section héro */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Bienvenue sur <span className="text-blue-600">CIVIX</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              La plateforme sécurisée de vote électronique qui modernise la démocratie. 
              Participez aux élections en toute transparence et sécurité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/elections"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Voir les élections
              </Link>
              <Link
                href="/candidats"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Découvrir les candidats
              </Link>
            </div>
          </div>
        </div>
        
        {/* Image d'illustration */}
        <div className="mt-16 flex justify-center">
          <Image
            src="/assets/vote.jpeg"
            alt="Vote électronique"
            width={600}
            height={400}
            className="rounded-xl shadow-2xl"
            priority
          />
        </div>
      </section>

      {/* Section fonctionnalités */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Pourquoi choisir CIVIX ?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Sécurisé</h3>
              <p className="text-gray-600">
                Technologie de pointe avec chiffrement et authentification forte
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Vote className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Simple</h3>
              <p className="text-gray-600">
                Interface intuitive pour voter en quelques clics
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Transparent</h3>
              <p className="text-gray-600">
                Résultats en temps réel et traçabilité complète
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Accessible</h3>
              <p className="text-gray-600">
                Votez à distance, 24h/24 pendant les périodes ouvertes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Debug Section - Development only */}
      {process.env.NODE_ENV === 'development' && (
        <section className="py-20 px-4 bg-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              🔧 Debug API Test
            </h2>
            <ApiTest />
          </div>
        </section>
      )}

      {/* Section appel à l'action */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à exercer votre droit de vote ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Connectez-vous à votre compte ou découvrez les élections en cours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Se connecter
            </Link>
            <Link
              href="/elections"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Voir les élections
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
