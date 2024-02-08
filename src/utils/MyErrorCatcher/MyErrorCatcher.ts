import type { Prettify, arrowFunction } from "@/utils/types";

type MyErrorCatcherReturn<T extends arrowFunction<T>> = Prettify<ReturnType<T>>;

// const MyErrorCatcher =
// 	<T extends (...args: any[]) => any>(fnThatMayThrow: T) =>
// 	(...args: Parameters<T>): Promise<Prettify<ReturnType<T>>> =>
// 		new Promise(resolve => {
// 			resolve(fnThatMayThrow(...args));
// 		});

// (...args: Parameters<T>) => ReturnType<T>

export const myErrorCatcher =
	<T extends arrowFunction<T>>(fnThatMayThrow: T) =>
	async (...args: Parameters<T>): Promise<Prettify<ReturnType<T>>> =>
		new Promise(resolve => {
			resolve(fnThatMayThrow(...args));
		});
// export const MyErrorCatcher =
// 	<T extends arrowFunction<T>>(fnThatMayThrow: T) =>
// 	async (...args: Parameters<T>): Promise<MyErrorCatcherReturn<T>> =>
// 		new Promise(resolve => {
// 			resolve(fnThatMayThrow(...args));
// 		});

export default myErrorCatcher;
