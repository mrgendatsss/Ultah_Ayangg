const QRCode = require("qrcode");
const path = require("path");
const fs = require("fs");

const codes = [
  "HUNT_G1_OUT",
  "HUNT_G1_IN",
  "HUNT_G2_OUT",
  "HUNT_G2_IN",
  "HUNT_G3_OUT",
  "HUNT_G3_IN",
];

const outDir = path.join(__dirname, "..", "public", "qr");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
  for (const code of codes) {
    const filePath = path.join(outDir, `${code}.png`);
    await QRCode.toFile(filePath, code, {
      width: 600,
      margin: 2,
      color: { dark: "#000000", light: "#ffffff" },
    });
    console.log(`Generated: ${filePath}`);
  }
  console.log("\nAll 6 QR codes generated in public/qr/");
  console.log("Print these and attach them to the gifts!");
})();
