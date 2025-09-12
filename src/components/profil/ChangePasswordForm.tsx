'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChangePasswordRequest } from '@/lib';
import { AuthenticatedLecteurService } from '@/lib/auth/authenticatedServices';
import { useEffect, useState } from 'react';

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Mot de passe actuel requis'),
  newPassword: z.string()
    .min(8, 'Le nouveau mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Doit contenir au moins une majuscule')
    .regex(/[a-z]/, 'Doit contenir au moins une minuscule')
    .regex(/[0-9]/, 'Doit contenir au moins un chiffre'),
  confirmPassword: z.string().min(1, 'Confirmation requise'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// Utilise le service authentifié qui inclut automatiquement le token
const changePasswordService = AuthenticatedLecteurService.changerMotDePasse;

export function ChangePasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: ChangePasswordRequest) => changePasswordService(data),
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    mutation.mutate({
      ancienMotDePasse: data.currentPassword,
      nouveauMotDePasse: data.newPassword,
    });
  };

  // Affiche le message de succès pendant 5 secondes
  useEffect(() => {
    if (mutation.isSuccess) {
      const timer = setTimeout(() => {
        mutation.reset();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [mutation.isSuccess, mutation.reset]);

  return (
    <div className="space-y-6">
      {mutation.isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4"
        >
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-sm text-green-700 font-medium">
              Mot de passe changé avec succès
            </span>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Mot de passe actuel */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mot de passe actuel
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              {...register('currentPassword')}
              type={showCurrentPassword ? 'text' : 'password'}
              className={`block w-full pl-10 pr-10 py-2 text-sm border  text-black rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                errors.currentPassword ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={mutation.isPending}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              disabled={mutation.isPending}
            >
              {showCurrentPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="mt-1 text-xs text-red-600 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* Nouveau mot de passe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nouveau mot de passe
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              {...register('newPassword')}
              type={showNewPassword ? 'text' : 'password'}
              className={`block w-full pl-10 pr-10 py-2 text-sm border text-black rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                errors.newPassword ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={mutation.isPending}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowNewPassword(!showNewPassword)}
              disabled={mutation.isPending}
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="mt-1 text-xs text-red-600 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirmation mot de passe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirmer le mot de passe
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              className={`block w-full pl-10 pr-10 py-2 text-sm border text-black rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={mutation.isPending}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={mutation.isPending}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Erreur générale */}
        {mutation.isError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-3"
          >
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-sm text-red-700">{mutation.error.message}</span>
            </div>
          </motion.div>
        )}

        {/* Bouton */}
        <motion.button
          type="submit"
          disabled={mutation.isPending}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Changement...
            </div>
          ) : (
            'Changer le mot de passe'
          )}
        </motion.button>
      </form>

      {/* Conseils de sécurité */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <h4 className="text-sm font-medium text-yellow-900 mb-2">
          Conseils pour un mot de passe sécurisé :
        </h4>
        <ul className="text-xs text-yellow-800 space-y-1">
          <li>• Au moins 8 caractères</li>
          <li>• Une majuscule et une minuscule</li>
          <li>• Au moins un chiffre</li>
          <li>• Évitez les mots du dictionnaire</li>
        </ul>
      </div>
    </div>
  );
}