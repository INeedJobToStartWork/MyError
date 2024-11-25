import { describe, expect, it } from "vitest";

import { join } from "node:path";
import { myError, myErrorWrapper, myErrorHandler } from ".";
import { ErrorList as readErrorList, readFile } from "../tests/componentConcept/readFile";

describe("[FUNCTION] myErrorHandler", () => {
	it("ased", () => {
		const pathToFile = join(import.meta.dirname, "./OLOLOLOLOLO");
		const [data, isError] = myErrorWrapper(readFile)(pathToFile);

		expect(isError).toBe(true);
		expect(data).toEqual(myError(readErrorList.notFound, { hint: [pathToFile] }));

		const MyErrorHandlerList = {
			FS001: () => {
				console.error("ERROR");
				return true;
			}
		} as const;

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
		const test = myErrorHandler((data as any).code, MyErrorHandlerList)();
		expect(test).toBe(true);
	});
});
