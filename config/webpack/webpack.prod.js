import webpackBaseConfig from "./webpack.base.js";
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
	}
});
