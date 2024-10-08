![image](https://github.com/INeedJobToStartWork/MyError/assets/97305201/03fa3e50-af28-4345-a3f7-f84d091b4eb1)

<h1 align="center">MyError</h1>
<p align="center"><code>🎉2.0.0.prerelease.0🎊</code></p>
<p align="center"><b>A Very Clean Error Handler!</b></p>
<div align="center">
	<a >📗Tutorials (in soon)</a> |
	<a >📘Docs (in soon)</a> |
	<a href="https://github.com/INeedJobToStartWork/MyError/blob/main/CONTRIBUTING.md">🏗️Contributing Guide</a> 
</div>
<hr/>

About packages:

- 📖 TSDocs (Internal documentation)
- ♻️ Minified & Compressed
- ⚠️ Error Handler (`oh-my-error`)
- ✅ Support JS/TS & CJS/ESM

What you get:

- 🛡️ Type safety
- 🎯 Centralized error management
- 🚀 One-line error handling
- 🧑‍💻👥 Developer and user-friendly error messages
- 📝 Pre-defined error templates
- 🏗️ Consistent error structure across your application
- 🔌 Easy integration with existing codebases

## **Showcase**

```ts
// Make your life better

// Instead
let data;
try {
	data = readFile("...path");
} catch {
	throw Error("Cant Load File!");
}

// Do
const data = myErrorWrapper(readFile, Error("Cant Load File!"))("...path");
```

# 📜 List of Contest

- [📜 List of Contest](#-list-of-contest)
  - [Install](#install)
  - [TLDR (Only Most Important!)](#tldr-only-most-important)
    - [Functions](#functions)
    - [Types](#types)
  - [Functions](#functions-1)
    - [myError `♻️ Refactored`](#myerror-️-refactored)
    - [myErrorWrapper/Async `🎉 New feature!`](#myerrorwrapperasync--new-feature)
    - [myErrorCatcher](#myerrorcatcher)
    - [myErrorHandler](#myerrorhandler)
  - [Types](#types-1)
    - [TMyErrorList](#tmyerrorlist)
    - [Error Templates (Interfaces) `new!`](#error-templates-interfaces-new)
    - [Predefined elements for Functions (Atoms) `new!`](#predefined-elements-for-functions-atoms-new)

## Install

NPM

```bash copy
npm install oh-my-error
```

PNPM

```bash copy
pnpm add oh-my-error
```

Yarn

```bash copy
yarn add oh-my-error
```

## TLDR (Only Most Important!)

### Functions

| Name                                           | Description                     |
| ---------------------------------------------- | ------------------------------- |
| [myError](#myerror-️-refactored)               | Handle with Error Object        |
| [myErrorWrapper](#myerrorwrapper--new-feature) | `trycatch` wrapper one liner    |
| [myErrorCatcher](#myerrorcatcher)              | `promise` wrapper               |
| [myErrorHandler](#myerrorhandler)              | handle scenarios for each error |

### Types

**Error Templates**

| Name                                              | Description                                                     |
| ------------------------------------------------- | --------------------------------------------------------------- |
| [TMyErrorList](#tmyerrorlist) `!important`        | For creating list with errors in one place!                     |
| [IMyError](#error-templates-interfaces)           | Basic Error                                                     |
| [IMyErrorAPI](#error-templates-interfaces)        | Basic Error API                                                 |
| [IMyErrorRateLimit](#error-templates-interfaces)  | [IMyErrorApi](#error-templates-interfaces) with RateLimit error |
| [IMyErrorValidation](#error-templates-interfaces) | [IMyError](error-templates-interfaces) with Validation error    |

**[Rest Types for creating own Errors](#predefined-elements-for-functions-atoms)**

## Functions

### myError `♻️ Refactored`

Processes an error object, invoking functions with provided arguments

```ts
const MyErrorList = {
	BLACKLISTED: {
		name: "Black Listed Name",
		hint: "Try use other one!",
		message: (name: string) => `${name} is on black list!`
	}
} as const satisfies TMyErrorList;

throw new myError(MyErrorList.BLACKLISTED, { message: ["nameInputed"] });
```

**Output**

```ts
{
  name:"Black Listed Name",
  hint:"Try use other one!",
  message:"nameInputed is on black list!"
}
```

### myErrorWrapper/Async `🎉 New feature!`

`trycatch` wrapper with instant error thrower.

```ts
// Before
let data;
try {
  data = readFile("path...");
} catch(){
  throw new Error("Can't read file!");
}

// After

const [data,isError] = myErrorWrapper(readFile)("path...");
if(isError) throw new Error("Can't read file!")

// Or instant Error Throw

const data = myErrorWrapper(readFile,new Error("Can't read file!"))("path...");
```

### myErrorCatcher

`new Promise` wrapper.

```ts
const data = await myErrorCatcher(readFile)("path...").catch(() => {
	// Code before crash...
	throw new Error("Can't read file!");
});
```

### myErrorHandler

Execute Scenarios for an error!

```ts
const [data, isError] = myErrorWrapper(readFile)("./ReadThisFile");

const MyErrorHandlerList = {
	FS001: () => {
		// Do this code if throw this error
		console.error("ERROR");
	}
};
if (isError) await myErrorHandler(data.code, MyErrorHandlerList)();
```

## Types

### TMyErrorList

> [!IMPORTANT]  
> Use `as const satisfies TMyErrorList` to work it properly. <br/> **Don't** forget about `const` because without this
> you not gonna get tips.

> [!TIP]  
> You can add `satisfies ERRORTYPE` per error to have strict typing per error or just add
> `as const satisfies TMyErrorList<ERRORTYPE>` to have strict typing too!

```ts
const ErrorList = {
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
	}
} as const satisfies TMyErrorList;
```

### Error Templates (Interfaces) `new!`

There you can find ready error structures.

| Name                      | Description                       | Extends                                                                                               |
| ------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------- |
| IMyError `new!`           | Basic Error                       | -                                                                                                     |
| IMyErrorAPI `new!`        | Basic Error for an API error      | [IMyError](#error-templates-interfaces), [TApiError](#predefined-elements-for-functions-atoms)        |
| IMyErrorRateLimit `new!`  | API error for RateLimit           | [IMyError](#error-templates-interfaces), [TApiRateLimit](#predefined-elements-for-functions-atoms)    |
| IMyErrorValidation `new!` | API error for Validation problems | [IMyError](#error-templates-interfaces), [TValidationError](#predefined-elements-for-functions-atoms) |

### Predefined elements for Functions (Atoms) `new!`

Short predefined types to easy creating own Error types!

| Name (Col1)                                                                                              | Name (Col2)                                                                                             | Name (Col3)                                                                                           |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [TSeverity](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) `new!`         | [TSeverity2](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) `new!`       | [TErrorMessages](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) `new!` |
| [TErrorMessagesExt](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) `new!` | [TMyErrorList](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) `new!`     | [TErrorList](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) `new!`     |
| [TCauseError](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) `new!`       | [TDetails](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) `new!`         | [TBaseError](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) `new!`     |
| [TBaseErrorExt](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) `new!`     | [TValidationError](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) `new!` | [TApiError](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) `new!`      |
| [TApiRateLimit](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) `new!`     |                                                                                                         |                                                                                                       |
