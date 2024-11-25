import { myError, myErrorWrapper } from ".";
import type { TMyErrorList } from "../types";

/** @internal */
const ErrorList = {
	noKeyInList: {
		code: "EH001",
		name: "Not found key in list",
		message: { dev: (errorName: string) => `${errorName} (key) not found in errorSolutions (object)` },
		hint: { dev: "Check if errorName is in errorSolutions" }
	},
	executionError: {
		code: "EH002",
		name: "Error in Execution",
		message: { dev: "Error in execution of Solution" },
		hint: {
			dev: (errCode: string, args: unknown) =>
				`Check if the function "errorSolutions[${errCode}](${args})" is working properly`
		}
	}
} as const satisfies TMyErrorList;

/**
 * Creates an error handler function that executes a specific error solution based on the provided error code.
 *
 *
 * @param errorCode - The error code to handle.
 * @param errorSolutions - An object containing error handling functions, keyed by error codes.
 *
 * @returns An sync function that:
 *   1. Checks if the error code exists in the solutions.
 *   2. If not, throws a "noKeyInList" error.
 *   3. If it exists, executes the corresponding error solution function.
 *   4. Wraps the execution in a try-catch block (myErrorWrapper) to handle any errors during execution.
 *
 * @example
 * ```
 * const [data, isError] = myErrorWrapper(readFile)("./ReadThisFile");
 *
 * const MyErrorHandlerList = {
 * 	FS001: () => {
 * 		// Do this code if throw this error
 * 		console.error("ERROR");
 * 	}
 * };
 * if (isError) myErrorHandler(data.code, MyErrorHandlerList)();
 * ```
 * @version 2.0.0
 */
export const myErrorHandler =
	<T extends unknown & keyof K, K extends Record<T, K[T]>>(errorCode: T & unknown, errorSolutions: K) =>
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	(...args: Parameters<K[T]>) => {
		if (!(errorCode in errorSolutions)) {
			throw myError(ErrorList.noKeyInList, { message: { dev: [errorCode.toString()] } });
		}

		return myErrorWrapper(
			errorSolutions[errorCode],
			myError(ErrorList.executionError, { hint: { dev: [errorCode.toString(), args] } })
		)(...args);
	};

export default myErrorHandler;
