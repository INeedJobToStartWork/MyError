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
				{ from: "./README.npm.md", to: "./README.md" }
			]
		})
	]
});
