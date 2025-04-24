![image](https://github.com/INeedJobToStartWork/MyError/assets/97305201/03fa3e50-af28-4345-a3f7-f84d091b4eb1)

<h1 align="center">MyError</h1>
<p align="center"><code>🎉3.0.0🎊</code></p>
<p align="center"><b>A Very Clean Error Handler!</b></p>
<div align="center">
	<a href="https://github.com/INeedJobToStartWork/MyError/tree/main/tutorials/README.md">📗Tutorials</a> |
	<a >📘Docs (in soon)</a> |
	<a href="https://github.com/INeedJobToStartWork/MyError/blob/main/CONTRIBUTING.md">🏗️Contributing Guide</a> 
</div>
<hr/>

About package:

- 🛡️ Type safety
- 📖 TSDocs (Internal documentation)
- ♻️ Minified & Compressed
- ⚠️ Error Handler (`oh-my-error`)
- ✅ Support JS/TS & CJS/ESM

What you get:

- 🚀 One-line error handling
- 🎯 Centralized error management
- 🧑‍💻👥 Error messages for Developers and users!
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
    - [myError](#myerror)
    - [myErrorWrapper `♻️ Refactored`](#myerrorwrapper-️-refactored)
    - [myErrorCatcher](#myerrorcatcher)
    - [myErrorHandler](#myerrorhandler)
  - [Types](#types-1)
    - [TMyErrorList](#tmyerrorlist)
    - [Error Templates (Organisms)](#error-templates-organisms)
    - [Predefined elements (Moleculars)](#predefined-elements-moleculars)
    - [Predefined types for properties (Atoms)](#predefined-types-for-properties-atoms)
    - [Utils Types](#utils-types)

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

### myError

Processes an error object, invoking functions with provided arguments

```ts
const MyErrorList = {
  BLACKLISTED: {
    name: "Black Listed Name",
    hint: "Try use other one!",
    message: (name: string) => `${name} is on black list!`,
  },
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

### myErrorWrapper `♻️ Refactored`

`TryCatch` one line wrapper with instant error thrower.

```ts
// Before
let data;
try {
  data = readFile("path...");
} catch(){
  throw new Error("Can't read file!");
}

// After

const {data,isError} = myErrorWrapper(readFile)("path...");
if(isError) throw new Error("Can't read file!")

// Or instant Error Throw (with errorToThrow)
const data = myErrorWrapper(readFile,new Error("Can't read file!"))("path...");
// With Passing Throwed Error to our error
const data = myErrorWrapper(readFile,err => new Error(`ERROR MESSAGE: ${err.message}}`))("path...");
```

> [!TIP] Async Functions  
> At async function it returns Promise, just use `await` to solve that

```ts
const data = await myErrorWrapper(
  asyncFun,
  new Error("Oh, Error!")
)("MyString");
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
const { data, isError } = myErrorWrapper(readFile)("./ReadThisFile");

const MyErrorHandlerList = {
  FS001: () => {
    // Do this code if throw this error
    console.error("ERROR");
  },
};
if (isError) myErrorHandler(data.code, MyErrorHandlerList)();
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
    message: {
      user: "File not found",
      dev: "The file you are trying to read does not exist",
    },
    hint: (path: string) => `Check if the file exists at ${path}`,
  } satisfies IMyError,
  cantRead: {
    code: "FS002",
    name: "Cant Read",
    message: { user: "Can't read file", dev: "readFileSync throw error" },
    hint: {
      user: "Check if the file is not corrupted or permissions",
      dev: "File is corrupted or has no permissions to be read",
    },
  },
} as const satisfies TMyErrorList;
```

### Error Templates (Organisms)

There you can find ready error structures.

| Name                                                                                                | Description                                                                                                                                       | Extends                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [IMyError](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts)            | Basic Error Template for **Error**                                                                                                                |                                                                                                                                                                                                |
| [IMyErrorAPI](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts)         | Basic Error Template for **API**                                                                                                                  | [IMyError](#error-templates-interfaces), [TApiError](#predefined-elements-for-functions-atoms)                                                                                                 |
| [IMyErrorRateLimit](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts)   | Basic Error Template for **API Rate limit**                                                                                                       | [IMyError](#error-templates-interfaces), [TApiRateLimit](#predefined-elements-for-functions-atoms)                                                                                             |
| [IMyErrorValidation](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts)  | Basic Error Template for **Validation**                                                                                                           | [IMyError](#error-templates-interfaces), [TValidationError](#predefined-elements-for-functions-atoms)                                                                                          |
| [TAllMyErrorTypes](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts)    | Every Error Template **exclude** `TBaseError` & `TBaseErrorExt`                                                                                   | [IMyError](#error-templates-interfaces) \| [IMyErrorAPI](#error-templates-interfaces) \| [IMyErrorRateLimit](#error-templates-interfaces) \| [IMyErrorValidation](#error-templates-interfaces) |
| [TAllMyErrorTypesExt](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) | Every Error Template with return type Function or Value option **exclude** `TBaseError` & `TBaseErrorExt`                                         | [TValueOrFunction]()<[TAllMyErrorTypes](#error-templates-interfaces)>                                                                                                                          |
|                                                                                                     |                                                                                                                                                   |                                                                                                                                                                                                |
| [TBaseError](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts)          | Predefined type for [**Error**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error)                     | -                                                                                                                                                                                              |
| [TBaseErrorExt](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts)       | Predefined type for [**Error**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error) with function types | -                                                                                                                                                                                              |

### Predefined elements (Moleculars)

Short predefined types to easy creating own Error types!

| Name (Col1)                                                                                       | Name (Col2)                                                                                | Name (Col3)                                                                                   |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| [TValidationError](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts)  | [TApiError](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts)  | [TApiRateLimit](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) |
| [TErrorMessagesExt](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) | [TErrorList](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) | [TCauseError](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts)   |
| [TDetails](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts)          | -                                                                                          | -                                                                                             |

### Predefined types for properties (Atoms)

Short predefined types for properties!

| Name (Col1)                                                                               | Name (Col2)                                                                                | Name (Col3)                                                                                      |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| [TSeverity](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) | [TSeverity2](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) | [StatusCodes](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/statusCodes.ts) |

### Utils Types

| Name (Col1)                                                                                      | Name (Col2)                                                                                         | Name (Col3) |
| ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | ----------- |
| [TValueOrFunction](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) | [TValueOrFunctionAll](https://github.com/INeedJobToStartWork/MyError/blob/main/src/types/errors.ts) | -           |
