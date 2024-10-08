import { describe, it, expect } from "vitest";
import { ErrorList, readFile } from "./readFile";
import { join } from "node:path";
import { myError, myErrorWrapper } from "@/functions";

describe("[FUNCTION] readFile", () => {
	const testFilePath = join(import.meta.dirname, "/fileToRead.txt");
	const testFileContent = "Test file content\n";

	it("should successfully read a file", () => {
		const result = readFile(testFilePath);
		expect(result).toEqual(testFileContent);
	});

	it('should throw a "Not Found" error when file does not exist', () => {
		const pathToFile = join(import.meta.dirname, "/oyyoyoyoyoyoyo");
		const [data, isError] = myErrorWrapper(readFile)(pathToFile);
		expect(isError).toEqual(true);
		expect(data).toEqual(myError(ErrorList.notFound, { hint: [pathToFile] }));
	});
	// TODO: Error Test for Corrupted files
});
