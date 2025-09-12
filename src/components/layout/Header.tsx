'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, User, Vote, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/providers/AuthProvider';
import { logout } from '@/lib/auth/auth';
import Image from 'next/image';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, refreshAuth } = useAuth();

  const publicNavItems = [
    { href: '/explore', label: 'Explorer', icon: Compass },
    { href: '/elections', label: 'Élections', icon: Vote },
    { href: '/candidats', label: 'Candidats', icon: User },
    { href: '/campagnes', label: 'Campagnes', icon: Vote },
  ];

  const protectedNavItems = [
    { href: '/vote', label: 'Voter', icon: Vote },
    { href: '/resultats', label: 'Résultats', icon: Vote },
    { href: '/profil', label: 'Profil', icon: User },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      refreshAuth();
      router.push('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className=" text-white p-2 rounded-lg"
            >
              <Image 
                src="/assets/logop.png" 
                alt="CIVIX Logo" 
                width={80} 
                height={80} 
                className="w-10  h-15"
              />
            </motion.div>
            <span className="text-xl font-bold text-blue-400">CIVIX</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Navigation publique */}
            {publicNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Navigation protégée */}
            {isAuthenticated && (
              <>
                <div className="w-px h-6 bg-gray-300" />
                {protectedNavItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </>
            )}
          </nav>

          {/* Actions utilisateur */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">
                  Bonjour, {user?.username || user?.email}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </motion.button>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Se connecter
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}