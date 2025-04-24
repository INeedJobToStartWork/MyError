/**
 * @fileoverview 📘 Tutorial: myError & Custom Errors
 *
 * `oh-my-error` supports complex error handling and makes it easier.
 * `myError` is an error object handler which "precalculates" functions.
 *
 * @version 2.0.0 myError
 * @version 2.0.0 TMyErrorList
 * @version 2.0.0 IMyError
 * @version 2.0.0 TValueOrFunctionAll
 * @version 2.0.0 TDetails
 */

import "@total-typescript/ts-reset";
import {
  myError,
  TDetails,
  TValueOrFunctionAll,
  type IMyError,
  type TMyErrorList,
} from "@packages/oh-my-error";

//----------------------
// 1️⃣ Built-in Custom Errors
//----------------------

/**
 * `oh-my-error` provides many built-in, ready-to-use Error Types/Interfaces.
 * One of them is `IMyError` - for most basic errors.
 *
 * @see [Docs](https://github.com/INeedJobToStartWork/MyError?tab=readme-ov-file#error-templates-organisms-new)
 */

function nameValidator(name: string): string {
  if (name.length === 0) {
    throw {
      name: "Too Short Name",
      code: "TOO_SHORT_NAME",
      message: "Name length must be longer than 0",
    };
  }
  if (name.includes(" ")) {
    throw {
      name: "Spaces in Name",
      code: "SPACES_IN_NAME",
      message: "Name cannot include any spaces!",
      hint: {
        user: "Remove all spaces",
        dev: "Use trim() function to remove spaces",
      },
    } satisfies IMyError;
  }
  return name;
}

//----------------------
// 2️⃣ Custom Error with Function Instead of Primitive Type
//----------------------

/**
 * `oh-my-error` provides built-in error types `Atoms`, `Moleculars`, and utils
 * which can increase the speed of creating your own types.
 *
 * @see [Docs Moleculars](https://github.com/INeedJobToStartWork/MyError?tab=readme-ov-file#predefined-elements-moleculars-new)
 * @see [Docs Atoms](https://github.com/INeedJobToStartWork/MyError?tab=readme-ov-file#predefined-types-for-properties-atoms-new)
 * @see [Docs Utils](https://github.com/INeedJobToStartWork/MyError?tab=readme-ov-file#utils-types--new)
 */

type NewErrorType = TValueOrFunctionAll<{
  name: string;
}> &
  TDetails;

// Uncomment and modify to experiment with the type
// const test: NewErrorType = { name: "Test Error" };

//----------------------
// 3️⃣ myError Usage
//----------------------

/**
 * `myError` is an error object handler which "precalculates" functions.
 *
 * Its most valuable feature is precalculating more complex errors using functions.
 *
 * @example
 * ```typescript
 * const MyErrorList = {
 *   BLACKLISTED: {
 *     name: "Black Listed Name",
 *     hint: "Try using another one!",
 *     message: (name: string) => `${name} is on the black list!`
 *   }
 * } as const satisfies TMyErrorList;
 *
 * throw myError(MyErrorList.BLACKLISTED, { message: ["nameInputted"] });
 * // Thrown Error will look like:
 * // {
 * //   name: "Black Listed Name",
 * //   hint: "Try using another one!",
 * //   message: "nameInputted is on the black list!"
 * // }
 * ```
 */

const BLACKLIST = ["badName", "otherBadName"] as const;

const BLACKLISTED_ERROR = {
  name: "Blacklisted",
  code: "BLACKLISTED",
  message: (name: string) => `${name} is on the black list!`,
  hint: {
    user: "Choose a different name",
    dev: "Check against the BLACKLIST before validating",
  },
} as const satisfies IMyError;

function nameValidator2(name: string): string {
  if (name.length === 0) throw myError(MyErrorList.TOO_SHORT_NAME);
  if (name.includes(" ")) throw myError(MyErrorList.SPACES_IN_NAME);
  if (BLACKLIST.includes(name))
    throw myError(BLACKLISTED_ERROR, { message: [name] });
  return name;
}

//----------------------
// 4️⃣ `TMyErrorList` - All Errors in One Place
//----------------------

/**
 * Storing all Errors in one place is much easier and has many benefits.
 * We create an object with `as const satisfies TMyErrorList`.
 */
const MyErrorListManyTips = {
  ManyTips: {
    name: "name",
    code: "code",
    message: "message",
  },
  goodTips: {
    name: "name",
    code: "code",
    message: "message",
  } satisfies IMyError,
} as const satisfies TMyErrorList;

/**
 * We can hard type too which types should be only accepted in object by adding type in <>
 */

const MyErrorList = {
  TOO_SHORT_NAME: {
    name: "Too Short Name",
    code: "TOO_SHORT_NAME",
    message: "Name length must be longer than 0",
  },
  SPACES_IN_NAME: {
    name: "Spaces in Name",
    code: "SPACES_IN_NAME",
    message: "Name cannot include any spaces!",
    hint: {
      user: "Remove all spaces",
      dev: "Use trim() function to remove spaces",
    },
  },
  BLACKLISTED: {
    name: "Blacklisted",
    code: "BLACKLISTED",
    message: (name: string) => `Name ${name} is on the Blacklist!`,
    hint: {
      user: "Choose a different name",
      dev: "Check against the BLACKLIST before validating",
    },
  },
} as const satisfies TMyErrorList<IMyError>;

function nameValidatorFinal(name: string): string {
  if (name.length === 0) throw myError(MyErrorList.TOO_SHORT_NAME);
  if (name.includes(" ")) throw myError(MyErrorList.SPACES_IN_NAME);
  if (BLACKLIST.includes(name))
    throw myError(MyErrorList.BLACKLISTED, { message: [name] });

  return name;
}
