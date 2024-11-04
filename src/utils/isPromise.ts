/** @internal */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isPromise(value: Function): boolean {
	return value.constructor.name == "AsyncFuncton";
}
export default isPromise;
