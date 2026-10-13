import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { photos, residence } from "@/content/site";

// Image d'apercu des partages (WhatsApp, Facebook...) : une conversation en cours
export const alt = `${residence.nom} · Appartements meublés à ${residence.ville}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const C = { sable: "#f6f1e7", papier: "#fffdf8", encre: "#141414", gris: "#6d675d", or: "#ecc23a" };

// Lus au build : l'image est generee une seule fois, statiquement
const racine = process.cwd();
const enBase64 = async (src: string) => `data:image/jpeg;base64,${(await readFile(join(racine, "public", src))).toString("base64")}`;
const [gloock, hanken, hankenGras, logo, salon] = await Promise.all([
  readFile(join(racine, "node_modules/@fontsource/gloock/files/gloock-latin-400-normal.woff")),
  readFile(join(racine, "node_modules/@fontsource/hanken-grotesk/files/hanken-grotesk-latin-500-normal.woff")),
  readFile(join(racine, "node_modules/@fontsource/hanken-grotesk/files/hanken-grotesk-latin-700-normal.woff")),
  enBase64(residence.logo.src),
  enBase64(photos.salon.src),
]);

const bulle = { background: C.papier, borderRadius: "22px 22px 22px 6px", padding: "14px 20px", fontSize: 24, display: "flex" } as const;

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: C.sable, padding: 56, gap: 48, fontFamily: "Hanken" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 540 }}>
          <div style={{ display: "flex", background: "#fff", borderRadius: 20, padding: "12px 18px", width: 300 }}>
            <img src={logo} width={264} height={163} alt="" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Gloock", fontSize: 72, lineHeight: 1, color: C.encre }}>
            <span>Le confort poussé</span>
            <span style={{ display: "flex" }}>
              <span style={{ backgroundImage: `linear-gradient(transparent 60%, ${C.or} 60%, ${C.or} 92%, transparent 92%)` }}>à son comble.</span>
            </span>
          </div>
          <div style={{ fontSize: 26, color: C.gris }}>Appartements meublés à Abidjan</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, justifyContent: "center", color: C.encre }}>
          <div style={bulle}>Bonjour, bienvenue chez Light Résidence.</div>
          <div style={{ ...bulle, padding: 8, width: 330 }}>
            <img src={salon} width={314} height={220} alt="" style={{ borderRadius: 16, objectFit: "cover" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ ...bulle, background: C.encre, color: C.sable, borderRadius: "22px 22px 6px 22px" }}>{"C’est combien ?"}</div>
          </div>
          <div style={{ ...bulle, flexDirection: "column", borderLeft: `6px solid ${C.or}` }}>
            <span style={{ fontSize: 16, fontFamily: "HankenGras", letterSpacing: 3, color: "#8a6a00" }}>À PARTIR DE</span>
            <span style={{ fontFamily: "Gloock", fontSize: 52, lineHeight: 1.1 }}>20 000 F</span>
            <span style={{ fontSize: 20, color: C.gris }}>les 24 heures</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Gloock", data: gloock, style: "normal", weight: 400 },
        { name: "Hanken", data: hanken, style: "normal", weight: 500 },
        { name: "HankenGras", data: hankenGras, style: "normal", weight: 700 },
      ],
    },
  );
}
