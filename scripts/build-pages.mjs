import { build } from "vite";
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");

await build({
  configFile: path.join(root, "vite.config.js"),
  build: {
    outDir: dist,
    emptyOutDir: true,
    rollupOptions: {
      input: path.join(root, "index.source.html"),
    },
  },
});

await fs.rename(path.join(dist, "index.source.html"), path.join(dist, "index.html"));
await fs.rm(path.join(root, "assets"), { recursive: true, force: true });
await fs.cp(path.join(dist, "assets"), path.join(root, "assets"), { recursive: true });
await fs.copyFile(path.join(dist, "index.html"), path.join(root, "index.html"));
await fs.writeFile(path.join(root, ".nojekyll"), "");

console.log("Built dist and published static files to repository root for GitHub Pages.");
