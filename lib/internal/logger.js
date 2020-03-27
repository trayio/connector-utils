/**
 * wrapper for the console function
 * allows us to log to the console within the utils library
 * easy to stub or mock logging in tests without affecting production logging
 */

// eslint-disable-next-line no-console
exports.log = (level, ...toLog) => console[level].apply(this, toLog);
