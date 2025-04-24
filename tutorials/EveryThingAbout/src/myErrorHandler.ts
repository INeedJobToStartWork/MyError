/**
 * @fileoverview 📘 Tutorial: myErrorHandler
 * myErrorHandler it's error scenarios handler
 *
 * @version 2.0.0
 */

import {
  IMyError,
  myError,
  myErrorHandler,
  myErrorWrapper,
  TMyErrorList,
} from "@packages/oh-my-error";

//----------------------
// 1️⃣ Error scenario handling
//----------------------

const MyErrorHandlerList = {
  SPACES_IN_NAME: () => {
    console.error("ERROR SPACES_IN_NAME");
    return true;
  },
  TOO_SHORT_NAME: () => {
    console.error("ERROR TOO_SHORT_NAME");
    return true;
  },
  BLACKLISTED: () => {
    console.error("ERROR BLACKLISTED");
    return true;
  },
} as const;

const [data, isError] = myErrorWrapper(nameValidator)("badName");
if (isError) myErrorHandler((data as any).code, MyErrorHandlerList)();
else console.log(data);

//----------------------
// 🔧 Helper Function
//----------------------

/**
 * Test function that throws an error when input is 10
 * Used to demonstrate error handling in the examples above
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

const BLACKLIST = ["badName", "otherBadName"] as const;

function nameValidator(name: string): string {
  if (name.length === 0) throw myError(MyErrorList.TOO_SHORT_NAME);
  if (name.includes(" ")) throw myError(MyErrorList.SPACES_IN_NAME);
  if (BLACKLIST.includes(name))
    throw myError(MyErrorList.BLACKLISTED, { message: [name] });

  return name;
}
