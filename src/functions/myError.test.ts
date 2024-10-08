/* eslint-disable @EslintSonar/no-duplicate-string */
import { describe, it, expect } from "vitest";
import { myError } from "./myError";
import type { IMyError, TMyErrorList } from "@/types";

describe("[FUNCTION] myError", () => {
	it("should return a basic error object", () => {
		const errorObj: IMyError = {
			name: "Test Error",
			message: "This is a test error",
			code: 500
		};

		const result = myError(errorObj);
		expect(result).toEqual(errorObj);
	});
	it("Example from Function should pass", () => {
		const MyErrorList = {
			BLACKLISTED: {
				name: "Black Listed Name",
				hint: "Try use other one!",
				message: (name: string) => `${name} is on black list!`
			}
		} as const satisfies TMyErrorList;

		expect(myError(MyErrorList.BLACKLISTED, { message: ["nameInputed"] })).toEqual({
			...MyErrorList.BLACKLISTED,
			message: (() => MyErrorList.BLACKLISTED.message("nameInputed"))()
		});
	});
	it("should return solved test", () => {
		const errorObj = {
			name: "Black Listed Name",
			message: (name: string, idNumber: number) => `${name} with ${idNumber} is blacklisted!`,
			code: 500
		} as const satisfies IMyError;

		const result = myError(errorObj, { message: ["BadName", 123] });
		expect(result).toEqual({ ...errorObj, message: `BadName with 123 is blacklisted!` });
	});
	it("Should not overwrite current keys which are not functions", () => {
		const errorObj = {
			name: "Black Listed Name",
			message: (name: string, idNumber: number) => `${name} with ${idNumber} is blacklisted!`,
			code: 500
		} as const satisfies IMyError;
		const result = myError(errorObj, { message: ["BadName", 123] });
		expect(result).toEqual({ ...errorObj, message: `BadName with 123 is blacklisted!` });
	});
	it("Should not add new keys", () => {
		const errorObj = {
			name: "Black Listed Name",
			message: (name: string, idNumber: number) => `${name} with ${idNumber} is blacklisted!`,
			code: 500
		} as const satisfies IMyError;
		const result = myError(errorObj, { message: ["BadName", 123], nonono: "lololo" });
		expect(result).toEqual({ ...errorObj, message: `BadName with 123 is blacklisted!` });
	});
});
