// Contenu du site : infos de la residence et scenario de la conversation, separes de la presentation.
// Les elements marques "a confirmer" dans brief/infos.md doivent etre valides avec l'etablissement.

export type Photo = {
  src: string;
  largeur: number;
  hauteur: number;
  alt: string;
};

export const residence = {
  nom: "Light Résidence",
  ville: "Abidjan",
  slogan: "Le confort poussé à son comble.",
  // Mots surlignes du slogan dans le titre
  sloganAvant: "Le confort poussé",
  sloganSurligne: "à son comble.",
  presentation:
    "Appartements et résidences meublés à Abidjan, pour un court, un moyen ou un long séjour. Discutez avec nous : la réservation se prépare au fil de la conversation.",
  description:
    "Appartements et résidences meublés à Abidjan : studio américain, 2 pièces, 3 pièces et villa. Équipés, calmes, propres et sécurisés, à partir de 20 000 F les 24 heures.",
  valeurs: ["Équipé", "Calme", "Propre", "Paisible", "Sécurisé"],
  logo: { src: "/images/logo-recadre.jpg", largeur: 744, hauteur: 460, alt: "Logo Light Résidence" },
} as const;

const NUMERO_WHATSAPP = "2250759573929";
export const contact = {
  whatsappAffiche: "07 59 57 39 29",
  telephoneAffiche: "05 46 82 34 44",
  telephoneLien: "tel:+2250546823444",
  // Lien WhatsApp avec un message deja redige
  whatsapp: (message: string) => `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(message)}`,
  messageParDefaut: "Bonjour Light Résidence, je souhaite réserver un appartement.",
} as const;

export const photos = {
  salon: {
    src: "/images/salon-plafond-led-bleu.jpg",
    largeur: 720,
    hauteur: 960,
    alt: "Salon avec canapés en velours bleu et plafond éclairé par des LED bleues",
  },
  sejour: {
    src: "/images/salon-led-bleu-salle-a-manger.jpg",
    largeur: 720,
    hauteur: 960,
    alt: "Séjour ouvert : salon bleu et salle à manger éclairés en LED",
  },
  salleJour: {
    src: "/images/salle-a-manger-jour.jpg",
    largeur: 720,
    hauteur: 960,
    alt: "Salle à manger en lumière du jour, table en verre et quatre chaises blanches",
  },
  salleLed: {
    src: "/images/salle-a-manger-led-verte.jpg",
    largeur: 720,
    hauteur: 960,
    alt: "La même salle à manger éclairée par des LED vertes",
  },
} satisfies Record<string, Photo>;

// ---------- Conversation ----------
// Le texte peut contenir des passages en **gras**.
export type MessageResidence =
  | { type: "texte"; texte: string }
  | { type: "photo"; photo: Photo; legende?: string }
  | { type: "comparateur"; avant: Photo; apres: Photo; etiquettes: [string, string]; label: string }
  | { type: "prix"; label: string; valeur: string; unite: string };

export const entete = {
  nom: "Light Résidence",
  statut: "Réservation sur WhatsApp",
  appeler: "Appeler",
  date: "Aujourd'hui",
} as const;

export const logements = ["Studio américain", "2 pièces", "3 pièces", "Villa"] as const;
export const durees = ["Court séjour", "Moyen séjour", "Long séjour"] as const;
export type Logement = (typeof logements)[number];
export type Duree = (typeof durees)[number];

export const menu = [
  { id: "visite", label: "Faire la visite" },
  { id: "prix", label: "C'est combien ?" },
  { id: "logements", label: "Quels logements ?" },
  { id: "reserver", label: "Réserver", principal: true },
] as const;
export type Sujet = (typeof menu)[number]["id"];

export const scenario = {
  accueil: [
    { type: "texte", texte: "Bonjour, bienvenue chez **Light Résidence**." },
    { type: "texte", texte: "Vous cherchez un appartement meublé calme, propre et bien placé à Abidjan ?" },
    { type: "photo", photo: photos.salon, legende: "Le salon, LED allumées" },
    { type: "texte", texte: "Je vous fais visiter ?" },
  ],
  visite: [
    { type: "photo", photo: photos.sejour, legende: "Le séjour, ouvert sur la salle à manger" },
    { type: "texte", texte: "La salle à manger change d'ambiance avec la lumière. Faites glisser pour comparer :" },
    {
      type: "comparateur",
      avant: photos.salleJour,
      apres: photos.salleLed,
      etiquettes: ["Jour", "LED"],
      label: "Comparer la salle à manger de jour et sous les LED",
    },
    { type: "texte", texte: "Tous nos logements sont **équipés, calmes, propres, paisibles et sécurisés**." },
  ],
  prix: [
    { type: "prix", label: "À partir de", valeur: "20 000 F", unite: "les 24 heures" },
    { type: "texte", texte: "Court, moyen ou long séjour : demandez-nous le tarif exact pour votre durée." },
  ],
  logements: [
    { type: "texte", texte: "Nous proposons des studios américains, des 2 pièces, des 3 pièces et des villas." },
    { type: "texte", texte: "Lequel vous intéresse ?" },
  ],
  questionLogement: [{ type: "texte", texte: "Avec plaisir. Quel logement souhaitez-vous ?" }],
  questionDuree: [{ type: "texte", texte: "Pour combien de temps ?" }],
} satisfies Record<string, MessageResidence[]>;

// Reponse de la residence apres le choix d'un logement
export const confirmationLogement = (l: Logement) =>
  l === "Villa" ? "Très bon choix pour une famille ou un groupe." : `Noté, ${l.toLowerCase()}.`;

export const demande = {
  titre: "Votre demande",
  libelles: { logement: "Logement", sejour: "Séjour", tarif: "Tarif" },
  tarif: "à partir de 20 000 F / 24 h",
  bouton: "Envoyer sur WhatsApp",
  modifier: "Modifier ma demande",
  revoir: "Revoir la visite",
  message: (l: Logement, d: Duree) => `Bonjour Light Résidence, je souhaite réserver : ${l}, ${d.toLowerCase()}.`,
} as const;

export const signature = "Proposition de site réalisée par Digifaz";
