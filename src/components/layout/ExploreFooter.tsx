'use client';

import { useState, useEffect } from 'react';
import { ChevronUp, Vote, Users, Megaphone } from 'lucide-react';

export function ExploreFooter() {
  const [activeSection, setActiveSection] = useState('elections');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['elections', 'candidats', 'campagnes'];
      const scrollPosition = window.scrollY + 200;

      // Calculer le progrès de lecture
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Déterminer la section active
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  const navigationItems = [
    {
      id: 'elections',
      label: 'Élections',
      icon: Vote,
      description: 'Voir les élections'
    },
    {
      id: 'candidats',
      label: 'Candidats',
      icon: Users,
      description: 'Voir les candidats'
    },
    {
      id: 'campagnes',
      label: 'Campagnes',
      icon: Megaphone,
      description: 'Voir les campagnes'
    }
  ];

  return (
    <>
      {/* Footer fixe */}
      <footer className="bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            {/* Navigation principale */}
            <nav className="flex items-center justify-center space-x-8">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    title={item.description}
                  >
                    <IconComponent className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
              
              {/* Bouton retour en haut */}
              <button
                onClick={scrollToTop}
                className="flex flex-col items-center space-y-1 px-4 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors ml-8 border-l border-gray-200"
                title="Retour en haut"
              >
                <ChevronUp className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-600">
                  Haut
                </span>
              </button>
            </nav>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-100 py-4">
            <p className="text-center text-sm text-gray-500">
              © 2024 CIVIX. Plateforme démocratique participative.
            </p>
          </div>
        </div>
      </footer>

      {/* Indicateur de progression de lecture */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{
            width: `${scrollProgress}%`
          }}
        />
      </div>
    </>
  );
}