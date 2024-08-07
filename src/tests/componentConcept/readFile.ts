import { readFileSync, existsSync } from "node:fs";
import { myErrorWrapper } from "@/utils";
import type { TMyErrorList, TMyHandler } from "@/utils/types";
import { join } from "node:path";
import MyError from "@/utils/myError";

const ErrorList = {
	notFound: {
		name: "Not Found",
		code: "FS001",
		message: { user: "File not found", dev: "The file you are trying to read does not exist" },
		hint: { user: "Check if the file exists", dev: "Check if the file exists" }
	},
	cantRead: {
		code: "FS002",
		name: "Cant Read",
		message: { user: "Can't read file", dev: "readFileSync throw error" },
		hint: {
			user: "Check if the file is not corrupted or permissions",
			dev: "File is corrupted or has no permissions to be read"
		}
	}
} as const satisfies TMyErrorList;

export const readFileHandler = {
	FS001: (name: string) => {
		if (name) return [{ code: "123" }, true];
		return ["File not found", false];
	},
	FS002: (name: string) => {
		if (name) return [{ code: "123" }, true];
		return [123, false];
	}
} as const satisfies TMyHandler<NonNullable<unknown>, typeof ErrorList>;

export const readFile = (path: string): string => {
	const finalPath = join(import.meta.dirname, path);
	if (!existsSync(finalPath)) throw new MyError(ErrorList.notFound);
	const [result, error] = myErrorWrapper(readFileSync)(finalPath);
	if (error) throw new MyError(ErrorList.cantRead);
	return result.toString();
};
