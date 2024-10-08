/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { describe, expect, test } from "vitest";
import myErrorWrapper, { myErrorWrapperAsync } from "./myErrorWrapper";
import { myError } from "./myError";
import type { TMyErrorList } from "@/types";

describe("[FUNCTION] myErrorWrapper", () => {
	describe("[PASS]", () => {
		test("Double ()", () => {
			const sum = (sum1: number, sum2: number) => sum1 + sum2;

			const [data, isError] = myErrorWrapper(sum)(1, 2);
			expect(isError).toEqual(false);
			expect(data).toEqual(3);
		});
		test("Single ()", () => {
			const sum = (sum1: number, sum2: number) => sum1 + sum2;

			const [data, isError] = myErrorWrapper(() => sum(1, 2))();
			expect(isError).toEqual(false);
			expect(data).toEqual(3);
		});
		test("Async Single ()", async () => {
			const sum = async (sum1: number, sum2: number) => (await sum1) + sum2;

			const [data, isError] = await myErrorWrapperAsync(async () => sum(1, 2))();
			expect(isError).toEqual(false);
			expect(data).toEqual(3);
		});
		test("Async Double ()", async () => {
			const sum = async (sum1: number, sum2: number) => (await sum1) + sum2;

			const [data, isError] = await myErrorWrapperAsync(sum)(1, 2);
			expect(isError).toEqual(false);
			expect(data).toEqual(3);
		});
	});
	describe("[ERROR]", () => {
		test("Double ()", () => {
			const errorFunc = () => {
				throw new Error("AHA");
			};

			const [data, isError] = myErrorWrapper(errorFunc)();
			expect(isError).toEqual(true);
			expect(data).toEqual(new Error("AHA"));
		});
		test("Single ()", () => {
			const errorFunc = () => {
				throw new Error("AHA");
			};

			const [data, isError] = myErrorWrapper(() => errorFunc())();
			expect(isError).toEqual(true);
			expect(data).toEqual(new Error("AHA"));
		});
		test("Instant throw MyError if Error", () => {
			const MyErrorList = {
				TOO_HIGH_NUMBER: {
					code: "TOO_HIGH_NUMBER",
					name: "Num is too high.",
					message: "One of numbers is >10"
				}
			} satisfies TMyErrorList;
			const sumMax10 = (sum1: number, sum2: number) => {
				if (sum1 > 10 || sum2 > 10) throw new Error("sum1 or sum2 is higher than 10!");
				return sum1 + sum2;
			};
			const [error, isError] = myErrorWrapper(() =>
				myErrorWrapper(sumMax10, myError(MyErrorList.TOO_HIGH_NUMBER))(1, 20)
			)();
			expect(isError).toEqual(true);
			expect(error).toEqual(myError(MyErrorList.TOO_HIGH_NUMBER));
		});
	});
});
