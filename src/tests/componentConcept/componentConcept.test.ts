import { expect, it } from "vitest";

import { readFile } from "./readFile";

it("should read file", () => {
	const [result, error] = readFile("./fileToRead.txt");
	expect(result).toBe("Test pass text");
});
it("should Throw Error - not find file", () => {
	const [result, error] = readFile("./IDoNotExist.txt");
	if (error) expect(result.code).toBe("FS001");
});

it("", () => {
	const [result, error] = readFile("./IDoNotExist.txt");
});
