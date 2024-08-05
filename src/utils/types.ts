export type TODO = any; // eslint-disable-line @typescript-eslint/no-explicit-any
export type Prettify<T> = {
	[K in keyof T]: NonNullable<T[K]>;
};

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

export type TMyError<T = NonNullable<unknown>> = T & {
	code?: number | string;
	hint?: {
		dev?: string;
		user?: string;
	};
	message?: {
		dev?: string;
		user?: string;
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
	[K in T[keyof T]["code"]]: (...arguments_: K[]) => TFunctionReturn<unknown>;
}>;
// export type TMyHandler<,T extends TMyErrorList<CustomError>> = Partial<{
// 	[K in T[keyof T]["code"]]: (...args: K[]) => TFunctionReturn<unknown>;
// }>;
