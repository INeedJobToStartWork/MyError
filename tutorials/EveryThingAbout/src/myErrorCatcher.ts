/**
 * @fileoverview 📘 Tutorial: myErrorCatcher
 * myErrorCatcher it's just `new promise` wrapper at one line!
 *
 *
 * @version 2.0.0
 */

import { myErrorCatcher } from "@packages/oh-my-error";

//----------------------
// 1️⃣ Basic Error Handling
//----------------------

/**
 * Traditional try-catch approach
 * This is how we typically handle errors without myErrorWrapper
 */
// 🟨 Traditional way

const data = new Promise((resolve) => {
  resolve(crashIf10(10));
}).catch(() => {
  // Code before crash...
  throw new Error("Can't read file!");
});

/**
 * 🟩 Solution 1: Basic Usage with Destructuring
 *
 * @description Simple Wrapping, no extra args.
 * @returns Array with two elements: [data, isError]
 * - On Success: [functionResult, false]
 * - On Error: [caughtError, true]
 */

const data2 = myErrorCatcher(crashIf10)(10).catch(() => {
  // Code before crash...
  throw new Error("Can't read file!");
});

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
