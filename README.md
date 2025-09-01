# 🚀 SyncHub

<div align="center">

![SyncHub Logo](./public/images/shlogo.png)

**La plateforme sociale nouvelle génération pour les passionnés de technologie en Afrique francophone**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

[🌐 Demo Live](https://synchub.vercel.app) • [📖 Documentation](./docs) • [🐛 Issues](https://github.com/m3dev4/synchub/issues) • [💬 Discussions](https://github.com/m3dev4/synchub/discussions)

</div>

---

## 🌟 À propos de SyncHub

SyncHub révolutionne la façon dont les talents tech africains se connectent et collaborent. Plus qu'un simple réseau social, c'est un écosystème complet où l'innovation rencontre la communauté.

### 🎯 Notre Mission

Créer un espace authentique où les développeurs, designers, experts en cybersécurité et créateurs du digital peuvent :

- **🤝 Se connecter** avec des talents partageant leur passion
- **💡 Partager** leurs projets et idées innovantes  
- **🚀 Collaborer** sur des projets qui façonnent l'avenir
- **📚 Apprendre** ensemble et grandir professionnellement

### 🔮 Notre Vision

Devenir le carrefour numérique de référence pour la tech africaine francophone, où chaque interaction génère de la valeur et où chaque projet peut trouver son équipe idéale.

## 🛠️ Stack Technique

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org) avec App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **UI Components**: [Radix UI](https://radix-ui.com) + shadcn/ui
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs)
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Icons**: Lucide React + React Icons

