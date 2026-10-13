import { contact, residence, signature } from "@/content/site";

export function PiedDePage() {
  return (
    <footer className="gouttiere flex flex-wrap justify-between gap-3 border-t border-ligne pb-10 pt-8 text-sm text-gris">
      <span>
        {residence.nom} · {residence.ville} ·{" "}
        <a href={contact.whatsapp(contact.messageParDefaut)} className="underline-offset-4 hover:underline">
          WhatsApp {contact.whatsappAffiche}
        </a>
      </span>
      <span>{signature}</span>
    </footer>
  );
}
