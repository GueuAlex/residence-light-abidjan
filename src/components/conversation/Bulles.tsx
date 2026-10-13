"use client";

import Image from "next/image";
import { useState, type CSSProperties, type ReactNode } from "react";
import { IconeWhatsapp } from "@/components/ui/Icones";
import { contact, demande, type Duree, type Logement, type MessageResidence, type Photo } from "@/content/site";

const TAILLE_PHOTO = "(min-width: 768px) 440px, 86vw";

// Bulle de base : residence a gauche, visiteur a droite
export function Bulle({ moi = false, className = "", children }: { moi?: boolean; className?: string; children: ReactNode }) {
  return (
    <div
      className={`pop max-w-[86%] shadow-[0_2px_0_rgb(20_20_20/0.06),0_8px_24px_rgb(20_20_20/0.05)] md:max-w-[min(78%,440px)] ${
        moi
          ? "origin-bottom-right self-end rounded-[20px_20px_6px_20px] bg-encre px-[15px] py-[11px] text-sable"
          : "origin-bottom-left rounded-[20px_20px_20px_6px] bg-white"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Transforme les passages **en gras** en <b>
function Texte({ texte }: { texte: string }) {
  return (
    <>
      {texte.split("**").map((morceau, i) => (i % 2 ? <b key={i}>{morceau}</b> : morceau))}
    </>
  );
}

function BullePhoto({ photo, legende, onCharge }: { photo: Photo; legende?: string; onCharge: () => void }) {
  return (
    <Bulle className="w-[86%] p-1.5 md:w-[min(78%,440px)]">
      <figure>
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.largeur}
          height={photo.hauteur}
          sizes={TAILLE_PHOTO}
          onLoad={onCharge}
          className="aspect-[4/4.6] w-full rounded-[15px] object-cover"
        />
        {legende && <figcaption className="px-2 pb-1 pt-2 text-sm text-gris">{legende}</figcaption>}
      </figure>
    </Bulle>
  );
}

// Comparateur jour / LED : la photo du dessus se decoupe selon le curseur
function BulleComparateur({ contenu, onCharge }: { contenu: Extract<MessageResidence, { type: "comparateur" }>; onCharge: () => void }) {
  const [position, setPosition] = useState(50);
  return (
    <Bulle className="w-[86%] p-1.5 md:w-[min(78%,440px)]">
      <div className="relative aspect-[3/4] touch-pan-y select-none overflow-hidden rounded-[15px]" style={{ "--pos": `${position}%` } as CSSProperties}>
        <Image src={contenu.avant.src} alt={contenu.avant.alt} fill sizes={TAILLE_PHOTO} onLoad={onCharge} className="pointer-events-none object-cover" />
        <Image
          src={contenu.apres.src}
          alt={contenu.apres.alt}
          fill
          sizes={TAILLE_PHOTO}
          className="pointer-events-none object-cover [clip-path:inset(0_0_0_var(--pos))]"
        />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-encre/70 px-2.5 py-1 text-xs text-white">{contenu.etiquettes[0]}</span>
        <span className="absolute right-2.5 top-2.5 rounded-full bg-encre/70 px-2.5 py-1 text-xs text-white">{contenu.etiquettes[1]}</span>
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-(--pos) w-0.5 -translate-x-px bg-white" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-(--pos) top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-sm font-bold shadow-[0_6px_18px_rgb(0_0_0/0.3)]"
        >
          ⇆
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={contenu.label}
          className="absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
      </div>
    </Bulle>
  );
}

function BullePrix({ contenu }: { contenu: Extract<MessageResidence, { type: "prix" }> }) {
  return (
    <Bulle className="border-l-4 border-or px-5 py-[18px]">
      <span className="eyebrow">{contenu.label}</span>
      <p className="my-1.5 font-titre text-[46px] leading-none">{contenu.valeur}</p>
      <small className="text-gris">{contenu.unite}</small>
    </Bulle>
  );
}

// Carte recapitulative : le message WhatsApp est redige avec les choix du visiteur
export function CarteDemande({ logement, duree }: { logement: Logement; duree: Duree }) {
  const lignes: [string, string][] = [
    [demande.libelles.logement, logement],
    [demande.libelles.sejour, duree.toLowerCase()],
    [demande.libelles.tarif, demande.tarif],
  ];
  return (
    <Bulle className="w-[86%] p-[18px] md:w-[min(78%,440px)]">
      <h3 className="mb-2.5 font-titre text-[26px] font-normal">{demande.titre}</h3>
      <dl className="mb-3.5 grid grid-cols-[auto_1fr] gap-x-3.5 gap-y-1.5 text-[15px]">
        {lignes.map(([cle, valeur]) => (
          <div key={cle} className="contents">
            <dt className="text-gris">{cle}</dt>
            <dd>{valeur}</dd>
          </div>
        ))}
      </dl>
      <a
        href={contact.whatsapp(demande.message(logement, duree))}
        className="flex items-center justify-center gap-2.5 rounded-[14px] bg-or p-3.5 font-bold transition-transform hover:-translate-y-0.5"
      >
        <IconeWhatsapp className="size-5" />
        {demande.bouton}
      </a>
    </Bulle>
  );
}

// Choisit la bulle adaptee au type de message de la residence
export function BulleResidence({ contenu, onCharge }: { contenu: MessageResidence; onCharge: () => void }) {
  switch (contenu.type) {
    case "texte":
      return (
        <Bulle className="px-[15px] py-[11px]">
          <Texte texte={contenu.texte} />
        </Bulle>
      );
    case "photo":
      return <BullePhoto photo={contenu.photo} legende={contenu.legende} onCharge={onCharge} />;
    case "comparateur":
      return <BulleComparateur contenu={contenu} onCharge={onCharge} />;
    case "prix":
      return <BullePrix contenu={contenu} />;
  }
}

// Indicateur "en train d'ecrire"
export function Ecrit() {
  return (
    <div aria-hidden="true" className="ecrit pop inline-flex gap-[5px] self-start rounded-[20px_20px_20px_6px] bg-white px-4 py-3.5 shadow-[0_2px_0_rgb(20_20_20/0.06)]">
      <i className="size-[7px] rounded-full bg-gris" />
      <i className="size-[7px] rounded-full bg-gris" />
      <i className="size-[7px] rounded-full bg-gris" />
    </div>
  );
}
