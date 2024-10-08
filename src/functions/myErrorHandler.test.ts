import { readFile, ErrorList as readErrorList } from "@/tests/componentConcept/readFile";
import { describe, expect, it } from "vitest";
import myErrorWrapper from "./myErrorWrapper";
import { myError } from "./myError";
import { join } from "node:path";
import myErrorHandler from "./myErrorHandler";

describe("[FUNCTION] myErrorHandler", () => {
	it("ased", async () => {
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
		const test = await myErrorHandler("FS001", MyErrorHandlerList)();
		expect(test).toBe(true);
	});
});
