"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Maisons } from "@/components/ui/Icones";
import { contact, entete, residence } from "@/content/site";
import { BulleResidence, Bulle, CarteDemande, Ecrit } from "./Bulles";
import { creerMoteur, type Message, type Reponse } from "./moteur";

export function Conversation() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [ecrit, setEcrit] = useState(false);
  const [reponses, setReponses] = useState<Reponse[]>([]);
  const fil = useRef<HTMLDivElement>(null);

  // Le moteur demarre au montage et s'arrete au demontage
  useEffect(() => {
    const moteur = creerMoteur({
      ajouter: (m) => setMessages((liste) => [...liste, m]),
      ecrire: setEcrit,
      proposer: setReponses,
      reduit: matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
    moteur.demarrer();
    return () => moteur.arreter();
  }, []);

  // Le fil descend a chaque nouveau message ou image chargee
  const descendre = useCallback(() => {
    const el = fil.current;
    if (!el) return;
    const doux = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: el.scrollHeight, behavior: doux ? "smooth" : "auto" });
  }, []);
  useEffect(descendre, [messages, ecrit, descendre]);

  return (
    <main aria-label="Conversation avec Light Résidence" className="sticky top-0 flex h-svh flex-col bg-papier md:border-l md:border-ligne">
      <header className="z-10 flex items-center gap-3 border-b border-ligne bg-papier/90 px-5 py-3.5 backdrop-blur">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-encre">
          <Maisons className="w-[30px]" />
        </span>
        <span>
          <b className="block">{entete.nom}</b>
          <small className="text-[13px] text-gris">{entete.statut}</small>
        </span>
        <a href={contact.telephoneLien} className="ml-auto rounded-full border border-ligne px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-encre hover:text-sable">
          {entete.appeler}
        </a>
      </header>

      <div ref={fil} role="log" aria-live="polite" aria-label="Messages" className="fond-points flex flex-1 flex-col gap-2 overflow-y-auto px-5 pb-3 pt-6">
        {/* Carte de visite en tete du fil sur mobile (le panneau de marque est masque) */}
        <div className="pop mb-2.5 rounded-[22px] bg-white p-4 text-center shadow-[0_8px_24px_rgb(20_20_20/0.06)] md:hidden">
          <Image src={residence.logo.src} alt={residence.logo.alt} width={residence.logo.largeur} height={residence.logo.hauteur} loading="eager" sizes="70vw" className="mx-auto mb-2 w-[70%]" />
          <h1 className="font-titre text-[30px] leading-[1.02]">{residence.slogan}</h1>
        </div>
        <span className="mb-2 self-center rounded-full bg-sable px-3 py-1 text-xs text-gris">{entete.date}</span>

        {messages.map((m) => {
          if (m.auteur === "moi")
            return (
              <Bulle key={m.id} moi>
                {m.texte}
              </Bulle>
            );
          if (m.contenu.type === "demande") return <CarteDemande key={m.id} logement={m.contenu.logement} duree={m.contenu.duree} />;
          return <BulleResidence key={m.id} contenu={m.contenu} onCharge={descendre} />;
        })}
        {ecrit && <Ecrit />}
      </div>

      <div aria-label="Réponses rapides" className="flex min-h-[70px] gap-2 overflow-x-auto border-t border-ligne bg-papier px-5 pb-[calc(14px+env(safe-area-inset-bottom))] pt-3 [scrollbar-width:none]">
        {reponses.map((r, i) => (
          <button
            key={r.label}
            type="button"
            onClick={r.action}
            style={{ animationDelay: `${i * 0.05}s` }}
            className={`pop shrink-0 rounded-full border-[1.5px] px-4 py-2.5 text-[15px] font-semibold transition-colors ${
              r.principal ? "border-or bg-or hover:border-encre" : "border-encre bg-white hover:bg-encre hover:text-sable"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
    </main>
  );
}
