export type TODO = any; // eslint-disable-line @typescript-eslint/no-explicit-any
export type Prettify<T> = NonNullable<unknown> & {
	[K in keyof T]: T[K];
};

export type arrowFunction<T extends (...args: Parameters<T>) => ReturnType<T>> = (
	...args: Parameters<T>
) => ReturnType<T>;

export type ErrorTypesCatched =
	| ErrorConstructor
	| EvalErrorConstructor
	| RangeErrorConstructor
	| ReferenceErrorConstructor
	| SyntaxErrorConstructor
	| TypeErrorConstructor;

export type TMyError<T = NonNullable<unknown>> = T & {
	code?: number | string;
	message?: {
		user?: string;
		dev?: string;
	};
	hint?: {
		user?: string;
		dev?: string;
	};
};

export type TDataReturn<T> = [T, false];
export type TErrorReturn<CustomError = NonNullable<unknown>> = [TMyError<CustomError>, true];
export type TFunctionReturn<T> = Prettify<TDataReturn<T>> | Prettify<TErrorReturn>;

export type TMyErrorList<CustomError = NonNullable<unknown>> = Record<string, Required<TMyError<CustomError>>>;
export type TMyHandler<
	CustomError,
	T extends Record<number | string, { code: string & unknown }> & TMyErrorList<CustomError>
> = Partial<{
	[K in T[keyof T]["code"]]: (...args: K[]) => TFunctionReturn<unknown>;
}>;
// export type TMyHandler<,T extends TMyErrorList<CustomError>> = Partial<{
// 	[K in T[keyof T]["code"]]: (...args: K[]) => TFunctionReturn<unknown>;
// }>;
