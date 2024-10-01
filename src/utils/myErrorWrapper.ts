import type { ErrorTypesCatched, arrowFunction } from "@/utils/types";

type MyErrorWrapperReturn<T extends arrowFunction<T>, errorType> = errorType extends undefined
	? [ErrorTypesCatched, true] | [ReturnType<T>, false]
	: ReturnType<T>;

export const myErrorWrapper =
	<T extends arrowFunction<T>, ErrorType = undefined>(
		fnThatMayThrow: T,
		errorToThrow?: ErrorType
	): ((...args: Parameters<T>) => MyErrorWrapperReturn<T, ErrorType>) =>
	(...args: Parameters<T>) => {
		try {
			const result = fnThatMayThrow(...args);
			return (errorToThrow ? result : [result, false]) as MyErrorWrapperReturn<T, ErrorType>;
		} catch (error) {
			if (errorToThrow) throw errorToThrow;
			return [error as ErrorTypesCatched, true] as MyErrorWrapperReturn<T, ErrorType>;
		}
	};

export default myErrorWrapper;
