# Configuration Cloudinary pour SyncHub

## Variables d'environnement requises

**IMPORTANT** : Créez un fichier `.env.local` à la racine du projet avec ces variables :

```env
# Cloudinary Configuration - utilisez VOS noms de variables
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_KEY_SECRET=your_api_secret
```

✅ **SOLUTION FINALE** : Utilisez les noms de variables que VOUS avez choisis dans votre .env.local

## Comment obtenir vos clés Cloudinary

1. Créez un compte sur [Cloudinary](https://cloudinary.com/)
2. Allez dans votre Dashboard
3. Copiez les valeurs suivantes :
   - **Cloud Name** : Votre nom de cloud unique
   - **API Key** : Votre clé API publique
   - **API Secret** : Votre clé secrète (gardez-la privée)

## Structure des dossiers Cloudinary

Les images seront organisées comme suit :
- `synchub/avatars/` : Photos de profil des utilisateurs
- `synchub/covers/` : Photos de couverture (pour usage futur)

## Fonctionnalités implémentées

✅ Upload d'avatar avec redimensionnement automatique (400x400px)
✅ Optimisation automatique de la qualité et du format
✅ Suppression automatique de l'ancienne image lors du changement
✅ Validation des types de fichiers (images uniquement)
✅ Limite de taille : 5MB maximum
✅ Interface utilisateur intuitive avec aperçu

## Sécurité

- Les clés API sont stockées côté serveur uniquement
- Validation des fichiers côté client et serveur
- Limitation de taille pour éviter les abus
- Transformation automatique pour optimiser les performances
