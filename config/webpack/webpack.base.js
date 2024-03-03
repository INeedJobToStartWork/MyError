import { resolve } from "path";
import JsonMinimizerPlugin from "json-minimizer-webpack-plugin";

const __dirname = resolve();
const PATHOUT = resolve(__dirname, "lib");

export default {
	entry: {
		index: resolve(__dirname, "src/index.ts")
	},
	module: {
		rules: [
			// {
			// 	exclude: "/\\node_modules\\[^\\]+$/gusm",
			// 	test: /\.(ts|mts)$/,
			// 	use: {
			// 		loader: "ts-loader"
			// 	}
			// }
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
		libraryTarget: "commonjs2"
	},
	resolve: {
		extensions: ["", ".ts", ".js", ".mjs", ".mts"],
		alias: {
			"@": resolve(__dirname, "src/")
		}
	},
	optimization: {
		minimize: true,
		minimizer: ["...", new JsonMinimizerPlugin()]
	},
	target: "node"
};
