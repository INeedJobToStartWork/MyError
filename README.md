![image](https://github.com/INeedJobToStartWork/MyError/assets/97305201/03fa3e50-af28-4345-a3f7-f84d091b4eb1)
<h1 align="center">MyError</h1>
<p align="center"><b>Very Clean Error Handler!</b></p>

<hr/>

# 📜 List of Contest

- [Install](#install)
- [Types](#types)
- [Functions](#existing-functions)
  - [myErrorWrapper](#custom-file-path)
  - [myErrorCatcher](#init-config)
  - [myErrorHandler](#init-config)
- [Objects](#new-functions)
  - [MyErrorList](#init-config)
  - [MyErrorHandlerList](#init-config)
- [Sample of Code](#sample-of-code)
    

## Install

NPM

```bash copy
npm install myerror
```

PNPM

```bash copy
pnpm add myerror
```

Yarn

```bash copy
yarn add myerror
```

## Types

### TMyError<T>
Error construction with optional own parameters.
```
type TMyError<T = NonNullable<unknown>> = T & {
	code?: number | string;
	message?: {
		user?: string;
		dev?: string;
	};
	hint?: {
		user?: string;
		dev?: string;
	};
}
```

### TMyErrorList
Object with TMyError structure

```
export type TMyErrorList<CustomError = NonNullable<unknown>> = Record<string, Required<TMyError<CustomError>>>;
```

### TMyHandler
Object with handlers of errors

```
export type TMyHandler<
	CustomError,
	T extends Record<number | string, { code: string & unknown }> & TMyErrorList<CustomError>> = Partial<{[K in T[keyof T]["code"]]: (...args: K[]) => TFunctionReturn<unknown>;}
>;
```

### TMyFunctionReturn
Function return standard. 
```
export type TFunctionReturn<T> = Prettify<TDataReturn<T>> | Prettify<TErrorReturn>;
```

### TErrorReturn
Function Error return standard
```
export type TErrorReturn<CustomError = NonNullable<unknown>> = [TMyError<CustomError>, true]
```
### TDataReturn -
Function Data return standard
```
export type TDataReturn<T> = [T, false];
```

## Functions
### myErrorWrapper
Error Wrapper which works on trycatch return result in array
#### Arguments
Function is receiving 2 arguments.
```
<T extends arrowFunction<T>>(fnThatMayThrow: T) => (...args: Parameters<T>)
```
`fnThatMayThrow` - **Function** which we want to run. <br/>
`args` - Arguments which `fnThatMayThrow` should receive.

#### Return
```
  type MyErrorWrapperReturn<T extends arrowFunction<T>> = [ErrorTypesCatched, true] | [ReturnType<T>, false]
```
<br/>

`[ error throwed trycatch , true - status of error ]` <br/>
**or** <br/>
`[ fnThatMayThrow(...args) returntype/result , false - status of error ]`

#### Example
Wrapping currently existing function <br/>
```
const [data,error] = myErrorWrapper(readFileSync)("./PathToFile.txt")
```


### myErrorCatcher
Error Catcher work on Promises
#### Arguments
Function is receiving 2 arguments.
```
<T extends arrowFunction<T>>(fnThatMayThrow: T) => async (...args: Parameters<T>)
```
`fnThatMayThrow` - **Function** which we want to run. <br/>
`args` - Arguments which `fnThatMayThrow` should receive.

#### Return
```
  Promise<Prettify<ReturnType<T>>>
```
Return promise for `fnThatMayThrow` return type.
#### Example
Wrapping currently existing function.
```
const data = myErrorCatcher(readFileSync)("./PathToFile.txt").catch(()=>{
  console.log("Can't load file.")
  process.exit(0)
})
```

### myErrorHandler
Function which handle error of your function.
#### Arguments
```
<T extends keyof K, K extends Record<T, K[T]>>(errorName: T, errorSolutions: K) =>
	(...args: Parameters<K[T]>)
```
`errorCode` - `Key` in `Object` of `errorSolutions`.<br/>
`errorSolutions` - Object which Storage solutions for problem `errorCode`.<br/>
#### Return
```
Prettify<TFunctionReturn<ReturnType<K[T]>>>
```
`[ TMyError , true - status of error ]` <br/>
**or** <br/>
`[ errorSolutions[errorCode](...args) returntype/result , false - status of error ]`
#### Errors

##### EH001
errorName (key) not found in errorSolutions (object)<br/>
Check if errorName is in errorSolutions<br/>

##### EH002
Error in execution of Solution <br/>
Check if the function `errorSolutions[errorName]()` is working properly

## Objects
### MyErrorList
List of Errors which your function can return.

> [!IMPORTANT]  
> Use `as const satisfies TMyErrorList` to work it properly. <br/>
> **Don't** forget about `const` because without this you not gonna get tips.

#### Example
```
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
} as const satisfies TMyErrorList;
```

### TMyHandler
List of Errors handlers which your function can run.

> [!IMPORTANT]  
> Use `as const satisfies TMyHandler<NonNullable<unknown>, typeof ErrorList>` to work it properly. <br/>
> **Don't** forget about `const` because without this you not gonna get tips.

#### Example
```
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
```


## Sample of Code
[File with Example](https://github.com/INeedJobToStartWork/MyError/blob/main/src/tests/componentConcept/readFile.ts)

```
import { readFileSync, existsSync } from "node:fs";
import { myErrorWrapper } from "@/utils";
import type { TFunctionReturn, TMyErrorList, TMyHandler } from "@/utils/types";
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

export const readFile = (path: string): TFunctionReturn<string> => {
	const finalPath = join(__dirname, path);
	if (!existsSync(finalPath)) return [ErrorList.notFound, true];
	const [result, error] = myErrorWrapper(readFileSync)(finalPath);
	if (error) return [ErrorList.cantRead, true];
	return [result.toString(), false];
};
```




