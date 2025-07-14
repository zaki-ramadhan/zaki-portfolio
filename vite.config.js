import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	base: "/zaki-portfolio",
	resolve: {
		alias: {
			"@": path.resolve(
				__dirname,
				"./src"
			),
			"@components": path.resolve(
				__dirname,
				"./src/components"
			),
			"@utils": path.resolve(
				__dirname,
				"./src/utils"
			),
			"@assets": path.resolve(
				__dirname,
				"./src/assets"
			),
			"@sections": path.resolve(
				__dirname,
				"./src/sections"
			),
		},
	},
});
