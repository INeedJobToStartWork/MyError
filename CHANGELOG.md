# oh-my-error

## 2.0.0-prerelease.3

### Minor Changes

- Add passing Throwed Error to our error at `myErrorWrapper`
- Add types `ValueOrFunctionAll` and `ValueOrFunction`
- Add missing TSDocs to types

## 2.0.0-prerelease.2

### Patch Changes

- Add type `StatusCode`
- Add missing TSDocs
- Change enum StatusCode to object

## 2.0.0-prerelease.1

### Minor Changes

- `myErrorWrapperAsync` implemented to current `myErrorWrapper`
- `myErrorWrapperAsync` removed

## 2.0.0-prerelease.0

### Major Changes

- Add new Error Types, New Functions and Features to current existing functions
- Add `statusCodes` enum.
- Refactored `MyError` => `myError`, currently it's error object handler before throw.
- Added new Feature to `myErrorWrapper` - Instant throw error, no need to use condition with `isError` to throw Error.
- Added `myErrorWrapperAsync` which is `myErrorWrapper` alternative for async functions.
- Refactored `TMyError` - renamed `TMyError` => `IMyError`, changed from `type` to `interface` and structure.
- Add new Error (Organism) Interfaces `IMyError`,`IMyErrorAPI`,`IMyErrorRateLimit`,`IMyErrorValidation`
- Add new Error (Atom) types
  `TSeverity`,`TSeverity2`,`TErrorMessages`,`TErrorMessagesExt`,`TMyErrorList`,`TErrorList`,`TCauseError`,`TDetails`,`TBaseError`,`TBaseErrorExt`,`TValidationError`,`TApiError`,`TApiRateLimit`,

## 1.1.1

### Patch Changes

- fix `MyError` export

## 1.1.0

### Minor Changes

- add new Exception `MyError` which require params `TMyError` and add new property to `TmyError` - `name`

## 1.0.0

Release!🎉

### Major Changes

- Added Full support for commonjs and esm.
- Fixed exported types.
- ReadMe Fixed.
- Size reduced.

## 0.1.1

### Patch Changes

- update README.md

## 0.1.0 (2021-10-14)

### Minor Changes

- Add Feat: functions `myErrorWrapper`,`myErrorCatcher`,`myErrorHandler` and types
  `TMyError`,`TMyErrorList`,`TMyHandler`,`TMyFunctionReturn`,`TErrorReturn`,`TDataReturn`
