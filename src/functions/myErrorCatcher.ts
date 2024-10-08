import type { arrowFunction } from "@/types/internal";

export const myErrorCatcher =
	<T extends arrowFunction<T>>(functionThatMayThrow: T) =>
	async (...arguments_: Parameters<T>): Promise<ReturnType<T>> =>
		new Promise(resolve => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
			resolve(functionThatMayThrow(...arguments_));
		});

export default myErrorCatcher;
