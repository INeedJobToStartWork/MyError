import type { Prettify, arrowFunction } from "@/utils/types";

type MyErrorCatcherReturn<T extends arrowFunction<T>> = Prettify<ReturnType<T>>;

export const MyErrorCatcher =
	<T extends arrowFunction<T>>(fnThatMayThrow: T) =>
	async (...args: Parameters<T>): Promise<MyErrorCatcherReturn<T>> =>
		new Promise(resolve => {
			resolve(fnThatMayThrow(...args));
		});

export default MyErrorCatcher;
