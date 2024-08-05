import type { TMyError } from "./types";

// export const MyError = <TCustom = NonNullable<unknown>>(error: TMyError<TCustom>): TMyError<TCustom> => error;
export class MyError<TCustom = NonNullable<unknown>> {
	public code: TMyError<TCustom>["code"];
	public hint: TMyError<TCustom>["hint"];
	public message: TMyError<TCustom>["message"];
	public name: TMyError<TCustom>["name"];
	constructor(error: Required<TMyError<TCustom>>) {
		this.message = error.message;
		this.code = error.code;
		this.hint = error.hint;
		this.name = error.name;
	}
}

export default MyError;
