import CopyPlugin from "copy-webpack-plugin";
import { resolve } from "path";

const __dirname = resolve();
const PATHOUT = resolve(__dirname, "lib");

export default {
	entry: {
		index: resolve(__dirname, "src/index.ts")
	},
	module: {
		rules: [
			{
				exclude: "/\\node_modules\\[^\\]+$/gusm",
				test: /\.(ts|mts)$/,
				use: {
					loader: "swc-loader"
				}
			}
		]
	},
	name: "base",
	output: {
		clean: true,
		filename: "[name].cjs",
		path: resolve(__dirname, "lib"),
		chunkLoading: false,
		library: {
			type: "commonjs2",
			export: "default"
		}
	},
	resolve: {
		extensions: ["", ".ts", ".js", ".mjs", ".mts"],
		alias: {
			"@": resolve(__dirname, "src/")
		}
	},
	target: "node"
};
