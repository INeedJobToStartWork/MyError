import { copy } from "esbuild-plugin-copy";
import config from "./tsup.base";
import { defineConfig } from "tsup";

export default defineConfig({
	...config,
	splitting: true,
	sourcemap: true,
	minify: true,
	shims: true,
	outDir: "dist",
	dts: true,
	format: ["cjs", "esm"],
	esbuildPlugins: [
		copy({
			assets: [
				{ from: "./package.json", to: "./package.json" },
				{ from: "./.npmrc", to: "./.npmrc" },
				{ from: "./.npmignore", to: "./.npmignore" },
				{ from: "./README.md", to: "./README.md" }
			]
		})
	]
});
