/* eslint-disable @typescript-eslint/ban-types */
import type StatusCode from "./statusCodes";
import type { Prettify } from "./internal";

//----------------
// TYPES UTILS
//----------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/** Transform whole object properties type at `TValueOrFunctionAll` */
export type TValueOrFunctionAll<T> = T extends object
	? { [K in keyof T]: TValueOrFunctionAll<T[K]> }
	: TValueOrFunction<T>;

/** Represents a type that can be either a value of type T or a function that returns a value of type T. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TValueOrFunction<T> = T | ((...params: any[]) => T);

//----------------
// TYPES ATOMS
//----------------

/** Represents the severity level of an error or warning. @version 2.0.0*/
export type TSeverity = "ERROR" | "WARNING";

/** Represents a more granular severity level. @version 2.0.0*/
export type TSeverity2 = "CRITICAL" | "HIGH" | "LOW" | "MEDIUM";

//----------------
// TYPES MOLECULES
//----------------

/** Validation field structure @version 2.0.0*/
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

/** API error structure @version 2.0.0*/
export type TApiError = {
	endpoint?: string;
	path?: string;

	status?: StatusCode | (number & {});
	timestamp?: Date;
};

/** API rate limit structure @version 2.0.0*/
export type TApiRateLimit = {
	limit?: number;
	remaining?: number;
	reset?: Date | number;
	retryAfter?: Date | number;
	status?: StatusCode | (number & {});
};

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
 * @version 2.0.0
 */

export type TErrorMessagesExt =
	| Prettify<TValueOrFunction<string>>
	| {
			dev?: TValueOrFunction<string>;
			user?: TValueOrFunction<string>;
	  };

/** Error collection type @version 2.0.0*/
export type TErrorList<T> = {
	errors?: T[];
};

/** Basic error cause type @version 2.0.0*/
export type TCauseError = {
	cause?: unknown;
};

/** Basic details container @version 2.0.0*/
export type TDetails<T = unknown> = {
	details?: T;
};

//----------------
// TYPES ORGANISMS
//----------------

/**
 * Basic Error Template for Error
 * @author oh-my-error
 * @version 2.0.0
 */
export interface IMyError {
	code?: number | string;
	hint?: TErrorMessagesExt;
	message?: TErrorMessagesExt;
	name?: string;
}

/** Basic Error Template for **API** @version 2.0.0*/
export interface IMyErrorAPI extends IMyError, TApiError {}

/** Basic Error Template for **API Rate limit** @version 2.0.0*/
export interface IMyErrorRateLimit extends IMyError, TApiRateLimit {}

/** Basic Error Template for **Validation** @version 2.0.0*/
export interface IMyErrorValidation extends IMyError, TValidationError {}

/** Every Error Template with return type Function or Value option exclude TBaseError & TBaseErrorExt @version 2.0.0*/
export type TAllMyErrorTypesExt = TValueOrFunctionAll<TAllMyErrorTypes>;

/** Every Error Template exclude TBaseError & TBaseErrorExt @version 2.0.0*/
export type TAllMyErrorTypes = IMyError | IMyErrorAPI | IMyErrorRateLimit | IMyErrorValidation;

/** Predefined type for `Error` with Extension @version 2.0.0*/
export type TBaseErrorExt = TValueOrFunctionAll<TBaseError>;

/** Predefined type for `Error` @version 2.0.0*/
export type TBaseError = {
	message?: Parameters<typeof Error>[0];
	options?: Parameters<typeof Error>[1];
};

/** Predefined type for `Error` @version 2.0.0*/
export type TMyErrorList<CustomError = TAllMyErrorTypesExt> = Record<string, CustomError>;
