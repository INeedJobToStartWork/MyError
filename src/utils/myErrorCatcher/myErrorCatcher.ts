import type { arrowFunction } from "@/utils/types";

export const myErrorCatcher =
	<T extends arrowFunction<T>>(functionThatMayThrow: T) =>
	async (...arguments_: Parameters<T>): Promise<ReturnType<T>> =>
		new Promise(resolve => {
			resolve(functionThatMayThrow(...arguments_));
		});

export default myErrorCatcher;
