import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#f9f3e3] flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl rounded-[32px] border border-[#d4caaf] bg-white/95 p-10 shadow-[0_30px_100px_rgba(26,92,82,0.12)]">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B8962E]">
            Page introuvable
          </p>
          <h1 className="mt-6 text-5xl font-bold text-[#1A5C52]">404</h1>
          <p className="mt-4 text-lg text-[#1A5C52]/80">
            Oups, cette page n’existe pas. Retournez à la page d’accueil pour
            continuer votre gestion.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#1A5C52] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1A5C52]/20 transition hover:bg-[#14473e]"
          >
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
