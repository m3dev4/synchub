# ✨ SyncHub

> **La plateforme sociale authentique pour les passionnés de technologie en Afrique francophone**

![SyncHub Logo](./public/images/shlogo.png)

## 🌟 Présentation du Projet

SyncHub est une plateforme sociale pensée pour créer un espace authentique où les passionnés de technologie, qu'ils soient développeurs, designers, experts en cybersécurité ou créateurs du digital, peuvent se rencontrer, échanger et collaborer.

Ici, il ne s'agit pas seulement de publier des posts : les utilisateurs rejoignent de vraies communautés, participent à des discussions constructives, partagent leurs projets et trouvent des partenaires pour donner vie à leurs idées.

### 🎯 Mode de Fonctionnement

L'expérience repose sur l'interaction directe, la co-création et l'entraide. Chaque membre peut :

- **🏘️ Rejoindre ou créer** une communauté thématique
- **💡 Publier** ses idées, projets ou besoins de collaboration
- **🤝 Découvrir et échanger** avec des personnes partageant les mêmes centres d'intérêt
- **🚀 Participer** à des projets collectifs, allant de la conception à la réalisation

### 🔮 Vision

SyncHub aspire à devenir le carrefour numérique de l'Afrique francophone, où les passionnés de technologie se découvrent, apprennent et construisent ensemble.

Notre ambition est de sortir des réseaux sociaux classiques basés sur les hashtags et la superficialité pour offrir un lieu d'authenticité, d'innovation et de collaboration réelle.

**En un mot, SyncHub veut être la plateforme où les talents se rencontrent pour façonner le futur du digital en Afrique et au-delà.**

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
- **Database**: PostgreSQL (Supabase)
- **ORM**: [Prisma](https://prisma.io)
- **Authentication**: [Better Auth](https://better-auth.com)
- **Email Service**: [Resend](https://resend.com)
- **API**: Next.js API Routes

### DevTools & Quality
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript strict mode

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

## 🔐 Fonctionnalités Implémentées

### ✅ Authentification
- **Inscription** avec validation email
- **Connexion** avec gestion d'erreurs
- **Vérification email** avec tokens
- **Réinitialisation mot de passe**
- **OAuth** (GitHub, Google)
- **Sessions** persistantes

### ✅ Gestion Utilisateur
- **Profils utilisateur** complets
- **Rôles** (USER, ADMIN)
- **Onboarding** personnalisé
- **Gestion des sessions**

### ✅ Interface Utilisateur
- **Design responsive** avec Tailwind CSS
- **Mode sombre/clair** avec next-themes
- **Composants UI** modernes (Radix UI)
- **Animations** fluides
- **Gestion d'erreurs** visuelle

## 🎨 Design System

Le projet utilise un design system basé sur :
- **Couleurs** : Palette personnalisée avec support du mode sombre
- **Typographie** : Playfair Display pour les titres
- **Composants** : Bibliothèque shadcn/ui
- **Icônes** : Lucide React pour la cohérence
- **Animations** : Transitions CSS et Framer Motion

## 📧 Système d'Emails

Intégration complète avec Resend pour :
- **Vérification d'email** lors de l'inscription
- **Réinitialisation de mot de passe**
- **Templates HTML** personnalisés
- **Gestion d'erreurs** robuste

## 🔒 Sécurité

- **Hachage des mots de passe** avec bcryptjs
- **Validation des données** avec Zod
- **Protection CSRF** intégrée
- **Sessions sécurisées** avec Better Auth
- **Variables d'environnement** pour les secrets

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour :
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

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
