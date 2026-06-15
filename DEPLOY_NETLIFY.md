# Déploiement sur Netlify

Ce guide explique comment publier ce projet Next.js sur Netlify avec un domaine personnalisé.

## 1. Vérifier la configuration

- Le repo doit contenir `netlify.toml`
- Le package `@netlify/plugin-nextjs` doit être installé
- La commande de build doit être `npm run build`
- Le répertoire de publication doit être `.netlify/output`

## 2. Push sur GitHub

1. Commits tes changements locaux
2. Pousse sur le repo GitHub connecté à Netlify

## 3. Créer un site Netlify

1. Va sur https://app.netlify.com/
2. Clique sur **"New site from Git"**
3. Sélectionne GitHub et ton dépôt
4. Vérifie les paramètres de build :
   - Build command : `npm run build -- --webpack`
   - Publish directory : `.netlify/output`
   - Base directory : laisse vide si ton application est à la racine du dépôt
5. Clique sur **Deploy site**

## 4. Variables d'environnement Netlify

Ajoute ces variables dans Netlify > Site settings > Build & deploy > Environment > Environment variables :

- `DATABASE_URL` = connection string PostgreSQL
- `AUTH_SECRET` = clé secrète (ex. `openssl rand -base64 32`)
- `AUTH_URL` = `https://ton-site.netlify.app`
- `NEXT_PUBLIC_APP_URL` = `https://ton-site.netlify.app`
- `PAYSTACK_SECRET_KEY` = `sk_live_...`
- `PAYSTACK_PUBLIC_KEY` = `pk_live_...`
- `PAYSTACK_CURRENCY` = `NGN` ou `XAF`
- `PAYSTACK_USD_TO_NGN` = `1600`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` = `TemplateHub CM <noreply@ton-domaine.com>`
- `COMMISSION_RATE` = `0.25`

> Si tu ne veux pas activer certains services de suite, le site se déploiera toujours, mais certaines fonctions (upload, email, paiement) ne marcheront pas sans clés valides.

## 5. Configurer le domaine personnalisé

1. Dans Netlify, va dans **Domain settings**
2. Ajoute ton nom de domaine personnalisé
3. Copie les enregistrements DNS fournis par Netlify
4. Colle-les chez ton registrar
5. Attends la propagation DNS et que Netlify active le SSL

## 6. Vérifier le site

- Ouvre l’URL Netlify ou ton domaine personnalisé
- Vérifie la page d’accueil
- Vérifie `/templates`
- Vérifie `/login` et `/register`
- Vérifie que les variables d’environnement sont bien prises en compte

## 7. Remarque importante

Ce projet utilise une base de données PostgreSQL accessible à l’exécution. Si Netlify ne peut pas atteindre `DATABASE_URL` au runtime, les pages qui font des requêtes serveur échoueront.

Assure-toi que ta base de données est en ligne et autorise les connexions depuis le déploiement Netlify.
