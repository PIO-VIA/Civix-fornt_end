"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Calendar, Shield, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormModal from "@/components/ui/FormModal";
import Input from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";

interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: string;
  dateInscription?: string;
  dernièreConnexion?: string;
  statut: 'actif' | 'inactif';
}

interface ChangePasswordData {
  ancienMotDePasse: string;
  nouveauMotDePasse: string;
  confirmationMotDePasse: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState<ChangePasswordData>({
    ancienMotDePasse: '',
    nouveauMotDePasse: '',
    confirmationMotDePasse: ''
  });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const { user, token, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !user || user.role !== 'electeur') {
      router.push('/');
      return;
    }
    loadProfile();
  }, [isAuthenticated, user, router]);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Simulation du chargement du profil (à remplacer par l'API réelle)
      // En attendant l'API, on utilise les données du contexte d'auth
      setProfile({
        id: user?.id || '',
        username: user?.username || '',
        email: user?.email || '',
        role: user?.role || 'electeur',
        dateInscription: new Date().toISOString(),
        dernièreConnexion: new Date().toISOString(),
        statut: 'actif'
      });
      
    } catch (error) {
      console.error("Erreur lors du chargement du profil:", error);
      setError("Erreur lors du chargement du profil");
    } finally {
      setIsLoading(false);
    }
  };

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) errors.push("Au moins 8 caractères");
    if (!/[A-Z]/.test(password)) errors.push("Une majuscule");
    if (!/[0-9]/.test(password)) errors.push("Un chiffre");
    if (!/[^A-Za-z0-9]/.test(password)) errors.push("Un caractère spécial");
    return errors;
  };

  const handlePasswordChange = (field: keyof ChangePasswordData, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    
    // Validation en temps réel
    const newErrors: Record<string, string> = { ...passwordErrors };
    
    if (field === 'nouveauMotDePasse') {
      const validationErrors = validatePassword(value);
      if (validationErrors.length > 0) {
        newErrors.nouveauMotDePasse = `Manque: ${validationErrors.join(', ')}`;
      } else {
        delete newErrors.nouveauMotDePasse;
      }
    }
    
    if (field === 'confirmationMotDePasse' || (field === 'nouveauMotDePasse' && passwordData.confirmationMotDePasse)) {
      const confirmPassword = field === 'confirmationMotDePasse' ? value : passwordData.confirmationMotDePasse;
      const newPassword = field === 'nouveauMotDePasse' ? value : passwordData.nouveauMotDePasse;
      
      if (confirmPassword && newPassword !== confirmPassword) {
        newErrors.confirmationMotDePasse = "Les mots de passe ne correspondent pas";
      } else {
        delete newErrors.confirmationMotDePasse;
      }
    }
    
    setPasswordErrors(newErrors);
  };

  const handleSubmitPasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation finale
    const finalErrors: Record<string, string> = {};
    
    if (!passwordData.ancienMotDePasse) {
      finalErrors.ancienMotDePasse = "Ancien mot de passe requis";
    }
    
    if (!passwordData.nouveauMotDePasse) {
      finalErrors.nouveauMotDePasse = "Nouveau mot de passe requis";
    } else {
      const validationErrors = validatePassword(passwordData.nouveauMotDePasse);
      if (validationErrors.length > 0) {
        finalErrors.nouveauMotDePasse = `Manque: ${validationErrors.join(', ')}`;
      }
    }
    
    if (passwordData.nouveauMotDePasse !== passwordData.confirmationMotDePasse) {
      finalErrors.confirmationMotDePasse = "Les mots de passe ne correspondent pas";
    }
    
    if (Object.keys(finalErrors).length > 0) {
      setPasswordErrors(finalErrors);
      return;
    }

    try {
      setIsChangingPassword(true);
      setError('');
      
      // TODO: Appeler l'API pour changer le mot de passe
      // const response = await UserService.changePassword(token, {
      //   oldPassword: passwordData.ancienMotDePasse,
      //   newPassword: passwordData.nouveauMotDePasse
      // });
      
      // Simulation pour le moment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccessMessage('Mot de passe changé avec succès');
      setIsPasswordModalOpen(false);
      setPasswordData({
        ancienMotDePasse: '',
        nouveauMotDePasse: '',
        confirmationMotDePasse: ''
      });
      setPasswordErrors({});
      
    } catch (error) {
      console.error("Erreur lors du changement de mot de passe:", error);
      setError("Erreur lors du changement de mot de passe");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-700">Chargement de votre profil...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Erreur de chargement</h2>
          <p className="text-gray-600 mb-4">{error || "Impossible de charger le profil"}</p>
          <button
            onClick={loadProfile}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header title="CIVIX - Mon Profil" role="Électeur" color="blue" onLogout={handleLogout} />
      
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation */}
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour</span>
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-green-700">{successMessage}</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-blue-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.username}</h1>
                <p className="text-gray-600 mb-1">{profile.email}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className={`px-2 py-1 rounded-full ${
                    profile.statut === 'actif' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {profile.statut === 'actif' ? 'Compte actif' : 'Compte inactif'}
                  </span>
                  <span className="text-gray-500">Rôle: Électeur</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations personnelles</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Nom d'utilisateur</p>
                    <p className="text-gray-900 font-medium">{profile.username}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Adresse email</p>
                    <p className="text-gray-900 font-medium">{profile.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Rôle</p>
                    <p className="text-gray-900 font-medium capitalize">{profile.role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations du compte</h2>
              
              <div className="space-y-4 mb-6">
                {profile.dateInscription && (
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Date d'inscription</p>
                      <p className="text-gray-900 font-medium">
                        {new Date(profile.dateInscription).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                )}
                
                {profile.dernièreConnexion && (
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Dernière connexion</p>
                      <p className="text-gray-900 font-medium">
                        {new Date(profile.dernièreConnexion).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Shield className="w-4 h-4" />
                <span>Changer le mot de passe</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <FormModal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false);
          setPasswordData({
            ancienMotDePasse: '',
            nouveauMotDePasse: '',
            confirmationMotDePasse: ''
          });
          setPasswordErrors({});
          setError('');
        }}
        title="Changer le mot de passe"
        onSubmit={handleSubmitPasswordChange}
        isLoading={isChangingPassword}
        submitText="Changer le mot de passe"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Ancien mot de passe"
            type="password"
            value={passwordData.ancienMotDePasse}
            onChange={(e) => handlePasswordChange('ancienMotDePasse', e.target.value)}
            error={passwordErrors.ancienMotDePasse}
            required
          />
          
          <Input
            label="Nouveau mot de passe"
            type="password"
            value={passwordData.nouveauMotDePasse}
            onChange={(e) => handlePasswordChange('nouveauMotDePasse', e.target.value)}
            error={passwordErrors.nouveauMotDePasse}
            helperText="8 caractères minimum, avec majuscule, chiffre et caractère spécial"
            showValidation
            isValid={!passwordErrors.nouveauMotDePasse && passwordData.nouveauMotDePasse.length > 0}
            required
          />
          
          <Input
            label="Confirmer le nouveau mot de passe"
            type="password"
            value={passwordData.confirmationMotDePasse}
            onChange={(e) => handlePasswordChange('confirmationMotDePasse', e.target.value)}
            error={passwordErrors.confirmationMotDePasse}
            showValidation
            isValid={!passwordErrors.confirmationMotDePasse && passwordData.confirmationMotDePasse.length > 0}
            required
          />
        </div>
      </FormModal>

      <Footer />
    </div>
  );
}