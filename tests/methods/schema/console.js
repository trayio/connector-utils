/* eslint-disable no-console */
const originalConsoleError = console.error;
const originalConsoleTable = console.table;
const originalConsoleWarn = console.warn;

const mockedConsoleError = () => jest.fn();
const mockedConsoleTable = () => jest.fn();
const mockedConsoleWarn = () => jest.fn();

module.exports = {
	mockConsole: () => {
		console.error = mockedConsoleError;
		console.table = mockedConsoleTable;
		console.warn = mockedConsoleWarn;
	},

	restoreConsole: () => {
		console.error = originalConsoleError;
		console.table = originalConsoleTable;
		console.warn = originalConsoleWarn;
	},
};
