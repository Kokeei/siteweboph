/**
 * Génère les illustrations SVG de remplacement (public/images).
 * Les photos du site officiel n'étaient pas accessibles depuis l'environnement de développement :
 * ces visuels conservent l'emplacement et le ratio (16:9 pour les cartes, large pour le hero)
 * et seront remplacés par les photos réelles.
 *
 * Usage : node scripts/generate-images.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(out, { recursive: true });

const W = 1200;
const H = 675;

const sky = (id, top, bottom) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient>`;

const mountains = (w, h, c1, c2) => `
  <path d="M0 ${h * 0.62} L${w * 0.08} ${h * 0.5} L${w * 0.18} ${h * 0.3} L${w * 0.26} ${h * 0.42} L${w * 0.36} ${h * 0.22} L${w * 0.47} ${h * 0.45} L${w * 0.58} ${h * 0.35} L${w * 0.7} ${h * 0.5} L${w * 0.82} ${h * 0.38} L${w} ${h * 0.55} L${w} ${h} L0 ${h}Z" fill="${c1}"/>
  <path d="M0 ${h * 0.7} L${w * 0.15} ${h * 0.55} L${w * 0.3} ${h * 0.62} L${w * 0.48} ${h * 0.52} L${w * 0.66} ${h * 0.63} L${w * 0.85} ${h * 0.54} L${w} ${h * 0.64} L${w} ${h} L0 ${h}Z" fill="${c2}"/>`;

const lagoon = (w, h, y) => `
  <rect x="0" y="${y}" width="${w}" height="${h - y}" fill="url(#lagoon)"/>
  <path d="M0 ${y + 18} Q ${w * 0.25} ${y + 8} ${w * 0.5} ${y + 18} T ${w} ${y + 18}" stroke="#ffffff" stroke-opacity=".35" stroke-width="3" fill="none"/>
  <path d="M0 ${y + 50} Q ${w * 0.25} ${y + 40} ${w * 0.5} ${y + 50} T ${w} ${y + 50}" stroke="#ffffff" stroke-opacity=".2" stroke-width="3" fill="none"/>`;

const palm = (x, y, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <path d="M0 0 C 6 -60 14 -120 30 -170" stroke="#5b3a1e" stroke-width="10" fill="none" stroke-linecap="round"/>
    <g fill="#1f7a4a" transform="translate(30 -170)">
      <path d="M0 0 C -40 -20 -80 -10 -100 20 C -60 0 -30 0 0 0Z"/>
      <path d="M0 0 C 40 -25 85 -15 105 15 C 65 -5 30 -5 0 0Z"/>
      <path d="M0 0 C -20 -40 -10 -80 20 -95 C 5 -60 5 -30 0 0Z"/>
      <path d="M0 0 C 30 -30 70 -45 95 -35 C 60 -25 30 -10 0 0Z"/>
      <path d="M0 0 C -35 -30 -75 -40 -95 -25 C -60 -20 -30 -8 0 0Z"/>
    </g>
  </g>`;

const fare = (x, y, s = 1, wall = "#c98a4b", roof = "#7a3b1c") => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-10" y="120" width="260" height="14" fill="#6b4a2b"/>
    <rect x="0" y="40" width="240" height="85" fill="${wall}"/>
    ${Array.from({ length: 12 }, (_, i) => `<line x1="${i * 20}" y1="40" x2="${i * 20}" y2="125" stroke="#000" stroke-opacity=".08" stroke-width="2"/>`).join("")}
    <path d="M-25 45 L120 -35 L265 45Z" fill="${roof}"/>
    <rect x="30" y="62" width="50" height="38" fill="#fdf6e3" stroke="#6b4a2b" stroke-width="4"/>
    <rect x="160" y="62" width="50" height="38" fill="#fdf6e3" stroke="#6b4a2b" stroke-width="4"/>
    <rect x="100" y="70" width="40" height="55" fill="#6b4a2b"/>
    ${[0, 1, 2, 3].map((i) => `<rect x="${-5 + i * 80}" y="125" width="10" height="30" fill="#6b4a2b"/>`).join("")}
  </g>`;

const building = (x, y, w, h, color, floors = 4) => {
  const cols = Math.max(2, Math.floor(w / 45));
  let win = "";
  for (let f = 0; f < floors; f++)
    for (let c = 0; c < cols; c++)
      win += `<rect x="${x + 14 + c * ((w - 20) / cols)}" y="${y + 18 + f * ((h - 30) / floors)}" width="${(w - 20) / cols - 14}" height="${(h - 30) / floors - 16}" rx="2" fill="#e8f3fb"/>`;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/><rect x="${x - 6}" y="${y - 10}" width="${w + 12}" height="12" fill="#38495c"/>${win}`;
};

const svg = (body, defs = "", w = W, h = H) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice"><defs>${defs}${sky("lagoon", "#2bb7c4", "#0b6f8f")}</defs>${body}</svg>`;

const scenes = {
  hero: () => {
    const w = 1920, h = 800;
    return svg(
      `<rect width="${w}" height="${h}" fill="url(#s)"/>
       <circle cx="${w * 0.78}" cy="${h * 0.22}" r="70" fill="#ffe7a8" opacity=".9"/>
       ${mountains(w, h * 0.9, "#2d6e57", "#3f8f68")}
       ${lagoon(w, h, h * 0.72)}
       ${fare(w * 0.12, h * 0.46, 0.9)}
       ${fare(w * 0.3, h * 0.5, 0.7, "#e8d3b0", "#b34a2a")}
       ${palm(w * 0.06, h * 0.72, 1.2)}${palm(w * 0.46, h * 0.72, 0.9)}${palm(w * 0.92, h * 0.74, 1.1)}`,
      sky("s", "#8fd3f4", "#e6f6fb"),
      w,
      h,
    );
  },
  fare: () =>
    svg(
      `<rect width="${W}" height="${H}" fill="url(#s)"/>${mountains(W, H * 0.8, "#2d6e57", "#4b9b6e")}
       <rect y="${H * 0.72}" width="${W}" height="${H * 0.28}" fill="#58a563"/>
       ${fare(380, 330, 1.7)}${palm(150, 620, 1.2)}${palm(1050, 640, 1)}`,
      sky("s", "#7fc9ef", "#e9f7fc"),
    ),
  "fare-tropical": () =>
    svg(
      `<rect width="${W}" height="${H}" fill="url(#s)"/><circle cx="600" cy="380" r="120" fill="#ffcf6b"/>
       ${lagoon(W, H, 420)}${fare(170, 250, 1.3, "#d49a5a", "#5a2a14")}${fare(700, 280, 1.1, "#f0e2c8", "#1d5d7a")}${palm(90, 560, 1.1)}${palm(1120, 580, 1)}`,
      sky("s", "#f59f5b", "#fbe0b5"),
    ),
  residence: () =>
    svg(
      `<rect width="${W}" height="${H}" fill="url(#s)"/>${mountains(W, H * 0.75, "#3a7a5f", "#4d9670")}
       <rect y="${H * 0.82}" width="${W}" height="${H * 0.18}" fill="#9fb3a3"/>
       ${building(120, 250, 300, 310, "#f3e3c3")}${building(460, 180, 320, 380, "#e9c9a0", 5)}${building(820, 270, 260, 290, "#f6eddc")}
       ${palm(80, 570, 1)}${palm(1130, 580, 0.9)}`,
      sky("s", "#86cdf0", "#eaf7fc"),
    ),
  etudiants: () =>
    svg(
      `<rect width="${W}" height="${H}" fill="url(#s)"/>${mountains(W, H * 0.7, "#35785c", "#4a9369")}
       <rect y="${H * 0.8}" width="${W}" height="${H * 0.2}" fill="#b8c7b9"/>
       ${building(170, 200, 860, 340, "#dfeaf3", 4)}
       <rect x="520" y="440" width="160" height="100" fill="#0b4f8a"/><text x="600" y="505" font-family="Arial" font-size="40" font-weight="700" fill="#fff" text-anchor="middle">CHE</text>
       ${palm(100, 560, 1)}${palm(1110, 560, 1)}`,
      sky("s", "#9ad6f2", "#eef9fd"),
    ),
  lotissement: () =>
    svg(
      `<rect width="${W}" height="${H}" fill="url(#s)"/>${mountains(W, H * 0.6, "#2f7258", "#48906a")}
       <path d="M0 ${H * 0.55} L${W} ${H * 0.48} L${W} ${H} L0 ${H}Z" fill="#6cb36f"/>
       ${[0, 1, 2, 3].map((i) => `<path d="M${80 + i * 280} ${H * 0.62} l240 -18 l40 180 l-250 22Z" fill="#88c47f" stroke="#f7f3e3" stroke-width="6"/>`).join("")}
       ${fare(140, 390, 0.6)}${fare(700, 370, 0.6, "#efe0c4", "#9c3b21")}
       <path d="M0 ${H * 0.9} L${W} ${H * 0.84}" stroke="#8a8a8a" stroke-width="40"/>`,
      sky("s", "#8fd3f4", "#e6f6fb"),
    ),
  materiaux: () =>
    svg(
      `<rect width="${W}" height="${H}" fill="#f1ebe0"/>
       ${Array.from({ length: 7 }, (_, i) => `<rect x="${200 + (i % 2) * 20}" y="${470 - i * 42}" width="560" height="36" rx="4" fill="${i % 2 ? "#c9955c" : "#b98046"}"/>`).join("")}
       ${Array.from({ length: 5 }, (_, i) => `<rect x="800" y="${480 - i * 22}" width="260" height="16" fill="#9aa9b8" stroke="#6f7f8f"/>`).join("")}
       <rect x="120" y="510" width="980" height="30" fill="#6b4a2b"/>
       <g transform="translate(900 180)"><rect width="120" height="150" rx="10" fill="#e97b2b"/><rect x="20" y="20" width="80" height="50" rx="6" fill="#fff" opacity=".85"/></g>`,
    ),
  agence: () =>
    svg(
      `<rect width="${W}" height="${H}" fill="url(#s)"/>
       <rect y="${H * 0.8}" width="${W}" height="${H * 0.2}" fill="#c9d2da"/>
       ${building(240, 190, 720, 350, "#ffffff", 3)}
       <rect x="520" y="420" width="160" height="120" fill="#0b4f8a"/>
       <rect x="240" y="150" width="720" height="50" fill="#0b4f8a"/>
       <text x="600" y="186" font-family="Arial" font-size="34" font-weight="700" fill="#fff" text-anchor="middle">OPH</text>
       ${palm(130, 560, 1.1)}${palm(1070, 560, 1.1)}`,
      sky("s", "#9ad6f2", "#eef9fd"),
    ),
  eservices: () =>
    svg(
      `<rect width="${W}" height="${H}" fill="#e7f0f8"/>
       <rect x="300" y="140" width="600" height="370" rx="18" fill="#1d2b3a"/><rect x="322" y="162" width="556" height="326" rx="6" fill="#fff"/>
       <rect x="250" y="510" width="700" height="28" rx="10" fill="#38495c"/>
       <rect x="352" y="192" width="220" height="24" rx="6" fill="#0b4f8a"/>
       ${[0, 1, 2].map((i) => `<rect x="352" y="${240 + i * 60}" width="496" height="40" rx="8" fill="#f4f7fa" stroke="#dde4ec"/>`).join("")}
       <rect x="352" y="424" width="170" height="40" rx="20" fill="#e97b2b"/>
       <g transform="translate(900 280)"><rect width="150" height="280" rx="22" fill="#1d2b3a"/><rect x="12" y="24" width="126" height="230" rx="8" fill="#11a0a6"/></g>`,
    ),
  alerte: () =>
    svg(
      `<rect width="${W}" height="${H}" fill="#fff4e8"/>
       <path d="M600 120 L860 560 L340 560Z" fill="#e97b2b" stroke="#c9621a" stroke-width="16" stroke-linejoin="round"/>
       <rect x="585" y="260" width="30" height="170" rx="15" fill="#fff"/><circle cx="600" cy="480" r="20" fill="#fff"/>`,
    ),
};

for (const [name, render] of Object.entries(scenes)) {
  const file = join(out, `${name}.svg`);
  writeFileSync(file, render());
  console.log("écrit", file);
}
