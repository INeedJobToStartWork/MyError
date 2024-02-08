export const MyErrorHandler = <T extends keyof K, K extends Record<T, K[T]>>(errorName: T, errorSolutions: K) => {
	// if (errorName in errorSolutions) errorSolutions[errorName]();
};

export default MyErrorHandler;
