import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { Vote } from 'lucide-react';

export default function LoginPage() {
  return (
     <div className="min-h-screen hero-bg bg-opacity-80">
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md ">
        {/* Logo */}
        <div className="flex justify-center ">
          <div className="bg-blue-600 text-white p-3 rounded-lg">
            <Vote className="w-8 h-8" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-blue-900">
          Connexion à CIVIX
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Connectez-vous pour accéder à votre espace électeur
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Suspense fallback={
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          }>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
    </div>

  );
}

export const metadata = {
  title: 'Connexion - CIVIX',
  description: 'Connectez-vous à votre compte CIVIX pour accéder à vos droits de vote',
};