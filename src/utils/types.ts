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

export type TMyError = {
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
export type TErrorReturned = [TMyError, true];
export type TFunctionReturn<T> = Prettify<TDataReturn<T>> | Prettify<TErrorReturned>;

export type TMyErrorList = Record<string, TMyError>;
