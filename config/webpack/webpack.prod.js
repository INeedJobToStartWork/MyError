import webpackBaseConfig from "./webpack.base.js";
import bundle from "bundle-declarations-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import { resolve } from "path";
import { merge } from "webpack-merge";

const __dirname = resolve();
const PATHOUT = resolve(__dirname, "dist");

export default merge(webpackBaseConfig, {
	mode: "production",
	name: "production",
	optimization: {
		mangleExports: true,
		minimize: true,
		providedExports: true,
		usedExports: true
	},
	output: {
		path: PATHOUT
	},
	plugins: [
		new bundle.BundleDeclarationsWebpackPlugin({
			entry: {
				filePath: "./src/index.ts"
			},
			outFile: "index.d.ts",
			compilationOptions: {
				sourceMap: true
			},
			removeEmptyLines: false,
			removeEmptyExports: false
		}),
		new CopyPlugin({
			patterns: [
				{
					from: resolve(__dirname, "package.json"),
					to: PATHOUT
				},
				{
					from: resolve(__dirname, "README.md"),
					to: PATHOUT
				}
			]
		})
	]
});
