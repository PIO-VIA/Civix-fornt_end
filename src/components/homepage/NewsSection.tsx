"use client";

import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { ActualiteDTO } from "@/lib/models/ActualiteDTO";

interface NewsSectionProps {
  news: ActualiteDTO[];
}

export default function NewsSection({ news }: NewsSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Actualités
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Restez informé des dernières nouvelles de la plateforme
          </p>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl p-8 max-w-md mx-auto shadow-sm">
              <Newspaper className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Aucune actualité
              </h3>
              <p className="text-gray-500">
                Aucune actualité n'est disponible pour le moment
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, 6).map((article, index) => (
              <article
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-300 group"
              >
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <time>
                      {article.datePublication ? 
                        new Date(article.datePublication).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 
                        'Date inconnue'
                      }
                    </time>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {article.titre}
                  </h3>
                  
                  {article.contenu && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {article.contenu}
                    </p>
                  )}
                </div>

                {article.auteur && (
                  <div className="mb-4 text-sm text-gray-600">
                    <span className="font-medium">Par {article.auteur}</span>
                  </div>
                )}

                <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  <span>Lire la suite</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </article>
            ))}
          </div>
        )}

        {news.length > 6 && (
          <div className="text-center mt-8">
            <button className="bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 font-medium">
              Voir toutes les actualités
            </button>
          </div>
        )}
      </div>
    </section>
  );
}