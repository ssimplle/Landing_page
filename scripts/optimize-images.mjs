// Genereaza variante optimizate (WebP/AVIF, mai multe latimi) pentru imaginile din public/assets/images.
// Ruleaza cu: npm run optimize-images (dupa ce adaugi/inlocuiesti imagini sursa .jpeg/.png)
import { readdir, mkdir } from "node:fs/promises";
import { extname, basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const SOURCE_DIR = fileURLToPath(new URL("../public/assets/images/", import.meta.url));
const OUTPUT_DIR = fileURLToPath(new URL("../public/assets/images/optimized/", import.meta.url));
const WIDTHS = [480, 768, 1200, 1920];
const SOURCE_EXTENSIONS = [".jpg", ".jpeg", ".png"];

async function run() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const entries = await readdir(SOURCE_DIR, { withFileTypes: true });
  const sourceFiles = entries.filter(
    (entry) => entry.isFile() && SOURCE_EXTENSIONS.includes(extname(entry.name).toLowerCase())
  );

  for (const entry of sourceFiles) {
    const name = basename(entry.name, extname(entry.name));
    const inputPath = join(SOURCE_DIR, entry.name);
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    for (const width of WIDTHS) {
      if (metadata.width && width > metadata.width) continue;

      const resized = sharp(inputPath).resize({ width });
      const webpPath = join(OUTPUT_DIR, `${name}-${width}.webp`);
      const avifPath = join(OUTPUT_DIR, `${name}-${width}.avif`);

      await resized.clone().webp({ quality: 78 }).toFile(webpPath);
      await resized.clone().avif({ quality: 60 }).toFile(avifPath);
      console.log(`Generat: ${name}-${width}.webp / .avif`);
    }
  }

  console.log("Optimizarea imaginilor s-a finalizat.");
}

run().catch((error) => {
  console.error("Eroare la optimizarea imaginilor:", error);
  process.exit(1);
});
