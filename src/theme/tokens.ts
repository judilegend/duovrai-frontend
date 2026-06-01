/**
 * Duovrai Design Tokens — Charte Graphique v1.0
 * ================================================
 * Ce fichier centralise TOUS les tokens de design du projet.
 * Il est la source de vérité unique pour les couleurs, typographies,
 * espacements et styles visuels de la marque Duovrai.
 *
 * Positionnement : Luxe accessible · Bienveillance · Ésotérisme doux · Intemporel
 * Tagline : « Découvrez l'alchimie de votre relation »
 *
 * Règle d'harmonie couleur : Vert 60% · Or 30% · Blanc 10%
 */

// ─── Couleurs ────────────────────────────────────────────────────────
export const colors = {
  // Couleurs principales
  sapin:     "#1A5C52", // Primaire — titres, boutons CTA, bordures
  dore:      "#B8962E", // Secondaire — accents, labels, tagline
  blanc:     "#FFFFFF", // Fond principal

  // Couleurs secondaires
  pale:      "#E8F2F0", // Fond sections / encadrés
  creme:     "#F9F3E3", // Fond mise en avant / citations
  gris:      "#555555", // Corps de texte
  noir:      "#1A1A1A", // Titres forts / contrastes
} as const

// ─── Typographie ─────────────────────────────────────────────────────
// Police            | Usage                                    | Fallback
// Cormorant Garamond | Logotype · Titres H1 · Citations · Tagline | Georgia
// Montserrat         | Sous-titres · Navigation · Boutons · Labels | Arial / Helvetica Neue
// Inter (Calibri)    | Corps de texte · Descriptions · UI courante | Calibri
export const fonts = {
  cormorant:  "'Cormorant Garamond', Georgia, serif",
  montserrat: "'Montserrat', Arial, 'Helvetica Neue', sans-serif",
  inter:      "'Inter', Calibri, sans-serif",
} as const

// ─── Hiérarchie typographique ────────────────────────────────────────
// Niveau              | Taille    | Graisse   | Couleur
// H1 — Titre principal  | 36–44px   | Bold      | Vert #1A5C52
// H2 — Sous-titre       | 26–30px   | Bold      | Vert #1A5C52
// H3 — Titre bloc       | 20–22px   | Semi-bold | Noir #1A1A1A
// Corps de texte        | 15–17px   | Regular   | Gris #555555
// Label / Caption       | 12–13px   | Medium · Caps | Or #B8962E
// Citation / Tagline    | 18–22px   | Regular · Italic | Vert #1A5C52
export const typography = {
  h1: {
    fontFamily: fonts.cormorant,
    fontWeight: 700,
    color: colors.sapin,
    sizeRange: "36px–44px",
  },
  h2: {
    fontFamily: fonts.cormorant,
    fontWeight: 700,
    color: colors.sapin,
    sizeRange: "26px–30px",
  },
  h3: {
    fontFamily: fonts.montserrat,
    fontWeight: 600,
    color: colors.noir,
    sizeRange: "20px–22px",
  },
  body: {
    fontFamily: fonts.inter,
    fontWeight: 400,
    color: colors.gris,
    sizeRange: "15px–17px",
  },
  label: {
    fontFamily: fonts.montserrat,
    fontWeight: 500,
    color: colors.dore,
    sizeRange: "12px–13px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.15em",
  },
  tagline: {
    fontFamily: fonts.cormorant,
    fontWeight: 400,
    fontStyle: "italic" as const,
    color: colors.sapin,
    sizeRange: "18px–22px",
  },
  button: {
    fontFamily: fonts.montserrat,
    fontWeight: 500,
    borderRadius: "6px",
  },
} as const

// ─── Style visuel ────────────────────────────────────────────────────
export const ui = {
  borderRadius: "6px",
  cta: {
    background: colors.sapin,
    color: colors.blanc,
    borderRadius: "6px",
  },
} as const
