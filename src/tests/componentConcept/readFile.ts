import { readFileSync, existsSync } from "node:fs";
import { myErrorHandler, myErrorWrapper } from "@/utils";
import type { TFunctionReturn, TMyErrorList } from "@/utils/types";
import { join } from "node:path";

const ErrorList = {
	notFound: {
		code: "FS001",
		message: { user: "File not found", dev: "The file you are trying to read does not exist" },
		hint: { user: "Check if the file exists", dev: "Check if the file exists" }
	},
	cantRead: {
		code: "FS002",
		message: { user: "Can't read file", dev: "readFileSync throw error" },
		hint: {
			user: "Check if the file is not corrupted or permissions",
			dev: "File is corrupted or has no permissions to be read"
		}
	}
} satisfies TMyErrorList;

const ErrorHandlerList = {
	FS001: () => "File not found"
} satisfies Record<(typeof ErrorList)[keyof typeof ErrorList]["code"], () => void>;
// const ErrorHandlerList = {
// 	FS001: () => console.log("File not found")
// } satisfies Record<(typeof ErrorList)[keyof typeof ErrorList]["code"], () => void>;

export const readFile = (path: string): TFunctionReturn<string> => {
	const finalPath = join(__dirname, path);
	if (!existsSync(finalPath)) return [ErrorList.notFound, true];
	const [result, error] = myErrorWrapper(readFileSync)(finalPath);
	if (error) return [ErrorList.cantRead, true];
	return [result.toString(), false];
};
