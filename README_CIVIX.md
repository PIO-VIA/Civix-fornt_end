# CIVIX - Plateforme de Vote Électronique

## 📋 Description

CIVIX est une interface électorale professionnelle et responsive développée avec Next.js 15, utilisant l'App Router et TypeScript strict. Elle s'appuie sur une API Spring Boot existante et réutilise tous les modèles et services du frontend existant.

## 🏗️ Architecture

### Structure Next.js

```
src/
├── app/                          # App Router Pages
│   ├── (pages publiques)
│   │   ├── elections/           # Liste des élections
│   │   ├── candidats/           # Candidats avec détails
│   │   └── campagnes/           # Campagnes électorales
│   ├── (pages protégées)
│   │   ├── vote/               # Interface de vote sécurisée
│   │   ├── resultats/          # Résultats en temps réel
│   │   └── profil/             # Profil électeur
│   ├── login/                  # Authentification
│   ├── api/auth/              # Routes API authentification
│   ├── layout.tsx             # Layout global
│   ├── page.tsx               # Page d'accueil
│   └── globals.css            # Styles globaux
├── components/                 # Composants réutilisables
│   ├── ui/                    # Composants UI génériques
│   ├── layout/                # Composants de mise en page
│   ├── forms/                 # Composants de formulaires
│   └── providers/             # Providers React
├── lib/                       # Services et modèles existants
│   ├── models/                # Types DTO (réutilisés)
│   ├── services/              # Services API (réutilisés)
│   ├── api/                   # Configuration API client
│   └── auth/                  # Gestion authentification
├── hooks/                     # Custom hooks
├── types/                     # Types TypeScript
└── middleware.ts              # Middleware Next.js
```

### Modèles et Services Réutilisés

L'application utilise OBLIGATOIREMENT tous les modèles et services existants :

#### Modèles DTO
- `ElecteurDTO` - Données électeur
- `CandidatDTO` - Données candidat
- `CampagneDTO` - Données campagne
- `ElectionDTO` - Données élection
- `VoteDTO` - Données vote
- `ResultatsElectionDTO` - Résultats d'élection
- Et tous les autres modèles existants

#### Services API
- `AuthentificationService` - Authentification électeurs
- `ElectionsService` - Gestion des élections
- `CandidatsPublicService` - Données publiques des candidats
- `CampagnesPublicService` - Données publiques des campagnes
- `VoteService` - Processus de vote
- `LecteurService` - Données électeur
- Et tous les autres services existants

## 🎨 Design System

### Palette de Couleurs
- **Blanc principal** : `#FFFFFF`
- **Bleu principal** : `#2563EB` (blue-600)
- **Bleu secondaire** : `#3B82F6` (blue-500)
- **Gris** : Nuances de gray-50 à gray-900

### Composants UI
- Design responsive mobile-first
- Animations fluides avec Framer Motion
- Loading states avec Suspense boundaries
- Skeleton loaders pour le chargement
- États d'erreur élégants

## 🔒 Sécurité et Authentification

### Middleware Next.js
- Protection des routes sensibles
- Vérification JWT côté serveur
- Gestion automatique des redirections

### Authentification
- JWT tokens avec jose
- Cookies httpOnly sécurisés
- Gestion des sessions persistantes
- Changement de mot de passe obligatoire (première connexion)

### Routes Publiques
- `/` - Page d'accueil
- `/elections` - Liste des élections
- `/candidats` - Liste des candidats
- `/campagnes` - Liste des campagnes
- `/login` - Connexion

### Routes Protégées
- `/vote` - Interface de vote
- `/resultats` - Résultats des élections
- `/profil` - Profil électeur

## 🚀 Fonctionnalités

### Pages Publiques
1. **Accueil** (`/`)
   - Présentation de la plateforme
   - Appels à l'action
   - Design attractif et informatif

2. **Élections** (`/elections`)
   - Liste complète des élections
   - Filtres par statut (ouverte, fermée, etc.)
   - Recherche textuelle
   - Cartes détaillées avec informations clés

3. **Candidats** (`/candidats`)
   - Profils des candidats
   - Photos et informations
   - Recherche par nom/email
   - Liens vers campagnes

4. **Campagnes** (`/campagnes`)
   - Descriptions des campagnes
   - Photos et détails
   - Liens vers candidats
   - Recherche textuelle

### Pages Protégées
1. **Vote** (`/vote`)
   - Interface de vote sécurisée
   - Sélection de candidats
   - Prévisualisation avant confirmation
   - Validation et confirmation

2. **Résultats** (`/resultats`)
   - Résultats en temps réel
   - Graphiques et statistiques
   - Historique des résultats
   - Taux de participation

3. **Profil** (`/profil`)
   - Informations personnelles
   - Historique de vote
   - Changement de mot de passe
   - Gestion de la sécurité

## 🛠️ Technologies

### Framework et Langages
- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage strict
- **React 19** - Bibliothèque UI

### Styling et UI
- **Tailwind CSS 4** - Framework CSS utilitaire
- **Framer Motion** - Animations fluides
- **Lucide React** - Icônes

### État et Data Fetching
- **TanStack Query** - Cache et synchronisation API
- **React Hook Form** - Gestion des formulaires
- **Zod** - Validation de schémas

### Authentification et Sécurité
- **Jose** - Gestion JWT
- **Next.js Middleware** - Protection des routes

## 📦 Installation et Configuration

### Prérequis
- Node.js 18+ 
- npm ou yarn
- API Spring Boot CIVIX en fonctionnement

### Installation
```bash
npm install
```

### Variables d'environnement
Créer un fichier `.env.local` :
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
JWT_SECRET=votre_secret_jwt_securise
```

### Développement
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## 🧪 Tests et Qualité

### Linting
```bash
npm run lint
```

### Build
```bash
npm run build
```

## 📱 Responsive Design

L'application est entièrement responsive avec :
- Breakpoints Tailwind standard
- Navigation mobile adaptative
- Grilles flexibles
- Images optimisées avec next/image

## ♿ Accessibilité

- Sémantique HTML correcte
- Contraste de couleurs respecté
- Navigation au clavier
- Labels appropriés
- ARIA attributes

## 🔧 Configuration API

L'application se connecte à l'API Spring Boot existante via :
- Configuration dans `src/lib/api/client.ts`
- Intercepteurs pour les tokens JWT
- Gestion automatique des erreurs d'authentification

## 📋 Points Importants

1. **Réutilisation Obligatoire** : Tous les modèles et services existants sont réutilisés
2. **No Emojis** : Code professionnel sans emojis
3. **Commentaires en Français** : Documentation en français
4. **TypeScript Strict** : Mode strict activé
5. **Performance** : Lazy loading et optimisations Next.js

## 🤝 Contribution

Pour contribuer au projet :
1. Respecter l'architecture existante
2. Utiliser les services et modèles existants
3. Suivre les conventions de nommage
4. Maintenir la cohérence du design system
5. Tester les fonctionnalités

## 📞 Support

Pour toute question ou support technique, contacter l'équipe de développement CIVIX.