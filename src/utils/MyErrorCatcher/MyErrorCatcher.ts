import type { Prettify, arrowFunction } from "@/utils/types";

export const myErrorCatcher =
	<T extends arrowFunction<T>>(fnThatMayThrow: T) =>
	async (...args: Parameters<T>): Promise<Prettify<ReturnType<T>>> =>
		new Promise(resolve => {
			resolve(fnThatMayThrow(...args));
		});

export default myErrorCatcher;
