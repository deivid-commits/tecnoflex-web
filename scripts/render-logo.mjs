import { readFileSync, writeFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";

const svg = readFileSync(process.argv[2] || "public/logo-tcnoflex.svg", "utf8");

const renderVariants = [
  { name: "preview-blue",  bg: "#1e40af", width: 800 },
  { name: "preview-dark",  bg: "#0a0a0a", width: 800 },
  { name: "preview-white", bg: "#ffffff", width: 800 },
];

for (const v of renderVariants) {
  const resvg = new Resvg(svg, {
    background: v.bg,
    fitTo: { mode: "width", value: v.width },
  });
  const png = resvg.render().asPng();
  writeFileSync(`C:/Users/deivi/Desktop/logo-${v.name}.png`, png);
  console.log(`wrote logo-${v.name}.png`);
}
