# 🗳️ CIVIX - Application de Vote Électronique

<div align="center">
  <img src="./public/assets/vote.jpeg" alt="CIVIX Logo" width="200" height="150" style="border-radius: 10px;">
  
  **Une solution moderne et sécurisée pour les élections numériques**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
  [![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://reactjs.org/)
</div>

## 📋 Table des matières

- [🌟 Aperçu](#-aperçu)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🏗️ Architecture](#️-architecture)
- [🚀 Installation](#-installation)
- [💻 Utilisation](#-utilisation)
- [👥 Rôles et permissions](#-rôles-et-permissions)
- [🔌 API Backend](#-api-backend)
- [🎨 Interface utilisateur](#-interface-utilisateur)
- [🔒 Sécurité](#-sécurité)
- [📱 Responsive Design](#-responsive-design)
- [🛠️ Technologies utilisées](#️-technologies-utilisées)
- [📁 Structure du projet](#-structure-du-projet)
- [🧪 Développement](#-développement)
- [📞 Support](#-support)

## 🌟 Aperçu

**CIVIX** est une application web moderne de vote électronique développée avec Next.js et TypeScript. Elle offre une solution complète pour organiser des élections numériques sécurisées avec trois interfaces distinctes selon les rôles des utilisateurs.

### Problème résolu
- **Élections traditionnelles** : coûteuses, chronophages, sujettes aux erreurs
- **Solutions existantes** : complexes, peu sécurisées, interface obsolète
- **CIVIX** : solution moderne, intuitive, sécurisée et entièrement typée

## ✨ Fonctionnalités

### 🗳️ **Pour les Électeurs**
- ✅ **Authentification sécurisée** avec validation du mot de passe
- ✅ **Consultation des candidats** avec leurs programmes détaillés
- ✅ **Vote en un clic** avec confirmation et feedback visuel
- ✅ **Suivi du statut de vote** (a voté / peut voter / période fermée)
- ✅ **Consultation des résultats** en temps réel
- ✅ **Interface intuitive** optimisée pour l'expérience utilisateur

### 👨‍💼 **Pour les Administrateurs**
- ✅ **Dashboard complet** avec statistiques en temps réel
- ✅ **Gestion des électeurs** : création, modification, suppression
- ✅ **Gestion des candidats** : ajout, édition, suivi des votes
- ✅ **Gestion des campagnes** : création et organisation
- ✅ **Notifications automatiques** pour toutes les actions
- ✅ **Modales intuitives** pour la création/édition
- ✅ **Validation des données** en temps réel

### 👀 **Pour les Lecteurs (Public)**
- ✅ **Consultation publique** sans authentification
- ✅ **Statistiques en temps réel** (participation, votes, etc.)
- ✅ **Résultats live** pendant les élections
- ✅ **Résultats finaux** après clôture
- ✅ **Interface moderne** et accessible

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Base de       │
│   (Next.js)     │◄──►│   (REST)        │◄──►│   données       │
│                 │    │                 │    │                 │
│ • React 19      │    │ • Authentif.    │    │ • Électeurs     │
│ • TypeScript    │    │ • Gestion votes │    │ • Candidats     │
│ • TailwindCSS   │    │ • Statistiques  │    │ • Votes         │
│ • Context API   │    │ • Administration│    │ • Campagnes     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 🔄 **Flux d'authentification**
1. **Connexion** → Sélection du rôle (Électeur/Admin)
2. **Validation** → Vérification des identifiants via API
3. **Token JWT** → Stockage sécurisé et gestion de session
4. **Redirection** → Interface adaptée selon le rôle
5. **Vérification** → Contrôle continu de la validité du token

## 🚀 Installation

### Prérequis
- **Node.js** 18+ 
- **npm** ou **yarn**
- **Backend API** CIVIX en cours d'exécution

### 1. Cloner le projet
```bash
git clone https://github.com/PIO-VIA/Civix-fornt_end.git
cd civix
```

### 2. Installer les dépendances
```bash
npm install
# ou
yarn install
```

### 3. Configuration de l'environnement
```bash
# Créer un fichier .env.local
cp .env.example .env.local
```

Configurer les variables d'environnement :
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_APP_NAME=CIVIX
```

### 4. Générer les types API (si nécessaire)
```bash
npm run generate-api
```

### 5. Lancer l'application
```bash
# Mode développement
npm run dev

# Mode production
npm run build
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 💻 Utilisation

### 🔐 **Connexion**
1. Accédez à `http://localhost:3000`
2. Sélectionnez votre rôle : **Électeur** ou **Administrateur**
3. Saisissez vos identifiants
4. Vous êtes automatiquement redirigé vers votre interface

### 🗳️ **Voter (Électeur)**
1. Consultez la liste des **candidats** disponibles
2. Parcourez leurs **programmes** détaillés
3. Cliquez sur **"Voter"** pour votre candidat choisi
4. **Confirmez** votre vote
5. Consultez les **résultats** en temps réel

### 👨‍💼 **Administrer (Admin)**
1. Accédez au **tableau de bord** avec les statistiques
2. Gérez les **électeurs** : ajout, suppression
3. Ajoutez des **candidats** avec leurs informations
4. Créez des **campagnes** pour organiser les élections
5. Surveillez l'activité via les **notifications**

### 👀 **Consulter (Public)**
1. Accédez à l'onglet **"Lecteur"** 
2. Consultez les **statistiques publiques**
3. Suivez les **résultats en temps réel**
4. Visualisez les **résultats finaux**

## 👥 Rôles et permissions

| Fonctionnalité | Électeur | Admin | Lecteur |
|----------------|----------|-------|---------|
| Se connecter | ✅ | ✅ | ❌ |
| Voter | ✅ | ❌ | ❌ |
| Voir candidats | ✅ | ✅ | ❌ |
| Créer électeurs | ❌ | ✅ | ❌ |
| Créer candidats | ❌ | ✅ | ❌ |
| Créer campagnes | ❌ | ✅ | ❌ |
| Voir stats publiques | ❌ | ❌ | ✅ |
| Voir résultats live | ✅ | ✅ | ✅ |
| Dashboard admin | ❌ | ✅ | ❌ |

## 🔌 API Backend

L'application communique avec le backend via des services TypeScript générés automatiquement :

### 🔑 **Services d'authentification**
- `AuthentificationService.loginElecteur()` - Connexion électeur
- `AuthentificationService.loginAdministrateur()` - Connexion admin
- `AuthentificationService.verifierTokenElecteur()` - Vérification token électeur
- `AuthentificationService.verifierTokenAdmin()` - Vérification token admin

### 🗳️ **Services de vote**
- `VoteService.effectuerVote()` - Enregistrer un vote
- `VoteService.obtenirStatutVote()` - Statut de vote électeur
- `VoteService.consulterResultats()` - Résultats finaux

### 👨‍💼 **Services d'administration**
- `AdministrationService.listerElecteurs()` - Liste des électeurs
- `AdministrationService.creerElecteur()` - Créer électeur
- `AdministrationService.listerCandidats()` - Liste des candidats
- `AdministrationService.creerCandidat()` - Créer candidat
- `AdministrationService.listerCampagnes()` - Liste des campagnes

### 📊 **Services publics**
- `PublicService.obtenirStatistiquesPubliques()` - Stats publiques
- `PublicService.obtenirResultatsTempsReel()` - Résultats live
- `TableauxDeBordService.obtenirDashboardElecteur()` - Dashboard électeur
- `TableauxDeBordService.obtenirDashboardAdmin()` - Dashboard admin

## 🎨 Interface utilisateur

### 🎨 **Design System**
- **Couleurs** :
  - 🔵 Bleu : Interface électeur (`blue-600`)
  - 🟣 Violet : Interface admin (`purple-600`) 
  - 🟢 Vert : Interface lecteur (`green-600`)
- **Typographie** : Geist Sans (modern, lisible)
- **Icônes** : Lucide React (cohérentes, modernes)
- **Animations** : Transitions fluides avec Tailwind

### 📱 **Composants réutilisables**
- **`LoadingSpinner`** : Indicateurs de chargement
- **`Modal`** : Fenêtres modales pour création/édition
- **`Notification`** : Système de notifications toast
- **`Header`** : En-tête adaptable selon le rôle
- **`Footer`** : Pied de page cohérent

### 🖼️ **Layouts**
- **Page de connexion** : Design moderne avec background image
- **Dashboard électeur** : Interface claire centrée sur le vote
- **Dashboard admin** : Onglets organisés par fonction
- **Interface lecteur** : Consultation publique optimisée

## 🔒 Sécurité

### 🛡️ **Authentification**
- **Tokens JWT** sécurisés stockés localement
- **Vérification continue** de la validité des tokens
- **Rôles stricts** avec contrôle d'accès
- **Sessions automatiques** avec rafraîchissement

### 🔐 **Validation des données**
- **Validation frontend** en temps réel
- **Sanitisation** des entrées utilisateur  
- **Protection CSRF** via tokens
- **Chiffrement** des communications API

### 🚨 **Gestion des erreurs**
- **Notifications utilisateur** claires
- **Logs détaillés** pour le débogage
- **Fallbacks gracieux** en cas d'erreur API
- **États de chargement** informatifs

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour :

### 📱 **Mobile (< 768px)**
- Navigation adaptée avec menu mobile
- Boutons et formulaires optimisés pour le tactile
- Grilles adaptatives pour les cartes
- Texte et espacements ajustés

### 💻 **Tablette (768px - 1024px)**
- Layout en colonnes pour une meilleure utilisation de l'espace
- Modales redimensionnées
- Navigation horizontale conservée

### 🖥️ **Desktop (> 1024px)**
- Expérience complète avec tous les éléments visibles
- Interactions hover sophistiquées
- Grilles multi-colonnes optimales

## 🛠️ Technologies utilisées

### **Frontend**
- **⚛️ React 19** - Bibliothèque UI moderne avec nouvelles fonctionnalités
- **📘 TypeScript 5** - Typage statique pour plus de robustesse
- **🚀 Next.js 15.3.5** - Framework React avec SSR et optimisations
- **🎨 TailwindCSS 4** - Framework CSS utility-first
- **🎭 Lucide React** - Icônes modernes et cohérentes

### **État et données**
- **🎯 Context API** - Gestion d'état global pour l'authentification
- **🔄 SWR/Fetch** - Gestion des requêtes API
- **📦 OpenAPI Codegen** - Génération automatique des types API

### **Outils de développement**
- **📋 ESLint** - Linting et qualité de code
- **🔧 Prettier** - Formatage automatique du code
- **📊 TypeScript Strict Mode** - Vérifications de type strictes

## 📁 Structure du projet

```
civix/
├── 📁 public/                  # Assets statiques
│   └── assets/vote.jpeg        # Image de fond
├── 📁 src/
│   ├── 📁 app/                 # Pages Next.js (App Router)
│   │   ├── page.tsx            # Page de connexion
│   │   ├── admin/page.tsx      # Interface administrateur
│   │   ├── voter/page.tsx      # Interface électeur
│   │   ├── reader/page.tsx     # Interface lecteur public
│   │   └── dashboard/page.tsx  # Page de redirection
│   ├── 📁 components/          # Composants réutilisables
│   │   ├── Header.tsx          # En-tête de l'application
│   │   ├── Footer.tsx          # Pied de page
│   │   └── ui/                 # Composants UI
│   │       ├── Modal.tsx       # Composant modal
│   │       ├── LoadingSpinner.tsx  # Indicateur de chargement
│   │       └── Notification.tsx    # Système de notifications
│   ├── 📁 context/             # Contextes React
│   │   └── AuthContext.tsx     # Contexte d'authentification
│   ├── 📁 hooks/               # Hooks personnalisés
│   │   └── useNotification.tsx # Hook pour notifications
│   └── 📁 lib/                 # Services et utilitaires
│       ├── 📁 services/        # Services API générés
│       │   ├── AuthentificationService.ts
│       │   ├── VoteService.ts
│       │   ├── AdministrationService.ts
│       │   └── PublicService.ts
│       └── 📁 models/          # Types TypeScript générés
│           ├── AuthResponse.ts
│           ├── ElecteurDTO.ts
│           └── ... (autres modèles)
├── 📄 package.json             # Dependencies et scripts
├── 📄 tailwind.config.js       # Configuration TailwindCSS
├── 📄 tsconfig.json           # Configuration TypeScript
└── 📄 README.md               # Ce fichier
```

## 🧪 Développement

### 🚀 **Scripts disponibles**
```bash
# Développement
npm run dev          # Lance le serveur de développement

# Production
npm run build        # Build l'application pour la production
npm start           # Lance l'application en mode production

# Qualité de code
npm run lint        # Vérifie la qualité du code
npm run lint:fix    # Corrige automatiquement les erreurs

# Types API
npm run generate-api # Régénère les types depuis l'API backend
```

### 🔧 **Configuration personnalisée**

#### **Variables d'environnement**
```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080    # URL de l'API backend
NEXT_PUBLIC_APP_NAME=CIVIX                   # Nom de l'application
NEXT_PUBLIC_VERSION=1.0.0                    # Version de l'app
```

#### **Configuration TailwindCSS**
Le fichier `tailwind.config.js` inclut :
- Couleurs personnalisées pour chaque rôle
- Animations et transitions fluides
- Responsive breakpoints optimisés
- Typography scale cohérente

### 🐛 **Débogage**
- **Console navigateur** : Messages de debug détaillés
- **Network tab** : Monitoring des requêtes API
- **React DevTools** : Inspection des composants et état
- **Logs backend** : Corrélation avec les erreurs frontend

## 📞 Support

### 🚨 **Problèmes courants**

#### **Erreur de connexion**
```
Identifiants invalides ou erreur de connexion
```
**Solution** : Vérifiez que le backend est démarré et accessible

#### **Token invalide**
```
Token invalide ou expiré
```
**Solution** : Reconnectez-vous ou vérifiez la configuration de l'API

#### **Erreur de chargement des données**
```
Impossible de charger les données
```
**Solution** : Vérifiez la connectivité réseau et les endpoints API

### 🔗 **Ressources utiles**
- **Documentation Next.js** : https://nextjs.org/docs
- **Documentation TailwindCSS** : https://tailwindcss.com/docs
- **Documentation TypeScript** : https://www.typescriptlang.org/docs
- **Guide React Hooks** : https://reactjs.org/docs/hooks-intro.html

### 📧 **Contact**
Pour toute question ou support technique :
- **Email** : support@civix.com
- **Issues GitHub** : Créez une issue sur le repository
- **Documentation API** : Consultez la documentation Swagger du backend

---

<div align="center">
  
**🗳️ CIVIX - Révolutionnons le vote électronique  !**

*Développé par moi preuve de l'application des connaissance acquises*

[![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-black?logo=next.js)](https://nextjs.org/)
[![Powered by TypeScript](https://img.shields.io/badge/Powered%20by-TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Styled with TailwindCSS](https://img.shields.io/badge/Styled%20with-TailwindCSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

</div>