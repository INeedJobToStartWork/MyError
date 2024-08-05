// eslint-disable-next-line @EslintImports/no-deprecated, @EslintImports/namespace
import { expect, it } from "vitest";

import { readFile } from "./readFile";
import { myErrorWrapper } from "@/utils";
import type { TMyErrorList } from "@/index";

it("should read file", () => {
	const [result] = readFile("./fileToRead.txt");
	expect(result).toBe("Test pass text");
});
it("should Throw Error - not find file", () => {
	const [result, error] = readFile("./IDoNotExist.txt");
	if (error) expect(result.code).toBe("FS001");
});

// it("", () => {
// 	myErrorHandler("FS001", readFileHandler)("Test");
// });
it("", () => {
	const ErrorList = {
		EXECUTING: {
			code: "initPackage:EXECUTING_COMMAND",
			message: {
				user: "Error while executing command",
				dev: "execSync has thrown an error while executing the command"
			},
			hint: {
				user: "Contact with developer to solve the problem",
				dev: "Check the command and the error message"
			}
		},
		NOTSUPPORTEDPKGMNG: {
			code: "initPackage:NOT_SUPPORTED_PACKAGE_MANAGER",
			message: {
				user: "The package manager is not supported by the application.",
				dev: "Library does not support the package manager"
			},
			hint: {
				user: "Contact with developer to solve the problem",
				dev: "Check library support for the package manager. Create an issue on the library repository with request to add your package manager."
			}
		}
	} as const satisfies TMyErrorList;

	const functionTOP = () => {
		function testa(arg: string) {
			console.log("TEST", arg);
			return arg;
		}
		const finalPrompt = "Test";
		const [, error] = myErrorWrapper(testa)(finalPrompt);
		if (error) return [ErrorList.EXECUTING, true];
		return [void 0, false];
	};
	const result = functionTOP();
	expect(result).toStrictEqual([undefined, false]);
});

it("", () => {
	function test(arg: string) {
		console.log(arg);
		return arg;
	}

	const [data] = myErrorWrapper(test)("Hello World!");

	expect(data).toBe("Hello World!");
});
