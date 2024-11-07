import { describe, expect, it } from "vitest";

import { join } from "node:path";
import { myError, myErrorWrapper, myErrorHandler } from "@/functions";
import { ErrorList as readErrorList, readFile } from "@/tests/componentConcept/readFile";

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
		};

		const test = myErrorHandler("FS001", MyErrorHandlerList)();
		expect(test).toBe(true);
	});
});