### Backend & Database
- **Database**: PostgreSQL avec [Prisma ORM](https://prisma.io)
- **Authentication**: Système custom avec sessions sécurisées
- **Email Service**: [Resend](https://resend.com) pour notifications
- **Real-time**: Socket.IO + Polling pour notifications temps réel
- **API**: Next.js API Routes avec validation Zod

### DevTools & Qualité
- **Package Manager**: pnpm pour performance optimale
- **Linting**: ESLint avec règles strictes
- **Formatting**: Prettier pour cohérence du code
- **Type Safety**: TypeScript en mode strict
- **Database**: Prisma Studio pour gestion visuelle

## 🚀 Installation et Configuration

### Prérequis
- Node.js 18+ 
- pnpm
- PostgreSQL (ou compte Supabase)

### 1. Cloner le projet
```bash
git clone https://github.com/votre-username/synchub.git
cd synchub
```

### 2. Installer les dépendances
```bash
pnpm install
```

### 3. Configuration des variables d'environnement
Créez un fichier `.env.local` à la racine du projet :

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/synchub"
DIRECT_URL="postgresql://username:password@localhost:5432/synchub"

# Authentication
NEXT_PUBLIC_CLIENT_URL="http://localhost:3000"
BETTER_AUTH_SECRET="your-secret-key"

# OAuth Providers
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email Service
RESEND_API_KEY="your-resend-api-key"
```

### 4. Configuration de la base de données
```bash
# Générer le client Prisma
pnpm prisma generate

# Appliquer les migrations
pnpm prisma migrate dev

# (Optionnel) Visualiser la base de données
pnpm prisma studio
```

### 5. Lancer le serveur de développement
```bash
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
synchub/
├── app/                          # App Router (Next.js 13+)
│   ├── (auth)/                   # Routes d'authentification
│   │   ├── sign-in/             # Page de connexion
│   │   ├── sign-up/             # Page d'inscription
│   │   └── verify-email/        # Vérification email
│   ├── (root)/                   # Routes principales
│   │   └── feeds/               # Feed principal
│   ├── api/                      # API Routes
│   │   └── auth/                # Endpoints d'authentification
│   ├── globals.css              # Styles globaux
│   └── layout.tsx               # Layout racine
├── components/                   # Composants réutilisables
│   ├── ui/                      # Composants UI (shadcn)
│   └── providers/               # Providers React
├── hooks/                        # Hooks personnalisés
│   └── auth/                    # Hooks d'authentification
├── lib/                         # Utilitaires et configurations
│   ├── prisma-client-js/        # Client Prisma généré
│   └── auth.ts                  # Configuration Better Auth
├── prisma/                      # Schema et migrations Prisma
│   ├── migrations/              # Migrations de base de données
│   └── schema.prisma            # Schéma de base de données
├── server/                      # Logique serveur
│   ├── auth/                    # Services d'authentification
│   └── user/                    # Services utilisateur
├── stores/                      # Stores Zustand
│   └── auth/                    # Store d'authentification
├── types/                       # Types TypeScript
├── validations/                 # Schémas de validation Zod
└── templates/                   # Templates d'emails
```

## ✨ Fonctionnalités Implémentées

### 🔐 Système d'Authentification Complet
- **✅ Inscription sécurisée** avec validation email obligatoire
- **✅ Connexion robuste** avec gestion d'erreurs détaillée
- **✅ Vérification email** avec tokens temporaires
- **✅ Réinitialisation mot de passe** via email
- **✅ Sessions persistantes** avec middleware de protection
- **✅ Onboarding personnalisé** avec collecte de données utilisateur

### 👥 Gestion Utilisateur Avancée
- **✅ Profils utilisateur complets** (expériences, éducations, compétences)
- **✅ Système de rôles** (USER, ADMIN) avec permissions
- **✅ Gestion des nationalités** avec drapeaux
- **✅ Upload d'avatars** et photos de couverture
- **✅ Liens sociaux** et sites web personnels

### 📱 Système de Posts & Feed Social
- **✅ Création de posts** avec niveaux de visibilité (Public, Followers, Privé)
- **✅ Feed personnalisé** basé sur les abonnements
- **✅ Pagination infinie** avec curseurs optimisés
- **✅ Suppression de posts** (auteur uniquement)
- **✅ Métadonnées complètes** (auteur, date, visibilité)

### 🔔 Notifications Temps Réel
- **✅ Système de notifications** pour follows et nouveaux posts
- **✅ Notifications temps réel** via polling intelligent (5s)
- **✅ Son de notification** avec fallback synthétique
- **✅ Toast notifications** avec Sonner
- **✅ Badge de compteur** non lues en temps réel
- **✅ Gestion complète** (marquer lu, supprimer, tout marquer)

### 🤝 Système de Follow
- **✅ Follow/Unfollow utilisateurs** avec notifications automatiques
- **✅ Compteurs followers/following** en temps réel
- **✅ Feed basé sur les follows** avec posts des abonnements
- **✅ Indicateurs visuels** de statut de follow

### 🎨 Interface Utilisateur Moderne
- **✅ Design system cohérent** avec Tailwind CSS + shadcn/ui
- **✅ Mode sombre/clair** avec persistance
- **✅ Responsive design** mobile-first
- **✅ Animations fluides** et micro-interactions
- **✅ Navigation intuitive** avec sidebar et top navigation
- **✅ Gestion d'états** (loading, erreurs, succès)

## 🎨 Architecture & Design

### 🏗️ Architecture Technique
- **Architecture modulaire** avec séparation claire des responsabilités
- **API Routes** RESTful avec validation Zod
- **Middleware** de protection des routes avec redirection intelligente
- **State Management** avec Zustand et persistance
- **Real-time** via polling optimisé (5 secondes)

### 🎨 Design System
- **Palette de couleurs** moderne avec support mode sombre/clair
- **Typographie** élégante avec Playfair Display
- **Composants UI** cohérents via shadcn/ui + Radix UI
- **Icônes** uniformes avec Lucide React
- **Animations** fluides avec Framer Motion et CSS

### 📧 Système d'Emails
- **Templates HTML** responsive et modernes
- **Vérification email** obligatoire avec tokens sécurisés
- **Réinitialisation mot de passe** avec liens temporaires
- **Service Resend** pour délivrabilité optimale

### 🔒 Sécurité & Performance
- **Hachage bcryptjs** pour mots de passe
- **Validation Zod** sur toutes les entrées
- **Sessions sécurisées** avec tokens et expiration
- **Middleware de protection** des routes sensibles
- **Variables d'environnement** pour tous les secrets
- **Optimisation Prisma** avec requêtes efficaces

### 📱 Responsive & Accessibilité
- **Mobile-first** design avec breakpoints optimisés
- **Desktop** (1024px+) avec sidebar navigation
- **Tablet** (768px-1023px) avec interface adaptée
- **Mobile** (320px-767px) avec navigation bottom sheet

## 🚀 Scripts Disponibles

```bash
# Développement
pnpm dev              # Serveur de développement avec Turbopack

# Build
pnpm build            # Build de production
pnpm start            # Serveur de production

# Base de données
pnpm prisma:generate  # Générer le client Prisma
pnpm prisma:migrate   # Appliquer les migrations
pnpm prisma:studio    # Interface graphique DB

# Code Quality
pnpm lint             # Linter ESLint
pnpm format           # Formatter Prettier
```

## 🔄 Roadmap

### 🎯 Phase 1 - Fondations (En cours)
- [x] Authentification complète
- [x] Gestion des utilisateurs
- [x] Interface de base
- [ ] Système de profils avancé

### 🎯 Phase 2 - Communautés
- [ ] Création de communautés
- [ ] Système de modération
- [ ] Invitations et membres

### 🎯 Phase 3 - Collaboration
- [ ] Projets collaboratifs
- [ ] Système de matching
- [ ] Notifications en temps réel

### 🎯 Phase 4 - Fonctionnalités Avancées
- [ ] Messagerie privée
- [ ] Système de réputation
- [ ] Analytics et insights

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. **Fork** le projet
2. **Créez** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Committez** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez** une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

- **Développeur & Designer** : Mouhamed Lo

## 📞 Contact

- **Email** : m3dev4@gmail.com


---

**Fait avec ❤️ pour la communauté tech africaine francophone**
