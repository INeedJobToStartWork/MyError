import { describe, expect, it } from "vitest";
import { join } from "node:path";
import { myError, myErrorWrapper, myErrorHandler } from ".";
import { ErrorList as readErrorList, readFile } from "../tests/componentConcept/readFile";

describe("[FUNCTION] myErrorHandler", () => {
	it("should handle file not found error", () => {
		const pathToFile = join(import.meta.dirname, "./OLOLOLOLOLO");
		const result = myErrorWrapper(readFile)(pathToFile);

		expect(result.isError).toBe(true);
		expect(result.data).toEqual(myError(readErrorList.notFound, { hint: [pathToFile] }));

		const MyErrorHandlerList = {
			FS001: () => {
				console.error("ERROR");
				return true;
			}
		} as const;

		//@ts-expect-error Expect error because there is no error narrowing
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const handled = myErrorHandler(result.data.code, MyErrorHandlerList)();
		expect(handled).toBe(true);
	});
});
