import type { arrowFunction } from "../types/internal";

/**
 * Promise Wrapper.
 *
 *
 * @param functionThatMayThrow - The error code to handle.
 * @param errorSolutions - An object containing error handling functions, keyed by error codes.
 *
 * @returns `functionThatMayThrow` wrapped in Promise
 *
 * @example
 * ```
 * const data = await myErrorCatcher(readFile)("path...").catch(() => {
 * 	// Code before crash...
 * 	throw new Error("Can't read file!");
 * });
 * ```
 * @version 2.0.0
 */

export const myErrorCatcher =
	<T extends arrowFunction<T>>(functionThatMayThrow: T) =>
	async (...args: Parameters<T>): Promise<ReturnType<T>> =>
		new Promise(resolve => {
			resolve(functionThatMayThrow(...args));
		});

export default myErrorCatcher;
