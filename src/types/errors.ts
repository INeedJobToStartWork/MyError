import type StatusCode from "./statusCodes";
import type { Prettify } from "@/types/internal";

//----------------
// TYPES ATOMS
//----------------

/**
 * Represents the severity level of an error or warning.
 */
export type TSeverity = "ERROR" | "WARNING";

// eslint-disable-next-line @typescript-eslint/sort-type-constituents
/**
 * Represents a more granular severity level.
 */
export type TSeverity2 = "CRITICAL" | "HIGH" | "LOW" | "MEDIUM";

export type TErrorMessages =
	| string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	| ((...params: any[]) => string);

/**
 * Error Messages to Dev,user (Or Both)
 * @example
 * ```
 * const Error:{name:string,message:TErrorMessages,hint:TErrorMessages} = {
 *		name: "Cant Read File",
 *		message: {
 *			user: "Can't read file",
 *			dev: "readFileSync throw error"
 *		},
 *		hint: {
 *			user: "Check if the file is not corrupted or permissions",
 *			dev: "File is corrupted or has no permissions to be read"
 *		}
 * }
 * ```
 * ```
 * const Error:{name:string,message:TErrorMessages,hint:TErrorMessages} = {
 *		name: "Not Supported Package manager",
 *		message: "Package manager is not supported!",
 *		hint: {
 *			user: "Contact with Developer to solve problem!",
 *			dev: "Check package support for Package managers."
 *		}
 * }
 * ```
 */
// export type arrowFunction<T extends (...arguments_: Parameters<T>) => ReturnType<T>> = (
// 	...arguments_: Parameters<T>
// ) => ReturnType<T>;

export type TErrorMessagesExt =
	| Prettify<TErrorMessages>
	| {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			dev?: TErrorMessages;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			user?: TErrorMessages;
	  };

//----------------
// Types
//----------------

export type TMyErrorList<CustomError = TAllMyErrorTypes> = Record<string, CustomError>; // TODO
export type TErrorList<T> = {
	errors?: T[];
};

/**
 * Perfect for throwing catched error by trycatch
 */
export type TCauseError = {
	cause?: unknown;
};
export type TDetails<T = unknown> = {
	details?: T;
};
export type TBaseError = {
	message?: Parameters<typeof Error>[0];
	options?: Parameters<typeof Error>[1];
};

export type TBaseErrorExt = {
	message?: TErrorMessages;
	options?: TCauseError;
};

export type TValidationError = {
	fields: Array<{
		[K: string]: unknown;
		expected_format?: string;
		max_value?: number;
		message: string;
		min_value?: number;
		name?: string;
		received_value?: unknown;
		type?: "custom" | "format" | "range" | "required";
	}>;
};

export type TApiError = {
	endpoint?: string;
	path?: string;
	status?: StatusCode | number;
	timestamp?: Date;
};

export type TApiRateLimit = {
	limit?: number;
	remaining?: number;
	reset?: Date | number;
	retryAfter?: Date | number;
	status?: StatusCode | number;
};

export interface IMyError {
	code?: number | string;
	hint?: TErrorMessagesExt;
	message?: TErrorMessagesExt;
	name?: string;
}

export interface IMyErrorAPI extends IMyError, TApiError {}
export interface IMyErrorRateLimit extends IMyError, TApiRateLimit {}
export interface IMyErrorValidation extends IMyError, TValidationError {}

export type TAllMyErrorTypes = IMyError | IMyErrorAPI | IMyErrorRateLimit | IMyErrorValidation;
