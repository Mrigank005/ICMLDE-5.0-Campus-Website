// Usage: npm run qr -- https://your-site.pages.dev [label]
// Writes qr/<label>.png (print, 1200px) and qr/<label>.svg (scales for standees) for that URL.
import QRCode from "qrcode";
import { mkdirSync } from "node:fs";

const [url, label = "icmlde-campus"] = process.argv.slice(2);
if (!url || !/^https:\/\//.test(url)) {
  console.error("Give the final https URL, e.g.  npm run qr -- https://icmlde.example.com");
  process.exit(1);
}
mkdirSync("qr", { recursive: true });
// Level H survives a scuffed badge or a logo overlay; margin 4 is the quiet zone scanners need.
const opts = { errorCorrectionLevel: "H", margin: 4, color: { dark: "#131e62", light: "#ffffff" } };
await QRCode.toFile(`qr/${label}.png`, url, { ...opts, width: 1200 });
await QRCode.toFile(`qr/${label}.svg`, url, { ...opts, type: "svg" });
console.log(`Wrote qr/${label}.png and qr/${label}.svg for ${url}\nScan them with a phone before printing.`);
