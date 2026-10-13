import {
  confirmationLogement,
  durees,
  logements,
  menu,
  scenario,
  type Duree,
  type Logement,
  type MessageResidence,
  type Sujet,
} from "@/content/site";

// Messages affiches dans le fil
export type Message =
  | { id: number; auteur: "residence"; contenu: MessageResidence }
  | { id: number; auteur: "residence"; contenu: { type: "demande"; logement: Logement; duree: Duree } }
  | { id: number; auteur: "moi"; texte: string };

export type Reponse = { label: string; principal?: boolean; action: () => void };

type Branchements = {
  ajouter: (m: Message) => void;
  ecrire: (enCours: boolean) => void;
  proposer: (reponses: Reponse[]) => void;
  reduit: boolean;
};

// Deroule le scenario : la residence "ecrit", envoie ses messages, puis propose des reponses rapides.
// Aucune donnee n'est collectee : les choix servent seulement a rediger le message WhatsApp.
export function creerMoteur({ ajouter, ecrire, proposer, reduit }: Branchements) {
  let actif = true;
  let compteur = 0;
  const vus = new Set<Sujet>();
  const choix: { logement?: Logement; duree?: Duree } = {};

  const pause = (ms: number) => new Promise((r) => setTimeout(r, reduit ? Math.min(ms, 60) : ms));
  // Un texte s'ecrit vite, une photo prend un peu plus de temps
  const delai = (m: MessageResidence) => (m.type === "texte" ? 650 : 950);

  // vitesse < 1 : la residence ecrit plus vite (accueil, pour afficher vite la premiere photo)
  async function dire(liste: MessageResidence[], vitesse = 1) {
    for (const m of liste) {
      if (!actif) return;
      ecrire(true);
      await pause(delai(m) * vitesse);
      if (!actif) return;
      ecrire(false);
      ajouter({ id: ++compteur, auteur: "residence", contenu: m });
      await pause(250);
    }
  }

  // Chaque reponse rapide s'affiche comme un message du visiteur avant son action
  function offrir(liste: Reponse[]) {
    proposer(
      liste.map((r) => ({
        ...r,
        action: async () => {
          proposer([]);
          ajouter({ id: ++compteur, auteur: "moi", texte: r.label });
          await pause(300);
          if (actif) r.action();
        },
      })),
    );
  }

  const sujets: Record<Sujet, () => Promise<void>> = {
    visite: async () => {
      vus.add("visite");
      await dire(scenario.visite);
      afficherMenu();
    },
    prix: async () => {
      vus.add("prix");
      await dire(scenario.prix);
      afficherMenu();
    },
    logements: async () => {
      vus.add("logements");
      await dire(scenario.logements);
      choisirLogement(afficherMenu);
    },
    reserver: async () => {
      if (choix.logement) return choisirDuree();
      await dire(scenario.questionLogement);
      choisirLogement(choisirDuree);
    },
  };

  function afficherMenu() {
    if (!actif) return;
    offrir(
      menu
        .filter((m) => m.id === "reserver" || !vus.has(m.id))
        .map((m) => ({ label: m.label, principal: "principal" in m, action: sujets[m.id] })),
    );
  }

  function choisirLogement(ensuite: () => void) {
    if (!actif) return;
    offrir(
      logements.map((l) => ({
        label: l,
        action: async () => {
          choix.logement = l;
          await dire([{ type: "texte", texte: confirmationLogement(l) }]);
          ensuite();
        },
      })),
    );
  }

  async function choisirDuree() {
    await dire(scenario.questionDuree);
    if (!actif) return;
    offrir(
      durees.map((d) => ({
        label: d,
        action: async () => {
          choix.duree = d;
          await recapituler();
        },
      })),
    );
  }

  async function recapituler() {
    ecrire(true);
    await pause(1000);
    if (!actif || !choix.logement || !choix.duree) return;
    ecrire(false);
    ajouter({ id: ++compteur, auteur: "residence", contenu: { type: "demande", logement: choix.logement, duree: choix.duree } });
    offrir([
      {
        label: "Modifier ma demande",
        action: () => {
          choix.logement = undefined;
          sujets.reserver();
        },
      },
      { label: "Revoir la visite", action: sujets.visite },
    ]);
  }

  return {
    async demarrer() {
      await dire(scenario.accueil, 0.55);
      afficherMenu();
    },
    arreter() {
      actif = false;
    },
  };
}
