/* eslint-disable @typescript-eslint/require-await */
import { describe, expect, test } from "vitest";
import myErrorCatcher from "./myErrorCatcher";

describe("[FUNCTION] myErrorCatcher", () => {
	describe("[ERRORS]", () => {
		test("myErrorCatcher catch error and throw own error", () => {
			const funThrowErr = () => {
				throw new Error("Oh, it's Error!");
			};

			// eslint-disable-next-line vitest/valid-expect, @typescript-eslint/no-floating-promises, @typescript-eslint/promise-function-async
			expect(() =>
				myErrorCatcher(funThrowErr)().catch(() => {
					throw new Error("Function Throws Error!");
				})
			).rejects.toThrowError("Function Throws Error!");
		});
		test("ASYNC myErrorCatcher catch error and throw own error", async () => {
			const funThrowErr = async () => {
				throw new Error("Oh, it's Error!");
			};

			// eslint-disable-next-line vitest/valid-expect, @typescript-eslint/no-floating-promises, @typescript-eslint/promise-function-async
			expect(() =>
				myErrorCatcher(funThrowErr)().catch(() => {
					throw new Error("Function Throws Error!");
				})
			).rejects.toThrowError("Function Throws Error!");
		});
	});
	describe("[PASS]", () => {
		test("myErrorCatcher w", async () => {
			const funReturnName = async (name: string) => name;

			// eslint-disable-next-line vitest/valid-expect, @typescript-eslint/no-floating-promises, @typescript-eslint/promise-function-async
			expect(
				await myErrorCatcher(funReturnName)("John").catch(() => {
					throw new Error("Function Throws Error!");
				})
			).toBe("John");
		});
		test("ASYNC myErrorCatcher catch error and throw own error", async () => {
			const funThrowErr = async () => {
				throw new Error("Oh, it's Error!");
			};

			// eslint-disable-next-line vitest/valid-expect, @typescript-eslint/no-floating-promises, @typescript-eslint/promise-function-async
			expect(() =>
				myErrorCatcher(funThrowErr)().catch(() => {
					throw new Error("Function Throws Error!");
				})
			).rejects.toThrowError("Function Throws Error!");
		});
	});
});
