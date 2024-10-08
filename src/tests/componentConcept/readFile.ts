import { readFileSync, existsSync } from "node:fs";
import { myError, myErrorWrapper } from "@/functions";

import { normalize } from "node:path";
import type { IMyError, TMyErrorList } from "@/types";

export const ErrorList = {
	notFound: {
		name: "Not Found",
		code: "FS001",
		message: { user: "File not found", dev: "The file you are trying to read does not exist" },
		hint: (path: string) => `Check if the file exists at ${path}`
	} satisfies IMyError,
	cantRead: {
		code: "FS002",
		name: "Cant Read",
		message: { user: "Can't read file", dev: "readFileSync throw error" },
		hint: {
			user: "Check if the file is not corrupted or permissions",
			dev: "File is corrupted or has no permissions to be read"
		}
	} satisfies IMyError
} as const satisfies TMyErrorList;

export const readFile = (path: string): string => {
	const finalPath = normalize(path);
	if (!existsSync(finalPath)) throw myError(ErrorList.notFound, { hint: [finalPath] });
	const result = myErrorWrapper(readFileSync, myError(ErrorList.cantRead))(finalPath);
	return result.toString();
};
