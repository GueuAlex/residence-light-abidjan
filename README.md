# Light Résidence · site vitrine

Proposition de site pour **Light Résidence**, appartements et résidences meublés à Abidjan (studio américain, 2 pièces, 3 pièces, villa).

- **Démo** : https://residence-light-abidjan.vercel.app (non indexée par les moteurs de recherche)
- **Approche** : piste B « Conversation ». Le site est une discussion : la résidence écrit, montre ses pièces (avec un comparateur jour / LED), annonce son prix ; le visiteur répond par réponses rapides et repart avec sa demande rédigée sur WhatsApp. Les maquettes des trois pistes sont dans `docs/maquettes/`.
- Proposition de site réalisée par **Digifaz**.

## Stack
Next.js 16 (App Router, TypeScript) · Tailwind CSS 4. Aucune librairie d'animation : les apparitions sont en CSS.

## Commandes
```bash
pnpm install
pnpm dev --port 3003
pnpm lint
pnpm build
```

## Organisation
- `src/content/site.ts` : **tout le contenu**, y compris le scénario de la conversation (messages, réponses rapides, logements, durées, message WhatsApp). C'est le seul fichier à modifier pour changer une information.
- `src/components/conversation/moteur.ts` : déroulé de la discussion (indicateur de frappe, réponses rapides, choix du visiteur).
- `src/components/conversation/Bulles.tsx` : les bulles (texte, photo, comparateur, prix, carte de demande).
- `src/components/layout/` : panneau de marque (ordinateur) et pied de page.
- `src/app/globals.css` : tokens du thème.
- `brief/infos.md` : brief et infos manquantes à faire confirmer.
