export type TODO = any; // eslint-disable-line @typescript-eslint/no-explicit-any
export type Prettify<T> = NonNullable<unknown> & {
	[K in keyof T]: T[K];
};
export type arrowFunction<T extends (...args: Array<Parameters<T>>) => ReturnType<T>> = (
	...args: Array<Parameters<T>>
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
		user?: string | ((e: TODO) => unknown);
		dev?: string | ((e: TODO) => unknown);
	};
	hint?: {
		user?: string | ((e: TODO) => unknown);
		dev?: string | ((e: TODO) => unknown);
	};
};

export type TError = [TMyError, true];
export type TErrorProof<T> = TError | [T, false];
