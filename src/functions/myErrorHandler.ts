/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { myError, myErrorWrapperAsync } from "@/functions";
import type { TMyErrorList } from "@/types";

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
 * @returns An async function that:
 *   1. Checks if the error code exists in the solutions.
 *   2. If not, throws a "noKeyInList" error.
 *   3. If it exists, executes the corresponding error solution function.
 *   4. Wraps the execution in a try-catch block to handle any errors during execution.
 *
 */
export const myErrorHandler =
	<T extends keyof K, K extends Record<T, K[T]>>(errorCode: T, errorSolutions: K) =>
	async (...args: Parameters<K[T]>): Promise<ReturnType<K[T]>> => {
		if (!(errorCode in errorSolutions)) {
			throw myError(ErrorList.noKeyInList, { message: { dev: [errorCode.toString()] } });
		}

		return myErrorWrapperAsync(
			errorSolutions[errorCode],
			myError(ErrorList.executionError, { hint: { dev: [errorCode.toString(), args] } })
		)(...args);
	};

// TODO: Maybe add Sync Alternative, but this works for everything
export default myErrorHandler;
