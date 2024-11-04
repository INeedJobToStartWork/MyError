import type { IMyError, TMyErrorList } from "@/types";

/**
 * `any` - But only allowed in development.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any;
/**
 * @dontexport
 */
export type Prettify<T> = {
	[K in keyof T]: NonNullable<T[K]>;
};

/** @dontexport */
export type arrowFunction<T extends (...arguments_: Parameters<T>) => ReturnType<T>> = (
	...arguments_: Parameters<T>
) => ReturnType<T>;

export type ErrorTypesCatched =
	| ErrorConstructor
	| EvalErrorConstructor
	| RangeErrorConstructor
	| ReferenceErrorConstructor
	| SyntaxErrorConstructor
	| TypeErrorConstructor;

/** @dontexport */
export type TDataReturn<T> = [T, false];
/** @dontexport */
export type TErrorReturn<CustomError = NonNullable<unknown>> = [CustomError & IMyError, true];
/** @dontexport */
export type TFunctionReturn<T> = Prettify<TDataReturn<T>> | Prettify<TErrorReturn>;

// export type TMyErrorList<CustomError = NonNullable<unknown>> = Record<string, Required<IMyError<CustomError>>>;

export type TMyHandler<
	CustomError,
	T extends Record<number | string, { code: string & unknown }> & TMyErrorList<CustomError>
> = Partial<{
	[K in T[keyof T]["code"]]: (...arguments_: K[]) => TFunctionReturn<unknown>;
}>;
// export type TMyHandler<G extends {},T extends TMyErrorList<G>> = Partial<{
// 	[K in T[keyof T]["code"]]: (...args: K[]) => TFunctionReturn<unknown>;
// }>;
// export type TMyHandler<T extends TMyErrorList> = Partial<{
// 	[K in T[keyof T]["code"]]: (...args: K[]) => TFunctionReturn<unknown>;
// }>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
/** @dontexport */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NoInfer<T> = [T][T extends any ? 0 : never];
