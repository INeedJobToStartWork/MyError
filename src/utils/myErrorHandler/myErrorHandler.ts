import type { Prettify, TFunctionReturn, TMyErrorList } from "@/utils/types";
import { myErrorWrapper } from "..";

const ErrorList = {
	noKeyInList: {
		code: "EH001",
		message: { dev: "errorName (key) not found in errorSolutions (object)" },
		hint: { dev: "Check if errorName is in errorSolutions" }
	},
	executionError: {
		code: "EH002",
		message: { dev: "Error in execution of Solution" },
		hint: { dev: "Check if the function `errorSolutions[errorName]()` is working properly " }
	}
} as const satisfies TMyErrorList;

export const myErrorHandler =
	<T extends keyof K, K extends Record<T, K[T]>>(errorCode: T, errorSolutions: K) =>
	(...args: Parameters<K[T]>): Prettify<TFunctionReturn<ReturnType<K[T]>>> => {
		if (!(errorCode in errorSolutions) && errorSolutions[errorCode]) return [ErrorList.noKeyInList, true];
		try {
			const [data, error] = myErrorWrapper(errorSolutions[errorCode])(...args);
			if (error) throw new Error();
			return data as K[T];
		} catch {
			return [ErrorList.executionError, true];
		}
	};
export default myErrorHandler;
