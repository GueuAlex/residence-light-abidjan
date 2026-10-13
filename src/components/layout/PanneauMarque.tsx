import Image from "next/image";
import { contact, residence, signature } from "@/content/site";

// Colonne de marque (ordinateur) : logo, promesse et valeurs qui defilent
export function PanneauMarque() {
  return (
    <aside aria-label={residence.nom} className="sticky top-0 hidden h-svh flex-col justify-between overflow-hidden p-[clamp(28px,4vw,56px)] md:flex">
      <Image
        src={residence.logo.src}
        alt={residence.logo.alt}
        width={residence.logo.largeur}
        height={residence.logo.hauteur}
        sizes="280px"
        loading="eager"
        className="w-[min(280px,60%)] rounded-[20px] bg-white px-[18px] py-3.5 shadow-[0_10px_30px_rgb(20_20_20/0.06)]"
      />

      <div>
        <h1 className="max-w-[9ch] font-titre text-[clamp(44px,5.4vw,88px)] leading-[0.98] tracking-[-0.01em]">
          {residence.sloganAvant} <em className="surligne not-italic">{residence.sloganSurligne}</em>
        </h1>
        <p className="mt-[18px] max-w-[380px] text-[17px] text-gris">{residence.presentation}</p>
      </div>

      <div>
        <div aria-hidden="true" className="overflow-hidden border-y border-ligne py-3 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="defile flex w-max gap-7">
            {[...residence.valeurs, ...residence.valeurs].map((v, i) => (
              <span key={i} className="whitespace-nowrap font-titre text-[22px] after:ml-7 after:text-or-fonce after:content-['·']">
                {v}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-[18px] flex items-end justify-between gap-4 text-sm text-gris">
          <span>
            WhatsApp · {contact.whatsappAffiche}
            <br />
            Tél. · {contact.telephoneAffiche}
          </span>
          <span className="text-right">{signature}</span>
        </div>
      </div>
    </aside>
  );
}
