import { Conversation } from "@/components/conversation/Conversation";
import { PanneauMarque } from "@/components/layout/PanneauMarque";
import { PiedDePage } from "@/components/layout/PiedDePage";

export default function Accueil() {
  return (
    <>
      <div className="grid min-h-svh md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <PanneauMarque />
        <Conversation />
      </div>
      <PiedDePage />
    </>
  );
}
