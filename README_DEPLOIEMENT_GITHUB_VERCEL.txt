WAY2SPEED — DÉPLOIEMENT GITHUB + VERCEL
======================================

ÉTAPE 1 — CRÉER LE DÉPÔT SUR GITHUB
---------------------------------
1. Ouvre : https://github.com/new
2. Repository name : way2speed
3. Visibility : Public (ou Private si tu préfères restreindre le code source)
4. README : ne pas cocher pour démarrer sur un dépôt vide
5. Clique sur Create repository.

ÉTAPE 2 — ENVOYER LES FICHIERS SUR GITHUB
----------------------------------------
1. Décompresse l’archive way2speed-site-vercel-github.zip.
2. Ouvre le dossier way2speed-site qui apparaît après extraction.
3. Dans le dépôt GitHub, choisis Uploading an existing file ou Add file > Upload files.
4. Glisse le CONTENU du dossier way2speed-site sur la page, pas le dossier parent ni le ZIP.
   Le fichier index.html doit être directement à la racine du dépôt.
   Le répertoire assets doit conserver tous ses fichiers.
5. En bas, indique un message de commit : Initial Way2Speed site.
6. Clique sur Commit changes.

ÉTAPE 3 — RELIER VERCEL ET GITHUB
--------------------------------
1. Ouvre : https://vercel.com/new
2. Connecte-toi si nécessaire (GitHub est pratique).
3. Clique sur Add GitHub Account si demandé, et autorise Vercel.
4. Cherche le dépôt way2speed, puis Import.

ÉTAPE 4 — CONFIGURER LE DÉPLOIEMENT
---------------------------------
1. Project Name : way2speed
2. Framework Preset : Other
3. Root Directory : ./ (racine du dépôt)
4. Build Command : vide / aucun
5. Output Directory : . (racine — pris en charge par vercel.json)
6. Clique sur Deploy.

ÉTAPE 5 — OUVRIR LE SITE
-----------------------
- Patiente jusqu’au statut Ready.
- Vercel attribue une URL de type https://way2speed-XXXX.vercel.app
- À chaque modification enregistrée dans la branche main sur GitHub,
  Vercel peut redéployer automatiquement le site.

NOTES
-----
- Rien à installer sur l’ordinateur : uniquement navigateur + comptes GitHub et Vercel.
- La vidéo YouTube nécessite Internet et dépend des règles d’autoplay / embed du navigateur.
- Les 2 cartes artistes ouvrent leur Instagram au clic.
- Les liens du bloc Rejoins le Way2Crew ! sont déjà intégrés.
