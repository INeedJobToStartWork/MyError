/**
 * @fileoverview 📘 Tutorial: myErrorWrapper
 *
 * myErrorWrapper
 * With this function we can wrap any function in `TryCatch` at one line!
 *
 * myErrorWrapper is a utility that transforms traditional try-catch blocks
 * into elegant one-line expressions. It provides multiple ways to handle errors
 * and access error information.
 *
 * @version 3.0.0
 */

import { myErrorWrapper } from "@packages/oh-my-error";

//----------------------
// 1️⃣ Basic Error Handling
//----------------------

/**
 * Traditional try-catch approach
 * This is how we typically handle errors without myErrorWrapper
 */
// 🟨 Traditional way
let result;
try {
  result = crashIf10(10);
  console.log(result);
} catch (error) {
  throw new Error("Invalid number!");
}

/**
 * 🟩 Solution 1: Basic Usage with Destructuring
 *
 * @description Simple Wrapping, no extra args.
 * @returns Object with two elements: { data, isError }
 * - On Success: { data:functionResult, isError:false }
 * - On Error: { data:caughtError, isError:true }
 */
const { data, isError } = myErrorWrapper(crashIf10)(10);
if (isError) throw new Error("Invalid number!");
else console.log(data);

/**
 * 🟩 Solution 2: Automatic Error Throwing - `errorToThrow`
 *
 * @description Provides a more concise way by automatically throwing an error
 * @returns The function result (directly - no destructuring needed)
 * @throws `errorToThrow` element
 */
const data2 = myErrorWrapper(crashIf10, new Error("Invalid number!"))(10);
console.log(data2);

//----------------------
// 2️⃣ Advanced Error Handling
//----------------------

/**
 * Traditional approach with error cause
 * Shows how to preserve the original error information
 */
// 🟨 Traditional way
try {
  result = crashIf10(10);
  console.log(result);
} catch (error) {
  throw new Error("Invalid number!", { cause: error });
}

/**
 * 🟩 Solution 1: Error Access with Destructuring
 *
 * @description Allows access to the original error through destructuring
 * @returns Object with {data, isError} where data contains the error on failure
 */
const { data3, isError2 } = myErrorWrapper(crashIf10)(10);
if (isError2) throw new Error("Invalid number!", { cause: data3 });
else console.log(data3);

/**
 * 🟩 Solution 2: Custom Error Handler Function
 *
 * @description If argument passed to `errorToThrow` will be Function type, `myErrorWrapper` will pass as first argument catchedError
 * @param err The original error passed to the handler function
 * @returns The function result (directly - no destructuring needed)
 * @throws `errorToThrow` function results
 */
const data4 = myErrorWrapper(
  crashIf10,
  (err: unknown) => new Error("Invalid number!", { cause: err })
)(10);
console.log(data4);

//----------------------
// 🔧 Helper Function
//----------------------

/**
 * Test function that throws an error when input is 10
 * Used to demonstrate error handling in the examples above
 */
function crashIf10(num: number) {
  if (num === 10) {
    throw Error("It's 10!");
  }
  return num;
}
