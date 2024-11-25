/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { IMyError } from "../types";

//----------------------
// Types
//----------------------

/**
 * Represents an error object that may contain nested objects and functions.
 */
type ErrorObject = Record<string, unknown>;

/**
 * Helper type to extract function parameters or never for non-functions.
 */
type FunctionParameters<T> = T extends (...args: any[]) => any ? Parameters<T> : never;

/**
 * Type representing the structure of arguments for the myError function.
 * Maps each key from T to an array of parameters if the value is a function,
 * or recursively to the same type if the value is an object.
 */

type ErrorArgs<T> = {
	[K in keyof T]?: T[K] extends (...args: any[]) => any
		? FunctionParameters<T[K]>
		: T[K] extends object
			? ErrorArgs<T[K]>
			: T[K];
};

//----------------------
// Functions
//----------------------

/**
 * Processes an error object, invoking functions with provided arguments
 *
 * @param errorObj - The error object to process.
 * @param args - Optional arguments to call functions in the error object.
 * @returns Processed error object with invoked functions and processed nested objects.
 *
 * @example
 * ```
 * const MyErrorList = {
 *		BLACKLISTED:{
 *			name:"Black Listed Name",
 *			hint:"Try use other one!",
 *			message:(name:string)=>`${name} is on black list!`
 *		}
 * } as const satisfies TMyErrorList
 *
 * throw new myError(MyErrorList.BLACKLISTED,{message:["nameInputed"]})
 * // Throwed Element will look like:
 * {
 *			name:"Black Listed Name",
 *			hint:"Try use other one!",
 *			message:"nameInputed is on black list!"
 * }
 * ```
 *
 * @version 2.0.0
 */

export const myError = <T extends NonNullable<unknown> = IMyError>(errorObj: T, args?: ErrorArgs<T>): T => {
	const result = { ...errorObj };
	if (args) {
		for (const key in args) {
			if (!(key in result)) continue; // Check that `key` from args exist in result (errorT)
			if (typeof result[key] === "function") {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				result[key] = (result[key] as (...args: any[]) => any)(...(args[key] as any[])); // TODO: Change this later and remove eslint ignore above
			} else if (typeof result[key] === "object" && result[key] !== null) {
				result[key] = myError(
					result[key] as ErrorObject & T[Extract<keyof T, string>],
					args[key] as ErrorArgs<ErrorObject & T[Extract<keyof T, string>]>
				);
			}
		}
	}

	return result;
};
