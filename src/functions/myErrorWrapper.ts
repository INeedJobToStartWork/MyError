/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/return-await */
import type { ErrorTypesCatched, TFunction, TIsPromise, UnwrapPromise } from "@/types/internal";

//----------------------
// Types
//----------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

type MyErrorWrapperReturn<Fn extends AnyFunction, ErrorType = undefined> = ErrorType extends undefined
	? TIsPromise<ReturnType<Fn>> extends true
		? Promise<[ErrorTypesCatched, true] | [UnwrapPromise<ReturnType<Fn>>, false]>
		: [ErrorTypesCatched, true] | [ReturnType<Fn>, false]
	: ReturnType<Fn>;

//----------------------
// Functions
//----------------------

export const myErrorWrapper =
	<Fn extends TFunction<Fn>, ErrorType = undefined>(
		fnThatMayThrow: Fn,
		errorToThrow?: ErrorType
	): ((...args: Parameters<Fn>) => MyErrorWrapperReturn<Fn, ErrorType>) =>
	(...args: Parameters<Fn>): MyErrorWrapperReturn<Fn, ErrorType> => {
		const returnFNOutput = <G>(result: G) =>
			(errorToThrow ? result : [result, false]) as MyErrorWrapperReturn<Fn, ErrorType>;
		const returnError = (error: unknown) => {
			if (errorToThrow) throw errorToThrow;
			return [error as ErrorTypesCatched, true] as MyErrorWrapperReturn<Fn, ErrorType>;
		};

		try {
			const result = fnThatMayThrow(...args);
			return result instanceof Promise
				? (result.then(returnFNOutput).catch(returnError) as MyErrorWrapperReturn<Fn, ErrorType>)
				: returnFNOutput(result);
		} catch (error) {
			return returnError(error);
		}
	};

export default myErrorWrapper;
