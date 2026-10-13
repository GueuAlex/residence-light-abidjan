# Light Résidence : site vitrine

> Ce site fait partie de l'espace de travail `sites/`. Les règles globales sont dans `../README.md` et `../CLAUDE.md`.
> Ce fichier ne contient que ce qui est propre à ce site.

## Fiche
- Établissement : Light Résidence, appartements et résidences meublés (studio américain, 2 pièces, 3 pièces, villa)
- Type, ville : résidence meublée, Abidjan (quartier inconnu)
- Statut : en ligne (démo à proposer au propriétaire)
- Repo : https://github.com/GueuAlex/residence-light-abidjan
- Démo : https://residence-light-abidjan.vercel.app
- Brief : `brief/infos.md`

## Direction artistique
À la demande de l'utilisateur, ce site change **d'approche UI/UX**, pas seulement de couleurs (règle 7 du README). Les trois pistes de `docs/maquettes/` (sommaire : `index.html`) sont trois façons d'utiliser le site, toutes tirées des plafonds LED de la résidence et de sa réservation par WhatsApp :
- **A · Interrupteur** : interface de maison connectée. La résidence est dans le noir ; un interrupteur allume la LED et le salon. Ensuite, un tableau de bord permet de choisir l'ambiance (jour, bleu nuit, vert lagon, avec les vraies photos), le logement et la durée ; tout le site prend la couleur choisie et le message WhatsApp se compose. Sora + IBM Plex Mono ; graphite, or, néons.
- **B · Conversation** : le site est une discussion. La résidence écrit, montre ses pièces, propose un comparateur jour / LED dans une bulle, annonce le prix ; le visiteur répond par réponses rapides et repart avec une carte « Votre demande » envoyée sur WhatsApp. Gloock + Hanken Grotesk ; sable, encre, or.
- **C · Stories** : lecteur de stories plein écran (barres de progression, tap, appui long, clavier). Logo dessiné, salon en zoom lent, salle à manger qui passe du jour aux LED vertes avec un flash, valeurs mot par mot, prix plein écran. Sur ordinateur : lecteur centré, fond flou, sommaire. Big Shoulders Display + Figtree ; nuit, or, bleu et vert LED.

**Validée : piste B · Conversation** (2026-10-13)
- Concept : le site est une discussion avec la résidence, qui débouche sur une demande rédigée sur WhatsApp, son seul canal de réservation.
- Palette (tokens dans `src/app/globals.css`) : `sable` #F6F1E7, `papier` #FFFDF8, `encre` #141414, `gris` #6D675D, `or` #ECC23A, `or-fonce` #8A6A00 (petits textes, AA).
- Typographies : Gloock (titres, prix) et Hanken Grotesk (messages, interface).
- Expérience :
  - ordinateur : panneau de marque à gauche (logo, slogan surligné, valeurs qui défilent), conversation à droite ;
  - mobile : conversation plein écran, avec une carte de visite (logo, slogan) en tête du fil ;
  - la résidence « écrit » (trois points), puis envoie textes, photos, un comparateur jour / LED de la salle à manger et le prix ;
  - réponses rapides : « Faire la visite », « C'est combien ? », « Quels logements ? », « Réserver » ; les sujets déjà vus disparaissent ;
  - réservation : logement puis durée, puis carte « Votre demande » avec le lien WhatsApp prérédigé. Rien n'est collecté.

## Contraintes propres à ce site
- Photos fournies en 720 px. La piste C les affiche en plein écran sur mobile, ce qui passe à cette taille ; sur ordinateur, elles restent dans le lecteur 9:16.
- `salle-a-manger-jour.jpg` et `salle-a-manger-led-verte.jpg` montrent la même pièce : c'est le ressort de l'effet jour / LED des trois pistes.
- Le logo n'existe qu'en JPG sur fond blanc, avec les numéros. Il est recadré dans `docs/maquettes/assets/logo-recadre.jpg` ; les toits sont redessinés en SVG pour les fonds sombres (à faire valider, demander le vectoriel).
- Quartier inconnu : n'écrire que « Abidjan ». Aucun avis.
- Seul tarif connu : à partir de 20 000 F / 24 h.

## Stack et commandes
- Stack : Next.js 16.4, Tailwind 4.3. Polices par `next/font/google` ; celles de l'image de partage par `@fontsource` (.woff lus au build).
- Le scénario est dans `src/content/site.ts` ; `src/components/conversation/moteur.ts` le déroule (délais, réponses, choix). Les premiers messages s'écrivent plus vite (`vitesse` 0,55) pour afficher tôt la photo d'accueil.
- Maquettes : `preview_start` avec la config `light-maquettes` (port 4103) de `../.claude/launch.json`
- Dev : `preview_start` avec la config `light-dev` (port 3003)
- `pnpm dev` · `pnpm build` · `pnpm lint`

## Exceptions aux règles globales
- **Ni GSAP, ni Lenis, ni Motion** (décidé le 2026-10-13) : la conversation n'a ni défilement scénarisé ni timeline, et le fil défile dans son propre conteneur. Les apparitions (bulles, frappe, défilé des valeurs) sont en CSS, ce qui allège le site.

## Journal de session
> Entrée la plus récente en haut. Chaque entrée indique la date, le travail fait, les décisions et la **prochaine étape précise**.

### 2026-10-13 (2)
- Fait :
  - piste B « Conversation » validée par l'utilisateur ;
  - site Next.js : panneau de marque, conversation (moteur de scénario, bulles texte, photo, comparateur, prix, carte de demande), pied de page, favicon, image de partage (conversation en cours) ;
  - parcours complet vérifié en desktop et en mobile (accueil, visite, prix, réservation jusqu'au lien WhatsApp prérédigé) ; lint et build OK ;
  - Lighthouse mobile sur la démo : performance 96 à 98, accessibilité 100, bonnes pratiques 100 ; LCP 2,0 à 2,3 s ; CLS 0 ;
  - repo GitHub créé et démo déployée sur Vercel.
- Décisions : pas de librairie d'animation (voir les exceptions).
- Point ouvert : `vercel git connect` attend que l'utilisateur autorise le repo dans l'application GitHub de Vercel ; d'ici là, redéployer avec `vercel --prod --yes` après chaque push.
- Prochaine étape : l'utilisateur envoie le lien au propriétaire. Ensuite, intégrer les infos manquantes (quartier, tarifs par type et par durée, rôle du 05 46 82 34 44, logo vectoriel, photos HD) dans `src/content/site.ts`, et ajouter des sujets à la conversation si besoin (« C'est où ? » dès que le quartier est connu).

### 2026-10-13 (1)
- Fait :
  - dossier créé, logo et 4 photos rangés dans `brief/sources/` ;
  - recherches en ligne : quasiment aucune présence indexée (voir le brief) ;
  - brief rempli avec ses sources ;
  - 3 maquettes d'approches UI/UX différentes et leur sommaire dans `docs/maquettes/`, vérifiées en desktop et en mobile 375 px (captures Chrome headless, interactions testées : interrupteur, ambiances, parcours de réservation du chat, navigation des stories) ;
  - config `light-maquettes` ajoutée à `../.claude/launch.json` ;
  - règle 7 ajoutée au README : changer d'approche UI/UX à chaque site.
- Décisions : nom de dossier, de repo et de projet Vercel : `residence-light-abidjan`.
- Prochaine étape : obtenir la validation d'une piste (ou d'un mélange), puis initialiser Next.js (`git init`, repo GitHub, port 3003). En parallèle, l'utilisateur récupère les infos manquantes, en priorité le quartier et les tarifs par type.
