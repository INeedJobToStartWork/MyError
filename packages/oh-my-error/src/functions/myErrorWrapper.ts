import type { ErrorTypesCatched, TFunction, TIsPromise, UnwrapPromise } from "../types/internal";

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

/**
 * TryCatch One line wrapper.
 *
 * @params errorToThrow - If `fnThatMayThrow` throw error, this will be instant throwed.
 * - if `errorToThrow` is Function (cb), it pass as argument error catched by function else return element.
 * - typeof errorToThrow === "function" ? errorToThrow(error) : errorToThrow
 * @returns Tuple `[data,isError]`, with `errorToThrow` just `data`.
 *
 * @example
 * ```
 * // For Async add `await` before `myErrorWrapper`
 * const [data,isError] = myErrorWrapper(readFile)("path...");
 * if(isError) throw new Error("Can't read file!")
 *
 * // Or instant Error Throw (with errorToThrow)
 * const data = myErrorWrapper(readFile,new Error("Can't read file!"))("path...");
 * // With Passing Throwed Error to our error
 * const data = myErrorWrapper(readFile,err => new Error(`ERROR MESSAGE: ${err.message}}`))("path...");
 * ```
 * @version 2.0.0
 */
export const myErrorWrapper =
	<Fn extends TFunction<Fn>, ErrorType = undefined>(
		fnThatMayThrow: Fn,
		errorToThrow?: ErrorType
	): ((...args: Parameters<Fn>) => MyErrorWrapperReturn<Fn, ErrorType>) =>
	(...args: Parameters<Fn>): MyErrorWrapperReturn<Fn, ErrorType> => {
		const returnFNOutput = <G>(result: G) =>
			(errorToThrow ? result : [result, false]) as MyErrorWrapperReturn<Fn, ErrorType>;

		const returnError = (error: unknown) => {
			if (errorToThrow) throw typeof errorToThrow === "function" ? errorToThrow(error) : errorToThrow;
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
