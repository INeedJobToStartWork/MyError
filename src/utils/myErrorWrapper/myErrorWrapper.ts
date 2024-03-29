import type { ErrorTypesCatched, arrowFunction } from "@/utils/types";

type MyErrorWrapperReturn<T extends arrowFunction<T>> = [ErrorTypesCatched, true] | [ReturnType<T>, false];

// TODO: Add support for functions with dobule brackets ()

export const myErrorWrapper =
	<T extends arrowFunction<T>>(fnThatMayThrow: T) =>
	(...args: Parameters<T>): MyErrorWrapperReturn<T> => {
		try {
			const result = fnThatMayThrow(...args);
			return [result, false];
		} catch (error) {
			return [error as ErrorTypesCatched, true];
		}
	};

export default myErrorWrapper;
