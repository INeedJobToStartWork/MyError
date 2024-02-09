import { expect, it } from "vitest";

import { readFile, readFileHandler } from "./readFile";
import { myErrorHandler } from "@/utils";

it("should read file", () => {
	const [result] = readFile("./fileToRead.txt");
	expect(result).toBe("Test pass text");
});
it("should Throw Error - not find file", () => {
	const [result, error] = readFile("./IDoNotExist.txt");
	if (error) expect(result.code).toBe("FS001");
});

it("", () => {
	myErrorHandler("FS001", readFileHandler)("Test");
});
